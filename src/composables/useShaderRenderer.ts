/**
 * WebGL2 Multi-Pass Shader Renderer Composable
 *
 * Manages a Shadertoy-compatible rendering pipeline with support for
 * single-pass (image-only) and multi-pass (buffer A-D + image) rendering.
 * Implements ping-pong FBO feedback for buffer self-reads.
 *
 * @module composables/useShaderRenderer
 */
import { ref, watch, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { ShaderPasses, ShaderChannels, PassId, ChannelSlot, ChannelTarget } from '../types';
import { MAX_BUFFER_PASSES, FBOS_PER_BUFFER } from '../constants';

/** Ordered list of buffer pass IDs for iteration */
const BUFFER_PASS_IDS: readonly PassId[] = ['bufferA', 'bufferB', 'bufferC', 'bufferD'] as const;

/** Maps a ChannelTarget name back to its PassId for buffer resolution */
const TARGET_TO_PASS: Record<string, PassId> = {
  'buffer-a': 'bufferA',
  'buffer-b': 'bufferB',
  'buffer-c': 'bufferC',
  'buffer-d': 'bufferD',
};

/** Channel slot names in order, for iterating texture units */
const CHANNEL_SLOTS: readonly ChannelSlot[] = [
  'iChannel0',
  'iChannel1',
  'iChannel2',
  'iChannel3',
] as const;

/** Number of channel slots available per pass */
const NUM_CHANNELS = 4;

/** Number of vertices in the fullscreen quad (two triangles) */
const FULLSCREEN_QUAD_VERTICES = 6;

/** Milliseconds per second, for time conversion */
const MS_PER_SECOND = 1000;

/** Vertex shader source for the fullscreen quad */
const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Internal state for a single compiled shader pass, including
 * its WebGL program and uniform locations.
 */
interface PassProgram {
  /** The linked WebGL program */
  program: WebGLProgram;
  /** Uniform location for iTime */
  uTime: WebGLUniformLocation | null;
  /** Uniform location for iResolution */
  uResolution: WebGLUniformLocation | null;
  /** Uniform location for iMouse */
  uMouse: WebGLUniformLocation | null;
  /** Uniform location for iFrame */
  uFrame: WebGLUniformLocation | null;
  /** Uniform locations for iChannel0..3 */
  uChannels: (WebGLUniformLocation | null)[];
}

/**
 * Internal state for a buffer's ping-pong framebuffers.
 * Two FBOs are used: one for reading (previous frame) and one for writing (current frame).
 */
interface BufferFBO {
  /** The two framebuffer objects */
  fbos: [WebGLFramebuffer, WebGLFramebuffer];
  /** The two color textures attached to the framebuffers */
  textures: [WebGLTexture, WebGLTexture];
  /** Index (0 or 1) of the current read texture */
  readIndex: number;
}

/**
 * Wraps user GLSL code in a Shadertoy-compatible fragment shader.
 * The user code must define a `mainImage(out vec4, in vec2)` function.
 *
 * @param userGlsl - The user's GLSL source code containing mainImage
 * @returns Complete fragment shader source string
 */
function buildFragmentSource(userGlsl: string): string {
  return `#version 300 es
precision highp float;
precision highp int;
uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform int iFrame;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
out vec4 outColor;

${userGlsl}

void main() {
    mainImage(outColor, gl_FragCoord.xy);
}
`;
}

/**
 * Compiles a WebGL shader from source.
 *
 * @param gl - The WebGL2 rendering context
 * @param type - The shader type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
 * @param source - The GLSL source code
 * @returns The compiled shader, or an error string if compilation failed
 */
function compileShader(
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string
): WebGLShader | string {
  const shader = gl.createShader(type);
  if (!shader) {
    return 'Failed to create shader object';
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? 'Unknown compilation error';
    gl.deleteShader(shader);
    return log;
  }
  return shader;
}

/**
 * Links a vertex and fragment shader into a WebGL program.
 *
 * @param gl - The WebGL2 rendering context
 * @param vertexShader - A compiled vertex shader
 * @param fragmentShader - A compiled fragment shader
 * @returns The linked program, or an error string if linking failed
 */
function linkProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | string {
  const program = gl.createProgram();
  if (!program) {
    return 'Failed to create program object';
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, 'a_position');
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? 'Unknown link error';
    gl.deleteProgram(program);
    return log;
  }
  return program;
}

/**
 * Builds a PassProgram for a given GLSL source, compiling and linking shaders
 * and caching all uniform locations.
 *
 * @param gl - The WebGL2 rendering context
 * @param vertexShader - A pre-compiled vertex shader to reuse
 * @param userGlsl - The user's GLSL fragment code
 * @returns A PassProgram on success, or an error string on failure
 */
function buildPassProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  userGlsl: string
): PassProgram | string {
  const fragSource = buildFragmentSource(userGlsl);
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
  if (typeof fragShader === 'string') {
    return fragShader;
  }

  const program = linkProgram(gl, vertexShader, fragShader);
  // Fragment shader can be freed after linking
  gl.deleteShader(fragShader);

  if (typeof program === 'string') {
    return program;
  }

  const uChannels: (WebGLUniformLocation | null)[] = [];
  for (let i = 0; i < NUM_CHANNELS; i++) {
    uChannels.push(gl.getUniformLocation(program, `iChannel${i}`));
  }

  return {
    program,
    uTime: gl.getUniformLocation(program, 'iTime'),
    uResolution: gl.getUniformLocation(program, 'iResolution'),
    uMouse: gl.getUniformLocation(program, 'iMouse'),
    uFrame: gl.getUniformLocation(program, 'iFrame'),
    uChannels,
  };
}

/**
 * Creates a pair of framebuffers with color texture attachments for ping-pong rendering.
 *
 * @param gl - The WebGL2 rendering context
 * @param width - Texture width in pixels
 * @param height - Texture height in pixels
 * @returns A BufferFBO containing the two FBO/texture pairs
 */
function createPingPongFBO(
  gl: WebGL2RenderingContext,
  width: number,
  height: number
): BufferFBO | string {
  const fbos: WebGLFramebuffer[] = [];
  const textures: WebGLTexture[] = [];

  function cleanupPartial(): void {
    for (const t of textures) gl.deleteTexture(t);
    for (const f of fbos) gl.deleteFramebuffer(f);
  }

  for (let i = 0; i < FBOS_PER_BUFFER; i++) {
    const tex = gl.createTexture();
    if (!tex) { cleanupPartial(); return 'Failed to create texture'; }
    textures.push(tex);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) { cleanupPartial(); return 'Failed to create framebuffer'; }
    fbos.push(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      cleanupPartial();
      return `Framebuffer incomplete: ${status}`;
    }
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return {
    fbos: fbos as [WebGLFramebuffer, WebGLFramebuffer],
    textures: textures as [WebGLTexture, WebGLTexture],
    readIndex: 0,
  };
}

/**
 * Resizes all FBO textures to match the new canvas dimensions.
 *
 * @param gl - The WebGL2 rendering context
 * @param bufferFBOs - Map of pass IDs to their FBO state
 * @param width - New texture width in pixels
 * @param height - New texture height in pixels
 */
function resizeFBOTextures(
  gl: WebGL2RenderingContext,
  bufferFBOs: Map<PassId, BufferFBO>,
  width: number,
  height: number
): void {
  for (const fbo of bufferFBOs.values()) {
    for (let i = 0; i < FBOS_PER_BUFFER; i++) {
      gl.bindTexture(gl.TEXTURE_2D, fbo.textures[i]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA16F,
        width,
        height,
        0,
        gl.RGBA,
        gl.HALF_FLOAT,
        null
      );
    }
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
 * Creates the fullscreen quad vertex buffer (two triangles covering clip space -1 to 1).
 *
 * @param gl - The WebGL2 rendering context
 * @returns The VAO and VBO for the quad, or an error string
 */
function createFullscreenQuad(
  gl: WebGL2RenderingContext
): { vao: WebGLVertexArrayObject; vbo: WebGLBuffer } | string {
  const vao = gl.createVertexArray();
  if (!vao) return 'Failed to create VAO';

  const vbo = gl.createBuffer();
  if (!vbo) return 'Failed to create VBO';

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

  // Two triangles forming a fullscreen quad
  const vertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);

  return { vao, vbo };
}

/**
 * Vue composable that manages a WebGL2 multi-pass shader rendering pipeline.
 *
 * Supports Shadertoy-compatible single-pass (image-only) and multi-pass
 * (buffer A-D + image) rendering with ping-pong FBO feedback. Handles
 * canvas resizing, visibility-based pausing, error capture, and full
 * resource cleanup on unmount.
 *
 * @param canvasRef - Reactive ref to the target canvas element
 * @param passes - Shader source code organized by render pass
 * @param channels - Channel wiring between passes
 * @returns Reactive error state, running state, and start/stop controls
 */
export function useShaderRenderer(
  canvasRef: Ref<HTMLCanvasElement | null>,
  passes: ShaderPasses,
  channels: ShaderChannels
): {
  /** Error message if shader compilation fails */
  error: Ref<string | null>;
  /** Whether the renderer is currently running */
  isRunning: Ref<boolean>;
  /** Start the render loop */
  start: () => void;
  /** Stop the render loop */
  stop: () => void;
} {
  const error = ref<string | null>(null);
  const isRunning = ref(false);

  /** WebGL2 context, set during initialization */
  let gl: WebGL2RenderingContext | null = null;

  /** Compiled pass programs keyed by PassId */
  let passPrograms: Map<PassId, PassProgram> = new Map();

  /** Ping-pong FBOs for buffer passes */
  let bufferFBOs: Map<PassId, BufferFBO> = new Map();

  /** Fullscreen quad vertex array object */
  let quadVAO: WebGLVertexArrayObject | null = null;

  /** Fullscreen quad vertex buffer */
  let quadVBO: WebGLBuffer | null = null;

  /** The shared compiled vertex shader */
  let sharedVertexShader: WebGLShader | null = null;

  /** requestAnimationFrame handle for cancellation */
  let rafHandle = 0;

  /** Frame counter for iFrame uniform */
  let frameCount = 0;

  /** Accumulated time before the most recent pause */
  let accumulatedTime = 0;

  /** Timestamp of the most recent resume (performance.now()) */
  let resumeTimestamp = 0;

  /** Whether the page is currently hidden */
  let pageHidden = false;

  /**
   * Mouse state matching Shadertoy iMouse convention:
   * xy = current position while pressed, zw = click origin.
   * z > 0 while button held, z < 0 after release.
   */
  let mouseX = 0;
  let mouseY = 0;
  let mouseClickX = 0;
  let mouseClickY = 0;
  let mouseDown = false;

  /** ResizeObserver for canvas size changes */
  let resizeObserver: ResizeObserver | null = null;

  /** Cached list of active buffer passes, computed during initialization */
  let cachedActiveBufferPasses: PassId[] = [];

  /** Loaded image textures keyed by their channel target path */
  let textureCache: Map<string, WebGLTexture> = new Map();

  /**
   * Determines the ordered list of active buffer pass IDs present in the shader.
   *
   * @returns Array of PassId values for buffers that have source code
   */
  function getActiveBufferPasses(): PassId[] {
    const active: PassId[] = [];
    for (let i = 0; i < MAX_BUFFER_PASSES; i++) {
      const passId = BUFFER_PASS_IDS[i];
      if (passes[passId]) {
        active.push(passId);
      }
    }
    return active;
  }

  /**
   * Resolves a channel target to the read texture for a given pass.
   *
   * @param target - The channel target identifier
   * @param currentPassId - The pass currently being rendered (for 'self' resolution)
   * @returns The WebGLTexture to bind, or null if unavailable
   */
  function resolveChannelTexture(
    target: ChannelTarget,
    currentPassId: PassId
  ): WebGLTexture | null {
    if (target === 'self') {
      const fbo = bufferFBOs.get(currentPassId);
      if (!fbo) return null;
      return fbo.textures[fbo.readIndex];
    }

    // Check buffer pass targets
    const passId = TARGET_TO_PASS[target];
    if (passId) {
      const fbo = bufferFBOs.get(passId);
      if (!fbo) return null;
      return fbo.textures[fbo.readIndex];
    }

    // Must be an image texture path
    return textureCache.get(target) ?? null;
  }

  /**
   * Binds input textures for a pass according to its channel configuration.
   *
   * @param context - The WebGL2 rendering context
   * @param passId - The pass whose channels are being bound
   * @param passProgram - The compiled pass program with uniform locations
   */
  function bindChannelTextures(
    context: WebGL2RenderingContext,
    passId: PassId,
    passProgram: PassProgram
  ): void {
    const passChannels = channels[passId];
    for (let i = 0; i < NUM_CHANNELS; i++) {
      const slot = CHANNEL_SLOTS[i];
      const target = passChannels?.[slot];

      context.activeTexture(context.TEXTURE0 + i);

      if (target) {
        const texture = resolveChannelTexture(target, passId);
        context.bindTexture(context.TEXTURE_2D, texture);
      } else {
        context.bindTexture(context.TEXTURE_2D, null);
      }

      context.uniform1i(passProgram.uChannels[i], i);
    }
  }

  /**
   * Sets the common Shadertoy uniforms on a pass program.
   *
   * @param context - The WebGL2 rendering context
   * @param passProgram - The compiled pass program with uniform locations
   * @param time - Current time in seconds since start
   * @param width - Canvas width in pixels
   * @param height - Canvas height in pixels
   * @param pixelRatio - Device pixel ratio
   */
  function setUniforms(
    context: WebGL2RenderingContext,
    passProgram: PassProgram,
    time: number,
    width: number,
    height: number,
    pixelRatio: number
  ): void {
    context.uniform1f(passProgram.uTime, time);
    context.uniform3f(passProgram.uResolution, width, height, pixelRatio);
    context.uniform4f(
      passProgram.uMouse,
      mouseX,
      mouseY,
      mouseClickX,
      mouseClickY,
    );
    context.uniform1i(passProgram.uFrame, frameCount);
  }

  /**
   * Initializes the WebGL2 context, compiles all shader programs,
   * creates FBOs for buffer passes, and sets up the fullscreen quad.
   *
   * @param canvas - The canvas element to initialize on
   * @returns true if initialization succeeded, false otherwise
   */
  function initialize(canvas: HTMLCanvasElement): boolean {
    const context = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
    if (!context) {
      error.value = 'WebGL2 is not supported';
      return false;
    }
    gl = context;

    // Enable float color buffer extension for multi-pass shaders that
    // store state (e.g. attractor positions) in FBO textures
    const floatExt = gl.getExtension('EXT_color_buffer_float');
    if (!floatExt) {
      console.warn('[ShaderRenderer] EXT_color_buffer_float not available — float FBOs may fail');
    }

    // Create fullscreen quad
    const quadResult = createFullscreenQuad(gl);
    if (typeof quadResult === 'string') {
      error.value = quadResult;
      return false;
    }
    quadVAO = quadResult.vao;
    quadVBO = quadResult.vbo;

    // Compile shared vertex shader
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    if (typeof vs === 'string') {
      error.value = vs;
      return false;
    }
    sharedVertexShader = vs;

    // Build pass programs for active buffer passes
    cachedActiveBufferPasses = getActiveBufferPasses();
    const activeBuffers = cachedActiveBufferPasses;
    console.log(`[ShaderRenderer] Active buffer passes: [${activeBuffers.join(', ')}]`);

    for (const passId of activeBuffers) {
      const source = passes[passId];
      if (!source) continue;
      const result = buildPassProgram(gl, sharedVertexShader, source);
      if (typeof result === 'string') {
        console.error(`[ShaderRenderer] ${passId} compilation failed:`, result);
        error.value = result;
        cleanup();
        return false;
      }
      passPrograms.set(passId, result);

      // Create ping-pong FBOs for this buffer
      const fboResult = createPingPongFBO(gl, canvas.width, canvas.height);
      if (typeof fboResult === 'string') {
        console.error(`[ShaderRenderer] FBO creation failed for ${passId}:`, fboResult);
        error.value = fboResult;
        cleanup();
        return false;
      }
      bufferFBOs.set(passId, fboResult);
      console.log(`[ShaderRenderer] ${passId}: program + FBO OK (${canvas.width}x${canvas.height})`);
    }

    // Build image pass program
    const imageResult = buildPassProgram(gl, sharedVertexShader, passes.image);
    if (typeof imageResult === 'string') {
      console.error('[ShaderRenderer] Image pass compilation failed:', imageResult);
      error.value = imageResult;
      cleanup();
      return false;
    }
    passPrograms.set('image', imageResult);

    // Discover and load image texture targets
    const textureTargets = new Set<string>();
    for (const passChannels of Object.values(channels)) {
      if (!passChannels) continue;
      for (const target of Object.values(passChannels)) {
        if (target && target !== 'self' && !(target in TARGET_TO_PASS)) {
          textureTargets.add(target);
        }
      }
    }

    for (const target of textureTargets) {
      const tex = gl.createTexture();
      if (!tex) continue;

      // Create 1x1 black placeholder so rendering can start immediately
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])
      );
      textureCache.set(target, tex);

      // Load the actual image asynchronously
      const url = import.meta.env.BASE_URL + target;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!gl) return;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        console.log(`[ShaderRenderer] Texture loaded: ${target}`);
      };
      img.onerror = () => {
        console.warn(`[ShaderRenderer] Failed to load texture: ${url}`);
      };
      img.src = url;
    }

    if (textureTargets.size > 0) {
      console.log(`[ShaderRenderer] Loading ${textureTargets.size} texture(s): ${[...textureTargets].join(', ')}`);
    }

    console.log('[ShaderRenderer] All passes compiled OK, channels:', JSON.stringify(channels));
    error.value = null;
    return true;
  }

  /**
   * The main render loop callback invoked each animation frame.
   * Renders all buffer passes in order, then the image pass to screen.
   */
  function renderFrame(): void {
    if (!gl || !quadVAO) return;

    const canvas = gl.canvas as HTMLCanvasElement;
    const width = canvas.width;
    const height = canvas.height;
    const pixelRatio = window.devicePixelRatio || 1;
    const elapsed = accumulatedTime + (performance.now() - resumeTimestamp) / MS_PER_SECOND;

    gl.viewport(0, 0, width, height);
    gl.bindVertexArray(quadVAO);

    // Render buffer passes in order: A -> B -> C -> D
    const activeBuffers = cachedActiveBufferPasses;
    for (const passId of activeBuffers) {
      const pp = passPrograms.get(passId);
      const fbo = bufferFBOs.get(passId);
      if (!pp || !fbo) continue;

      // Render to the write FBO
      const writeIndex = 1 - fbo.readIndex;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fbos[writeIndex]);
      gl.viewport(0, 0, width, height);

      gl.useProgram(pp.program);
      setUniforms(gl, pp, elapsed, width, height, pixelRatio);
      bindChannelTextures(gl, passId, pp);

      gl.drawArrays(gl.TRIANGLES, 0, FULLSCREEN_QUAD_VERTICES);

      // Swap read/write indices
      fbo.readIndex = writeIndex;
    }

    // Render image pass to default framebuffer (screen)
    const imagePP = passPrograms.get('image');
    if (!imagePP) return;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.useProgram(imagePP.program);
    setUniforms(gl, imagePP, elapsed, width, height, pixelRatio);
    bindChannelTextures(gl, 'image', imagePP);

    gl.drawArrays(gl.TRIANGLES, 0, FULLSCREEN_QUAD_VERTICES);

    gl.bindVertexArray(null);

    // Log diagnostics for the first few frames
    if (frameCount < 3) {
      const glErr = gl.getError();
      console.log(`[ShaderRenderer] Frame ${frameCount} rendered, GL error: ${glErr === gl.NO_ERROR ? 'none' : glErr}, canvas: ${width}x${height}`);
    }

    frameCount++;

    if (isRunning.value) {
      rafHandle = requestAnimationFrame(renderFrame);
    }
  }

  /**
   * Starts the render loop. If already running, this is a no-op.
   */
  function start(): void {
    if (isRunning.value) return;
    isRunning.value = true;
    resumeTimestamp = performance.now();
    rafHandle = requestAnimationFrame(renderFrame);
  }

  /**
   * Stops the render loop. Accumulated time is preserved for seamless resume.
   */
  function stop(): void {
    if (!isRunning.value) return;
    isRunning.value = false;
    accumulatedTime += (performance.now() - resumeTimestamp) / MS_PER_SECOND;
    if (rafHandle) {
      cancelAnimationFrame(rafHandle);
      rafHandle = 0;
    }
  }

  /**
   * Handles document visibility changes to pause/resume rendering
   * when the page is hidden or shown.
   */
  function onVisibilityChange(): void {
    if (document.hidden) {
      if (isRunning.value) {
        pageHidden = true;
        stop();
      }
    } else {
      if (pageHidden) {
        pageHidden = false;
        start();
      }
    }
  }

  /**
   * Converts a mouse/touch client position to Shadertoy pixel coordinates
   * (origin at bottom-left, matching gl_FragCoord convention).
   */
  function clientToPixel(
    canvas: HTMLCanvasElement,
    clientX: number,
    clientY: number,
  ): [number, number] {
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width * canvas.width;
    const y = (1 - (clientY - rect.top) / rect.height) * canvas.height;
    return [x, y];
  }

  function onMouseDown(e: MouseEvent): void {
    const canvas = e.currentTarget as HTMLCanvasElement;
    const [x, y] = clientToPixel(canvas, e.clientX, e.clientY);
    mouseX = x;
    mouseY = y;
    mouseClickX = x;
    mouseClickY = y;
    mouseDown = true;
  }

  function onMouseMove(e: MouseEvent): void {
    if (!mouseDown) return;
    const canvas = e.currentTarget as HTMLCanvasElement;
    const [x, y] = clientToPixel(canvas, e.clientX, e.clientY);
    mouseX = x;
    mouseY = y;
  }

  function onMouseUp(): void {
    mouseDown = false;
  }

  function onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 0) return;
    e.preventDefault();
    const canvas = e.currentTarget as HTMLCanvasElement;
    const touch = e.touches[0];
    const [x, y] = clientToPixel(canvas, touch.clientX, touch.clientY);
    mouseX = x;
    mouseY = y;
    mouseClickX = x;
    mouseClickY = y;
    mouseDown = true;
  }

  function onTouchMove(e: TouchEvent): void {
    if (e.touches.length === 0 || !mouseDown) return;
    e.preventDefault();
    const canvas = e.currentTarget as HTMLCanvasElement;
    const touch = e.touches[0];
    const [x, y] = clientToPixel(canvas, touch.clientX, touch.clientY);
    mouseX = x;
    mouseY = y;
  }

  function onTouchEnd(): void {
    mouseDown = false;
  }

  /**
   * Handles canvas resize by updating canvas dimensions, viewport,
   * and recreating FBO textures at the new size.
   *
   * @param entries - The resize observer entries
   */
  function onCanvasResize(entries: ResizeObserverEntry[]): void {
    if (!gl) return;

    for (const entry of entries) {
      const canvas = entry.target as HTMLCanvasElement;
      const dpr = window.devicePixelRatio || 1;

      let width: number;
      let height: number;

      if (entry.devicePixelContentBoxSize) {
        width = entry.devicePixelContentBoxSize[0].inlineSize;
        height = entry.devicePixelContentBoxSize[0].blockSize;
      } else if (entry.contentBoxSize) {
        width = Math.round(entry.contentBoxSize[0].inlineSize * dpr);
        height = Math.round(entry.contentBoxSize[0].blockSize * dpr);
      } else {
        width = Math.round(entry.contentRect.width * dpr);
        height = Math.round(entry.contentRect.height * dpr);
      }

      if (width === 0 || height === 0) continue;

      // Skip if dimensions haven't actually changed
      if (canvas.width === width && canvas.height === height) continue;

      canvas.width = width;
      canvas.height = height;

      resizeFBOTextures(gl, bufferFBOs, width, height);

      // Reset frame counter so shaders re-initialize their state
      // (e.g. particle positions stored in FBO pixels on iFrame == 0)
      frameCount = 0;
    }
  }

  /**
   * Tears down all WebGL resources: programs, shaders, buffers, textures, and FBOs.
   */
  function cleanup(): void {
    stop();

    document.removeEventListener('visibilitychange', onVisibilityChange);

    // Remove mouse/touch listeners
    if (gl) {
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    }

    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (gl) {
      // Delete pass programs
      for (const pp of passPrograms.values()) {
        gl.deleteProgram(pp.program);
      }
      passPrograms = new Map();

      // Delete FBO textures and framebuffers
      for (const fbo of bufferFBOs.values()) {
        for (let i = 0; i < FBOS_PER_BUFFER; i++) {
          gl.deleteTexture(fbo.textures[i]);
          gl.deleteFramebuffer(fbo.fbos[i]);
        }
      }
      bufferFBOs = new Map();
      cachedActiveBufferPasses = [];

      // Delete loaded image textures
      for (const tex of textureCache.values()) {
        gl.deleteTexture(tex);
      }
      textureCache = new Map();

      // Delete shared vertex shader
      if (sharedVertexShader) {
        gl.deleteShader(sharedVertexShader);
        sharedVertexShader = null;
      }

      // Delete quad geometry
      if (quadVAO) {
        gl.deleteVertexArray(quadVAO);
        quadVAO = null;
      }
      if (quadVBO) {
        gl.deleteBuffer(quadVBO);
        quadVBO = null;
      }

      gl = null;
    }
  }

  // Watch for canvas ref to become available
  watch(
    canvasRef,
    (canvas) => {
      // Clean up previous context if canvas changes
      cleanup();

      if (!canvas) return;

      // Initialize canvas pixel size from CSS layout
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }

      if (!initialize(canvas)) {
        return;
      }

      // Set up resize observer
      resizeObserver = new ResizeObserver(onCanvasResize);
      resizeObserver.observe(canvas);

      // Set up mouse/touch listeners for iMouse
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);
      canvas.addEventListener('touchstart', onTouchStart, { passive: false });
      canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      canvas.addEventListener('touchend', onTouchEnd);

      // Set up visibility change listener
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Reset timing state
      frameCount = 0;
      accumulatedTime = 0;

      // Auto-start rendering
      start();
    },
    { immediate: true }
  );

  // Clean up on component unmount
  onUnmounted(cleanup);

  return {
    error,
    isRunning,
    start,
    stop,
  };
}
