# Shader Commons Library — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a `src/lib/` GLSL common library system where shaders declare shared functions via `meta.json`, injected at build-time by the Vite plugin, and migrate the 4 planet shaders to use it.

**Architecture:** The Vite plugin (`shaderLoader.ts`) reads `"commons"` from each shader's `meta.json`, loads the corresponding `src/lib/<name>.glsl` files, and prepends them to every pass's GLSL source string at build time. The renderer receives complete strings and needs zero changes.

**Tech Stack:** Vite 6 plugin (Node.js), TypeScript (strict), GLSL ES 3.00

---

### Task 1: Add `commons` field to TypeScript types

**Files:**
- Modify: `src/types.ts:109-122` (RawShaderMeta interface)

**Step 1: Add the commons field**

In `src/types.ts`, add a `commons` field to `RawShaderMeta`:

```typescript
/** Raw meta.json structure before slug/screenshot are injected */
export interface RawShaderMeta {
  /** Display title */
  title: string;
  /** Brief description of the shader effect */
  description: string;
  /** ISO 8601 date string (YYYY-MM-DD) */
  date: string;
  /** Categorization tags */
  tags: string[];
  /** External links */
  links: ShaderLinks;
  /** Optional channel wiring overrides */
  channels?: ShaderChannels;
  /** Optional shared GLSL library files to prepend (resolved from src/lib/) */
  commons?: string[];
}
```

**Step 2: Add LIB_DIR constant**

In `src/constants.ts`, add:

```typescript
/** Directory name for shared GLSL library files */
export const LIB_DIRNAME = 'lib';
```

**Step 3: Verify type-check passes**

Run: `npx vue-tsc -b --noEmit`
Expected: No errors (no code references `commons` yet, so adding it is safe)

**Step 4: Commit**

```bash
git add src/types.ts src/constants.ts
git commit -m "feat: add commons field to RawShaderMeta type"
```

---

### Task 2: Update Vite plugin to load and prepend commons

**Files:**
- Modify: `src/plugins/shaderLoader.ts`

**Step 1: Import the new constant and add commons loading**

At the top of `shaderLoader.ts`, add `LIB_DIRNAME` to the imports from constants:

```typescript
import {
  IMAGE_PASS_FILENAME,
  BUFFER_FILENAMES,
  META_FILENAME,
  SCREENSHOT_FILENAME,
  LIB_DIRNAME,
} from '../constants';
```

**Step 2: Add a `loadCommons` helper function**

Add this function after the `assignBufferPass` function (after line 133):

```typescript
/**
 * Load and concatenate commons GLSL source files.
 *
 * @param libDir - Absolute path to the src/lib/ directory
 * @param commons - Array of common names (e.g. ['sphere', 'lighting'])
 * @param slug - Shader slug for error messages
 * @returns Concatenated GLSL source string to prepend
 */
function loadCommons(libDir: string, commons: string[], slug: string): string {
  const sources: string[] = [];

  for (const name of commons) {
    // Path traversal protection
    if (name.includes('..') || name.includes('/') || name.includes('\\')) {
      console.warn(`[shader-loader] Skipping commons entry with suspicious path characters in ${slug}: ${name}`);
      continue;
    }

    const filePath = path.join(libDir, `${name}.glsl`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`[shader-loader] Commons file not found for shader "${slug}": src/lib/${name}.glsl`);
    }

    try {
      sources.push(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      throw new Error(`[shader-loader] Failed to read commons file src/lib/${name}.glsl for shader "${slug}": ${err}`);
    }
  }

  return sources.length > 0 ? sources.join('\n') + '\n' : '';
}
```

**Step 3: Add a `prependCommons` helper function**

Add this after `loadCommons`:

```typescript
/**
 * Prepend commons source to all passes in a ShaderPasses object.
 */
function prependCommons(passes: ShaderPasses, commonsSource: string): void {
  if (!commonsSource) return;

  passes.image = commonsSource + passes.image;
  if (passes.bufferA) passes.bufferA = commonsSource + passes.bufferA;
  if (passes.bufferB) passes.bufferB = commonsSource + passes.bufferB;
  if (passes.bufferC) passes.bufferC = commonsSource + passes.bufferC;
  if (passes.bufferD) passes.bufferD = commonsSource + passes.bufferD;
}
```

**Step 4: Wire commons loading into `scanShaders`**

In the `scanShaders` function, add a `libDir` parameter and commons loading logic. Change the function signature:

```typescript
function scanShaders(shadersDir: string, libDir: string): ShaderEntryInternal[] {
```

After the channels are computed (after line 230) and before the screenshot detection, add:

```typescript
    // Load and prepend commons if specified
    if (rawMeta.commons && rawMeta.commons.length > 0) {
      const commonsSource = loadCommons(libDir, rawMeta.commons, slug);
      prependCommons(passes, commonsSource);
    }
```

**Step 5: Update the plugin to pass libDir**

In the `shaderLoaderPlugin` function, add a `libDir` variable alongside `shadersDir`:

```typescript
export function shaderLoaderPlugin(): Plugin {
  let shadersDir: string;
  let libDir: string;

  return {
    name: 'shader-loader',

    configResolved(config) {
      shadersDir = path.resolve(config.root, 'src/shaders');
      libDir = path.resolve(config.root, 'src', LIB_DIRNAME);
    },
```

Update the `load` method call:

```typescript
    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const entries = scanShaders(shadersDir, libDir);
```

**Step 6: Add lib directory watching for HMR**

In `configureServer`, add the lib directory to the watcher:

```typescript
    configureServer(server: ViteDevServer) {
      // Watch shader files for HMR
      server.watcher.add(path.join(shadersDir, '**/*.glsl'));
      server.watcher.add(path.join(shadersDir, `**/${META_FILENAME}`));

      // Watch shared lib files for HMR
      server.watcher.add(path.join(libDir, '**/*.glsl'));

      server.watcher.on('change', (file: string) => {
        const normalized = file.replace(/\\/g, '/');
        if (
          (normalized.includes('/src/shaders/') || normalized.includes('/src/lib/')) &&
          (normalized.endsWith('.glsl') || normalized.endsWith('.json'))
        ) {
```

**Step 7: Verify type-check passes**

Run: `npx vue-tsc -b --noEmit`
Expected: No errors

**Step 8: Commit**

```bash
git add src/plugins/shaderLoader.ts
git commit -m "feat: support commons field in Vite shader loader plugin"
```

---

### Task 3: Update shader linter to prepend commons

**Files:**
- Modify: `scripts/lint-shaders.js`

**Step 1: Add commons loading to the linter**

In `lint-shaders.js`, after the `rootDir` and `shadersDir` declarations (around line 26), add:

```javascript
const libDir = join(rootDir, 'src', 'lib');
```

**Step 2: Update `findShaders` to include meta.json commons**

Change `findShaders` to also return the commons list from each shader's meta.json:

```javascript
/**
 * Collect all .glsl files recursively under src/shaders/.
 * @returns {Array<{slug: string, file: string, path: string, commons: string[]}>}
 */
function findShaders() {
  const results = [];
  if (!existsSync(shadersDir)) return results;

  for (const slug of readdirSync(shadersDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const slugDir = join(shadersDir, slug.name);

    // Read meta.json for commons list
    let commons = [];
    const metaPath = join(slugDir, 'meta.json');
    if (existsSync(metaPath)) {
      try {
        const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
        commons = meta.commons || [];
      } catch { /* ignore parse errors — build plugin handles validation */ }
    }

    for (const entry of readdirSync(slugDir)) {
      if (!entry.endsWith('.glsl')) continue;
      results.push({
        slug: slug.name,
        file: entry,
        path: join(slugDir, entry),
        commons,
      });
    }
  }
  return results;
}
```

**Step 3: Add a `loadCommonsSource` function**

Add this after `findShaders`:

```javascript
/**
 * Load and concatenate commons GLSL source files.
 * @param {string[]} commons - Array of common names
 * @returns {string} Concatenated GLSL source
 */
function loadCommonsSource(commons) {
  if (!commons || commons.length === 0) return '';
  const sources = [];
  for (const name of commons) {
    const filePath = join(libDir, `${name}.glsl`);
    if (existsSync(filePath)) {
      sources.push(readFileSync(filePath, 'utf8'));
    }
    // Skip missing — the build plugin will catch real errors
  }
  return sources.length > 0 ? sources.join('\n') + '\n' : '';
}
```

**Step 4: Update `validateShader` to accept commons source**

Change the `validateShader` function signature and prepend commons:

```javascript
/**
 * Validate a single shader file by wrapping it and running glslangValidator.
 * @param {string} filePath
 * @param {string} commonsSource - Pre-loaded commons GLSL to prepend
 * @returns {{ success: boolean, errors: string[] }}
 */
function validateShader(filePath, commonsSource = '') {
  const userGlsl = readFileSync(filePath, 'utf8');
  const assembled = PREAMBLE + commonsSource + userGlsl + POSTAMBLE;
```

Also update `PREAMBLE_LINES` usage — we need to account for commons lines in the error line adjustment. Change the error line adjustment in the catch block:

```javascript
    const commonsLines = commonsSource ? commonsSource.split('\n').length : 0;
    const errors = raw
      .split('\n')
      .filter(l => l.trim())
      .map(line =>
        line.replace(/^(ERROR|WARNING):\s*\d+:(\d+)/g, (match, level, lineNum) => {
          const adjusted = Math.max(1, parseInt(lineNum, 10) - PREAMBLE_LINES - commonsLines + 1);
          return `${level}: line ${adjusted}`;
        })
      );
```

**Step 5: Update `main` to pass commons**

In the `main` function's shader loop, load and pass commons:

```javascript
  for (const shader of shaders) {
    // Print slug header when it changes
    if (shader.slug !== currentSlug) {
      currentSlug = shader.slug;
      console.log(`${c.dim}${currentSlug}/${c.reset}`);
    }

    const commonsSource = loadCommonsSource(shader.commons);
    const result = validateShader(shader.path, commonsSource);
```

**Step 6: Verify linter runs**

Run: `npm run lint:shaders`
Expected: All existing shaders still pass (no commons used yet)

**Step 7: Commit**

```bash
git add scripts/lint-shaders.js
git commit -m "feat: support commons prepending in shader linter"
```

---

### Task 4: Create `src/lib/sphere.glsl`

**Files:**
- Create: `src/lib/sphere.glsl`

**Step 1: Write the sphere common**

```glsl
/**
 * Sphere Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic unit-sphere rendering:
 * 2D rotation and responsive UV-to-sphere projection.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle `a` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. Automatically zooms out on
 * portrait screens to prevent clipping.
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float uvScale = baseScale / min(1.0, resolution.x / resolution.y);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}
```

**Step 2: Commit**

```bash
git add src/lib/sphere.glsl
git commit -m "feat: add sphere.glsl common library"
```

---

### Task 5: Create `src/lib/lighting.glsl`

**Files:**
- Create: `src/lib/lighting.glsl`

**Step 1: Write the lighting common**

```glsl
/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
```

**Step 2: Commit**

```bash
git add src/lib/lighting.glsl
git commit -m "feat: add lighting.glsl common library"
```

---

### Task 6: Create `src/lib/atmosphere.glsl`

**Files:**
- Create: `src/lib/atmosphere.glsl`

**Step 1: Write the atmosphere common**

```glsl
/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (pos.z approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
```

**Step 2: Commit**

```bash
git add src/lib/atmosphere.glsl
git commit -m "feat: add atmosphere.glsl common library"
```

---

### Task 7: Create `src/lib/noise-value.glsl`

**Files:**
- Create: `src/lib/noise-value.glsl`

**Step 1: Write the value noise common**

```glsl
/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
```

**Step 2: Commit**

```bash
git add src/lib/noise-value.glsl
git commit -m "feat: add noise-value.glsl common library"
```

---

### Task 8: Create `src/lib/noise-pcg.glsl`

**Files:**
- Create: `src/lib/noise-pcg.glsl`

**Step 1: Write the PCG noise common**

```glsl
/**
 * PCG-Style Hash Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using PCG-style polynomial hashing.
 * Avoids sin-based precision issues on some mobile GPUs.
 * Includes 1D, 3D, and 4D hash variants plus FBM with a
 * decorrelation matrix to eliminate axis-aligned artifacts.
 *
 * Noise: Preferred over sin-hash for mobile/WebGL targets.
 * The decorrelation matrix between FBM octaves prevents visible
 * grid lines in banded atmospheric patterns.
 */

// === CONSTANTS ===

/**
 * Decorrelation matrix for 3D FBM.
 * Rotates and scales domain between octaves to eliminate axis-aligned
 * artifacts. The non-orthogonal entries create a pseudo-random rotation
 * that prevents visible grid lines in banded patterns.
 */
const mat3 PCG_FBM_MATRIX = mat3(
    0.51162, -1.54702, 1.15972,
   -1.70666, -0.92510, -0.48114,
    0.90858, -0.86654, -1.55678
);

// === HASH FUNCTIONS ===

/**
 * 1D PCG-style hash — maps a float to pseudo-random [0, 1).
 */
float pcgHash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

/**
 * 3D PCG-style hash — maps vec3 to pseudo-random vec3 in [0, 1).
 */
vec3 pcgHash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

/**
 * 4D PCG-style hash — maps a float to pseudo-random vec4 in [0, 1).
 * Useful for seed-based parameter generation.
 */
vec4 pcgHash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

// === NOISE FUNCTIONS ===

/**
 * 1D value noise from PCG hash with Hermite interpolation.
 * @return Noise value in [-1, 1]
 */
float pcgNoise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(pcgHash1(i), pcgHash1(i + 1.0), u);
}

/**
 * 3D value noise from PCG hash with Hermite interpolation.
 * @return Noise vec3 in [-1, 1] per component
 */
vec3 pcgNoise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 0.0)),
                pcgHash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 0.0)),
                pcgHash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 1.0)),
                pcgHash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 1.0)),
                pcgHash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

// === FBM ===

/**
 * 1D Fractional Brownian Motion using PCG noise.
 *
 * 5 octaves, lacunarity 2.0, gain 0.5.
 * @param p  1D sample position
 * @return Normalized FBM value in approximately [-1, 1]
 */
float pcgFbm1(float p) {
    float f = pcgNoise1(p); p = 2.0 * p;
    f += 0.5 * pcgNoise1(p); p = 2.0 * p;
    f += 0.25 * pcgNoise1(p); p = 2.0 * p;
    f += 0.125 * pcgNoise1(p); p = 2.0 * p;
    f += 0.0625 * pcgNoise1(p);
    return f / 1.9375;
}

/**
 * 3D Fractional Brownian Motion using PCG noise with decorrelation matrix.
 *
 * 5 octaves with PCG_FBM_MATRIX applied between octaves to prevent
 * axis-aligned grid artifacts in banded patterns.
 *
 * @param p  3D sample position
 * @return Normalized FBM vec3 in approximately [-1, 1] per component
 */
vec3 pcgFbm3(vec3 p) {
    vec3 f = pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.5 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.25 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.125 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.0625 * pcgNoise3(p);
    return f / 1.9375;
}
```

**Step 2: Commit**

```bash
git add src/lib/noise-pcg.glsl
git commit -m "feat: add noise-pcg.glsl common library"
```

---

### Task 9: Create `src/lib/normal-map.glsl`

**Files:**
- Create: `src/lib/normal-map.glsl`

**Step 1: Write the normal mapping common**

Note: GLSL doesn't support function pointers, so the normal-map utility provides the tangent/binormal basis computation. The actual height re-sampling must remain inline in each shader since it depends on the shader's specific height function.

```glsl
/**
 * Normal Mapping Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for finite-difference normal perturbation on
 * analytic sphere surfaces. Provides tangent/binormal basis computation.
 *
 * TECHNIQUE: Finite-difference normal mapping. The caller samples their
 * height function at offset positions along the tangent and binormal,
 * then uses perturbNormal() to reconstruct the perturbed surface normal.
 *
 * Usage pattern in shader:
 *   vec3 tangent, binormal;
 *   computeTangentBasis(surfaceNormal, tangent, binormal);
 *   float dh_dt = (centerHeight - heightFunc(pos + DX * tangent)) / DX;
 *   float dh_db = (centerHeight - heightFunc(pos + DX * binormal)) / DX;
 *   vec3 normal = perturbNormal(surfaceNormal, tangent, binormal, dh_dt, dh_db);
 */

/**
 * Compute a tangent/binormal basis from a sphere surface normal.
 *
 * Uses cross products with the Y-axis to derive orthogonal tangent
 * and binormal vectors lying in the sphere's tangent plane.
 *
 * @param normal    Unit sphere surface normal (= position for unit sphere)
 * @param tangent   Output tangent vector (set by this function)
 * @param binormal  Output binormal vector (set by this function)
 */
void computeTangentBasis(vec3 normal, out vec3 tangent, out vec3 binormal) {
    tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    binormal = cross(normal, tangent);
}

/**
 * Reconstruct a perturbed normal from finite-difference height gradients.
 *
 * @param normal     Original surface normal
 * @param tangent    Tangent vector from computeTangentBasis
 * @param binormal   Binormal vector from computeTangentBasis
 * @param dh_tangent Height gradient along tangent direction (scaled height delta / DX)
 * @param dh_binorm  Height gradient along binormal direction (scaled height delta / DX)
 * @return Perturbed and normalized surface normal
 */
vec3 perturbNormal(vec3 normal, vec3 tangent, vec3 binormal, float dh_tangent, float dh_binorm) {
    return normalize(normal + tangent * dh_tangent + binormal * dh_binorm);
}
```

**Step 2: Commit**

```bash
git add src/lib/normal-map.glsl
git commit -m "feat: add normal-map.glsl common library"
```

---

### Task 10: Migrate planet-earth shader to use commons

**Files:**
- Modify: `src/shaders/planet-earth/meta.json`
- Modify: `src/shaders/planet-earth/image.glsl`

**Step 1: Update meta.json**

```json
{
  "title": "Earth-like Planet",
  "description": "A procedural Earth-like world with oceans, forests, deserts, ice caps, clouds, and atmospheric scattering. All terrain generated from inline hash-based noise.",
  "date": "2025-11-27",
  "tags": ["exoplanets", "space", "3d"],
  "links": {},
  "commons": ["sphere", "noise-value", "normal-map", "lighting", "atmosphere"]
}
```

**Step 2: Rewrite image.glsl to use commons**

Remove: `hashN`, `hashN2`, `valueNoise2D`, `ValueNoise`, `Rotate`, `Heightmap` function definitions.

Replace with calls to `valueNoise3D` (was `ValueNoise`), `fbmValue` (was `Heightmap`), `sphereUV`, `blinnPhong`, `rimGlow`, `atmosEdge`, `halo`, and `computeTangentBasis`/`perturbNormal`.

The `Heightmap` function becomes a thin wrapper calling `fbmValue`:

```glsl
float Heightmap(vec3 pos) {
    return fbmValue(pos * 1.5, 6, 2.77, 1.0 / 2.1);
}
```

Key renames for commons compatibility:
- `ValueNoise(x)` → `valueNoise3D(x)`
- Inline lighting code → `blinnPhong(normal, LIGHT_DIR, 15.0, specAmount, 0.05)`
- Inline atmosphere → `rimGlow()`, `atmosEdge()`, `halo()`

Earth keeps its unique: biome color selection, cloud layer logic, water waves, and the `Heightmap` wrapper.

**Step 3: Verify shader linter passes**

Run: `npm run lint:shaders`
Expected: planet-earth/image.glsl passes

**Step 4: Commit**

```bash
git add src/shaders/planet-earth/meta.json src/shaders/planet-earth/image.glsl
git commit -m "refactor: migrate planet-earth to use commons library"
```

---

### Task 11: Migrate planet-lava shader to use commons

**Files:**
- Modify: `src/shaders/planet-lava/meta.json`
- Modify: `src/shaders/planet-lava/image.glsl`

**Step 1: Update meta.json**

```json
{
  "title": "Lava World",
  "description": "A molten lava planet with boiling surface, glowing cracks, atmospheric haze, and volumetric corona rays. Fully procedural using simplex noise.",
  "date": "2025-11-27",
  "tags": ["exoplanets", "space", "3d"],
  "links": {},
  "commons": ["sphere", "normal-map", "lighting", "atmosphere"]
}
```

Note: Lava does NOT use `noise-value` commons because its noise implementation differs (uses `fract(sin(n)*1e4)` with step vector `(110, 241, 171)` instead of `(1, 157, 113)` and different gain constants). Extracting would change the visual output. Keep lava's noise inline.

**Step 2: Rewrite image.glsl to use commons**

Remove: `Rotate` function.

Replace inline lighting/atmosphere with commons calls:
- Lighting → `blinnPhong(normal, LIGHT_DIR, ...)`
- Rim → `rimGlow(pos.z, RIM_COL, 1.5, 0.8)`
- Edge blend → `atmosEdge(color, atmosCol, uv, 1.0)`
- Off-sphere → `halo(uv, ATMOS_COL, LIGHT_DIR, 1.5)`
- Normal mapping → `computeTangentBasis` + `perturbNormal`

Lava keeps its unique: `hash`, `noise`, `fbm`, `lavaRamp`, `crustHeight`, `lavaHeat`, `square`.

**Step 3: Verify shader linter passes**

Run: `npm run lint:shaders`
Expected: planet-lava/image.glsl passes

**Step 4: Commit**

```bash
git add src/shaders/planet-lava/meta.json src/shaders/planet-lava/image.glsl
git commit -m "refactor: migrate planet-lava to use commons library"
```

---

### Task 12: Migrate planet-gas-giant shader to use commons

**Files:**
- Modify: `src/shaders/planet-gas-giant/meta.json`
- Modify: `src/shaders/planet-gas-giant/image.glsl`

**Step 1: Update meta.json**

```json
{
  "title": "Gas Giant",
  "description": "Jupiter-like gas giant with alternating tan zones and brown belts, turbulent eddies at band boundaries, and the Great Red Spot. Fully procedural with no texture dependencies.",
  "date": "2025-11-27",
  "tags": ["exoplanets", "space", "3d"],
  "links": {},
  "commons": ["sphere", "noise-pcg", "lighting", "atmosphere"]
}
```

**Step 2: Rewrite image.glsl to use commons**

Remove: `hash1`, `hash3`, `noise1`, `noise3`, `fbm1`, `fbm3`, `m` (decorrelation matrix), `Rotate`.

Rename calls:
- `hash1(x)` → `pcgHash1(x)`
- `hash3(x)` → `pcgHash3(x)`
- `noise1(x)` → `pcgNoise1(x)`
- `noise3(x)` → `pcgNoise3(x)`
- `fbm1(x)` → `pcgFbm1(x)`
- `fbm3(x)` → `pcgFbm3(x)`
- `m` matrix → `PCG_FBM_MATRIX` (no longer referenced directly since fbm3 uses it internally)
- Inline lighting → `blinnPhong(normal, LIGHT_DIR, 30.0, 0.1, 0.05)`
- Inline atmosphere → `atmosEdge()`, `rimGlow()`, `halo()`

Gas Giant keeps its unique: `bandColor()`, GRS logic, storm features, `tau` constant, all `#define`s.

**Step 3: Verify shader linter passes**

Run: `npm run lint:shaders`
Expected: planet-gas-giant/image.glsl passes

**Step 4: Commit**

```bash
git add src/shaders/planet-gas-giant/meta.json src/shaders/planet-gas-giant/image.glsl
git commit -m "refactor: migrate planet-gas-giant to use commons library"
```

---

### Task 13: Migrate planet-neptune-like shader to use commons

**Files:**
- Modify: `src/shaders/planet-neptune-like/meta.json`
- Modify: `src/shaders/planet-neptune-like/image.glsl`

**Step 1: Update meta.json**

```json
{
  "title": "Neptune-like",
  "description": "A Neptune-like ice giant with colorful banded atmosphere, turbulent storms, and dramatic lighting. Fully procedural with no texture dependencies.",
  "date": "2025-11-27",
  "tags": ["exoplanets", "space", "3d"],
  "links": {},
  "commons": ["sphere", "noise-pcg", "lighting", "atmosphere"]
}
```

**Step 2: Rewrite image.glsl to use commons**

Remove: `hash1`, `hash3`, `hash4`, `noise1`, `noise3`, `fbm1`, `fbm3`, `m` (decorrelation matrix), `Rotate`.

Rename calls (same pattern as gas giant):
- `hash1` → `pcgHash1`, `hash3` → `pcgHash3`, `hash4` → `pcgHash4`
- `noise1` → `pcgNoise1`, `noise3` → `pcgNoise3`
- `fbm1` → `pcgFbm1`, `fbm3` → `pcgFbm3`
- Inline lighting → `blinnPhong(normal, LIGHT_DIR, 20.0, 0.15, 0.05)`
- Inline atmosphere → `atmosEdge()`, `rimGlow()`, `halo()`

Neptune keeps its unique: `hsv()`, seed-based palette generation, band turbulence logic, storm features, `tau` constant.

**Step 3: Verify shader linter passes**

Run: `npm run lint:shaders`
Expected: planet-neptune-like/image.glsl passes

**Step 4: Commit**

```bash
git add src/shaders/planet-neptune-like/meta.json src/shaders/planet-neptune-like/image.glsl
git commit -m "refactor: migrate planet-neptune-like to use commons library"
```

---

### Task 14: Full build verification

**Files:** None (verification only)

**Step 1: Run the complete build pipeline**

Run: `npm run build`
Expected: All steps pass:
1. Image optimization
2. Shader linting (all shaders pass including migrated planets)
3. TypeScript type-check
4. Vite production build

**Step 2: Verify non-planet shaders are unaffected**

Run: `npm run lint:shaders`
Expected: All shaders pass — non-planet shaders have no `commons` and work exactly as before.

**Step 3: Final commit with any fixes**

If any issues arise, fix and commit. Otherwise, task is complete.

---

### Task 15: Update CLAUDE.md and memory

**Files:**
- Modify: `CLAUDE.md` — add `src/lib/` documentation to the File Structure and Adding a New Shader sections

**Step 1: Update CLAUDE.md file structure**

Add `src/lib/` to the file structure diagram and document the commons system.

**Step 2: Update memory**

Update `MEMORY.md` with the new commons architecture pattern.

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add commons library documentation to CLAUDE.md"
```
