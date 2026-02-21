/**
 * Orbit Camera Commons
 * @author guinetik
 * @date 2026-02-20
 *
 * Reusable orbit camera with mouse-drag inertia, friction decay, and idle
 * auto-rotation. Split into two parts:
 *
 * 1. **Buffer-A side** — `orbitCameraUpdate()` runs the state machine:
 *    drag detection, velocity blending, friction, idle orbit blend.
 *    Stores yaw/pitch/velocities in pixel (0,0), prev mouse in pixel (1,0).
 *
 * 2. **Image side** — `orbitCameraRay()` reads buffer state and computes
 *    a spherical orbit camera with `cameraLookAt()` view matrix.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 *
 * TECHNIQUE: Drag detection via mouse-delta dead zone
 * Instead of relying on iMouse.z (which stays positive after first click
 * in some renderers), we compare current vs previous mouse position.
 * If the squared delta exceeds DRAG_DEAD_ZONE², we're dragging.
 *
 * TECHNIQUE: Inertia with idle orbit blend
 * On release, velocity decays by FRICTION per frame. When yaw velocity
 * drops below IDLE_THRESHOLD, it blends toward IDLE_ORBIT_SPEED so the
 * camera never fully stops. Pitch always decays to zero (no idle tilt).
 */

// Guard TAU define to avoid conflicts with shader-local constants
#ifndef _CAM_TAU
#define _CAM_TAU 6.28318530718
#endif

// -------------------------------------------------------
// Configuration struct — all tunable camera parameters
// -------------------------------------------------------

/**
 * Orbit camera tuning parameters. Create via orbitCameraDefaultConfig()
 * and override individual fields as needed.
 *
 * friction       — velocity multiplier per frame when not dragging (0.99 = slow decay, 0.9 = fast)
 * dragSensitivity — horizontal drag-to-velocity scale
 * pitchSensitivity — vertical drag-to-velocity scale (typically < dragSensitivity)
 * velocitySmooth  — blend factor for new drag velocity (0 = ignore drag, 1 = instant)
 * idleOrbitSpeed  — yaw velocity target when coasting below threshold (rad/frame)
 * idleThreshold   — velocity magnitude below which idle blend kicks in
 * idleBlend       — blend rate toward idle orbit speed (0 = never, 1 = instant)
 * dragDeadZone    — minimum mouse delta to register as drag (normalized coords)
 * pitchMin        — minimum pitch angle in radians (negative = look down)
 * pitchMax        — maximum pitch angle in radians (positive = look up)
 */
struct OrbitCameraConfig {
    float friction;
    float dragSensitivity;
    float pitchSensitivity;
    float velocitySmooth;
    float idleOrbitSpeed;
    float idleThreshold;
    float idleBlend;
    float dragDeadZone;
    float pitchMin;
    float pitchMax;
};

/**
 * Sensible defaults matching the caustics-pool camera behavior.
 * Override pitchMin/pitchMax per shader for different viewing angles.
 */
OrbitCameraConfig orbitCameraDefaultConfig() {
    OrbitCameraConfig cfg;
    cfg.friction         = 0.993;
    cfg.dragSensitivity  = 2.0;
    cfg.pitchSensitivity = 0.3;
    cfg.velocitySmooth   = 0.35;
    cfg.idleOrbitSpeed   = 0.003;
    cfg.idleThreshold    = 0.0003;
    cfg.idleBlend        = 0.015;
    cfg.dragDeadZone     = 0.0001;
    cfg.pitchMin         = -0.35;
    cfg.pitchMax         =  0.18;
    return cfg;
}

// -------------------------------------------------------
// Buffer-A: full camera state machine
// -------------------------------------------------------

/**
 * Run the orbit camera state machine for a single frame.
 * Call this from buffer-a's mainImage(). Only pixels (0,0) and (1,0)
 * are written; all others output vec4(0).
 *
 * Uniforms are passed as parameters (not referenced as globals) so this
 * function works in Shadertoy's Common tab where uniforms aren't in scope.
 *
 * @param fragColor    Output color (state data, not visual)
 * @param fragCoord    Fragment coordinates
 * @param stateSampler Previous frame's buffer (self-feedback)
 * @param cfg          Camera configuration
 * @param frame        Current frame number (iFrame)
 * @param mouse        Mouse state (iMouse)
 * @param resolution   Viewport resolution (iResolution)
 */
void orbitCameraUpdate(
    out vec4 fragColor,
    in vec2 fragCoord,
    in sampler2D stateSampler,
    in OrbitCameraConfig cfg,
    int frame,
    vec4 mouse,
    vec3 resolution
) {
    // Only pixels (0,0) and (1,0) store state
    if (fragCoord.x > 1.5 || fragCoord.y > 1.5) {
        fragColor = vec4(0.0);
        return;
    }

    // Read previous state from both pixels
    vec4 state = texelFetch(stateSampler, ivec2(0, 0), 0);
    vec4 prevMouseState = texelFetch(stateSampler, ivec2(1, 0), 0);

    float yaw      = state.x;
    float pitch    = state.y;
    float yawVel   = state.z;
    float pitchVel = state.w;
    float prevMX   = prevMouseState.x;
    float prevMY   = prevMouseState.y;

    // Initialize on first frame
    if (frame == 0) {
        yaw      = 0.0;
        pitch    = 0.0;
        yawVel   = cfg.idleOrbitSpeed;
        pitchVel = 0.0;
        prevMX   = mouse.x / resolution.x;
        prevMY   = mouse.y / resolution.y;
    }

    float mouseX = mouse.x / resolution.x;
    float mouseY = mouse.y / resolution.y;

    // Detect drag: mouse position actually changed this frame
    float dx = mouseX - prevMX;
    float dy = mouseY - prevMY;
    bool dragging = (dx * dx + dy * dy) > cfg.dragDeadZone * cfg.dragDeadZone;

    if (dragging) {
        // Blend drag delta into velocity for smooth momentum buildup
        float dragYawVel   = dx * cfg.dragSensitivity;
        float dragPitchVel = -dy * cfg.pitchSensitivity; // inverted Y: drag up = look higher

        yawVel   = mix(yawVel,   dragYawVel,   cfg.velocitySmooth);
        pitchVel = mix(pitchVel, dragPitchVel, cfg.velocitySmooth);
    } else {
        // Not dragging: friction decay
        yawVel   *= cfg.friction;
        pitchVel *= cfg.friction;

        // Yaw blends toward idle orbit when nearly stopped
        if (abs(yawVel) < cfg.idleThreshold) {
            yawVel = mix(yawVel, cfg.idleOrbitSpeed, cfg.idleBlend);
        }

        // Pitch decays to zero (no idle pitch movement)
        if (abs(pitchVel) < cfg.idleThreshold) {
            pitchVel = mix(pitchVel, 0.0, cfg.idleBlend);
        }
    }

    // Integrate angles
    yaw += yawVel;
    yaw = mod(yaw, _CAM_TAU);

    pitch += pitchVel;
    pitch = clamp(pitch, cfg.pitchMin, cfg.pitchMax);

    // Output: pixel (0,0) = angles + velocities, pixel (1,0) = mouse
    if (fragCoord.x < 0.5) {
        fragColor = vec4(yaw, pitch, yawVel, pitchVel);
    } else {
        fragColor = vec4(mouseX, mouseY, 0.0, 0.0);
    }
}

// -------------------------------------------------------
// Image side: view matrix + orbit ray
// -------------------------------------------------------

/**
 * Construct a right-handed view matrix (camera-to-world).
 * Named cameraLookAt to avoid clashes with shader-local lookAt functions.
 *
 * @param ro  Camera position (ray origin)
 * @param ta  Look-at target point
 * @return 3x3 view matrix [right, up, forward]
 */
mat3 cameraLookAt(vec3 ro, vec3 ta) {
    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    return mat3(right, up, fwd);
}

/**
 * Result of orbit camera ray computation.
 * ro    — ray origin (camera position in world space)
 * rd    — ray direction (normalized, per-pixel)
 * yaw   — current yaw angle from buffer state
 * pitch — current pitch angle from buffer state
 */
struct OrbitCameraRay {
    vec3 ro;
    vec3 rd;
    float yaw;
    float pitch;
};

/**
 * Compute orbit camera ray from buffer state.
 *
 * Reads yaw/pitch from pixel (0,0) of the state buffer, converts to a
 * spherical orbit position at the given distance and height from the
 * target, and builds a per-pixel ray direction.
 *
 * TECHNIQUE: Spherical orbit via base elevation
 * The base elevation angle is derived from CAM_HEIGHT and CAM_DIST,
 * then pitch is added on top. This keeps the camera at approximately
 * the right height regardless of the orbit distance.
 *
 * @param stateSampler  Buffer containing camera state (pixel 0,0)
 * @param fragCoord     Fragment coordinates
 * @param resolution    Viewport resolution (iResolution.xy)
 * @param dist          Horizontal orbit distance from target
 * @param height        Base camera height above target
 * @param target        Look-at target point
 * @param fov           Field of view (focal length inverse — lower = telephoto)
 * @return OrbitCameraRay with ro, rd, yaw, pitch
 */
OrbitCameraRay orbitCameraRay(
    in sampler2D stateSampler,
    in vec2 fragCoord,
    in vec2 resolution,
    float dist,
    float height,
    vec3 target,
    float fov
) {
    OrbitCameraRay cam;

    vec2 uv = (fragCoord * 2.0 - resolution) / min(resolution.x, resolution.y);

    // Camera angles from buffer state (pixel 0,0)
    vec4 camState = texelFetch(stateSampler, ivec2(0, 0), 0);
    cam.yaw   = camState.x;
    cam.pitch = camState.y;

    // Spherical camera: pitch tilts elevation around the base height
    float baseElev = atan(height, dist);
    float elev     = baseElev + cam.pitch;
    float camR     = length(vec2(dist, height));

    cam.ro = vec3(
        cos(elev) * cos(cam.yaw) * camR,
        sin(elev) * camR,
        cos(elev) * sin(cam.yaw) * camR
    );

    mat3 viewMat = cameraLookAt(cam.ro, target);
    cam.rd = viewMat * normalize(vec3(uv, fov));

    return cam;
}
