/**
 * Attractor Study #05: Halvorsen — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-15
 *
 * Simulates Halvorsen's symmetric chaotic attractor, a system with exact
 * three-fold rotational symmetry. 10 particles with stochastic respawn dynamics
 * are traced through 3D phase space using distance-field line rendering and
 * feedback accumulation. Velocity-mapped HSL coloring (pink-to-blue) with
 * blink pulses. Ported from gcanvas attractor-3d-demo / halvorsen.js.
 *
 * Halvorsen attractor equations:
 *   dx/dt = -A*x - 4*y - 4*z - y^2
 *   dy/dt = -A*y - 4*z - 4*x - z^2
 *   dz/dt = -A*z - 4*x - 4*y - x^2
 * Parameter: A = 1.89
 *
 * The three-fold symmetry is evident: each equation has the same structure,
 * cyclically permuting (x, y, z). This produces a triangular-lobed attractor
 * when viewed along the (1,1,1) diagonal.
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..9, 0):       Particle positions (xyz). Respawn on escape or by random chance.
// Pixel (CAM_PIXEL, 0):   Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:       Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define NUM_PARTICLES 10   // Simultaneous particles tracing the attractor.
                           // More = denser trails. Above 20: GPU-heavy (NUM_PARTICLES * STEPS).
#define STEPS 5.0          // Euler steps per particle per frame — kept low since the
                           // Halvorsen system moves fast. Above 15: trail segments get long.
#define BASE_VIEW_SCALE 0.05  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.95         // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.5      // Base brightness per segment.
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.
#define RESPAWN_CHANCE 0.025  // Per-particle per-frame probability of random respawn.
                              // Higher = more frequent refreshes. 0.0 = only respawn on escape.

// ── Halvorsen parameter ──
// A controls the linear dissipation on each axis. At A=1.89 the system is chaotic.
// Lower values make the attractor expand; higher values cause it to collapse.
#define A 1.89             // Dissipation constant — classic value for chaotic regime.

// ── Color settings — pink-to-blue palette ──
#define MIN_HUE 320.0      // Hue for fastest velocity (pink-magenta).
#define MAX_HUE 220.0      // Hue for slowest velocity (blue).
                           // Note: MIN_HUE > MAX_HUE means hue wraps through red/pink.
#define MAX_SPEED 40.0     // Velocity clamp for hue mapping.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.80    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — random brightness pulses ──
#define BLINK_FREQ 7.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.5    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.2    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.3    // Lightness boost during blink.

// ── State pixel index for camera ──
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Forward Euler integration of the Halvorsen system.
// dx/dt = -A*x - 4*y - 4*z - y^2
// dy/dt = -A*y - 4*z - 4*x - z^2
// dz/dt = -A*z - 4*x - 4*y - x^2
// Note the cyclic symmetry: each component has the same form under (x,y,z) -> (y,z,x).
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        -A * cur.x - 4.0 * cur.y - 4.0 * cur.z - cur.y * cur.y,
        -A * cur.y - 4.0 * cur.z - 4.0 * cur.x - cur.z * cur.z,
        -A * cur.z - 4.0 * cur.x - 4.0 * cur.y - cur.x * cur.x
    ) * dt;
}

// Inline yaw-pitch projection — applies yaw (cy/sy) then pitch (cp/sp) rotation.
// More efficient than building a full mat3 when only 2D output is needed.
vec2 project(vec3 p, float cy, float sy, float cp, float sp) {
    vec3 r = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
    return vec2(r.x, r.y * cp - r.z * sp);
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point `p` to the line segment (a, b).
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else              rgb = vec3(c, 0.0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera yaw/pitch stored as normalized [0,1] values in rg channels;
    // last mouse position in zw (-1 = not tracking).
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float yaw, pitch;
    vec2 lastMouse = camState.zw;
    if (iFrame == 0) {
        yaw = 0.615;
        pitch = 0.495;
        lastMouse = vec2(-1.0);
    } else {
        yaw   = camState.r * 6.28318;
        pitch = (camState.g - 0.5) * 3.14159;
    }

    bool pressed = iMouse.z > 0.0;
    if (pressed) {
        yaw   = (iMouse.x / iResolution.x) * 6.28318;
        pitch = (iMouse.y / iResolution.y - 0.5) * 3.14159 * 0.6;
    }

    // Detect active mouse movement for instant trail clear
    bool wasTracking = lastMouse.x >= 0.0;
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // Precompute camera trig
    float cy = cos(yaw),  sy = sin(yaw);
    float cp = cos(pitch), sp = sin(pitch);

    // ── Integrate all particles, find closest line segment ──
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.008 * SPEED;

    for (int pid = 0; pid < NUM_PARTICLES; pid++) {
        vec3 pos = texelFetch(iChannel0, ivec2(pid, 0), 0).xyz;

        for (float i = 0.0; i < STEPS; i++) {
            vec3 next = integrate(pos, dt);

            vec2 a = project(pos,  cy, sy, cp, sp) * viewScale;
            vec2 b = project(next, cy, sy, cp, sp) * viewScale;

            float segD = dfLine(a, b, uv);
            if (segD < d) {
                d = segD;
                bestSpeed = length(next - pos) / dt;
            }

            pos = next;
        }
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // ── Blink ──
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.25
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // ── Color: pink (fast) -> blue (slow), with continuous hue rotation ──
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    if (py == 0 && px < NUM_PARTICLES) {
        // Particle state pixels — integrate this particle forward.
        if (iFrame == 0) {
            // Spread particles evenly around a small circle near the attractor.
            // Radius 0.5 is well within the basin of attraction for A=1.89.
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 0.5;
            fragColor = vec4(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
            }
            // TECHNIQUE: Stochastic respawn
            // Particles that escape beyond radius 20 are respawned, plus a small
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal
            // even for well-behaved orbits. Prevents stale/stuck particles.
            float rng = hash(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > 20.0 || rng < RESPAWN_CHANCE) {
                float angle = hash(float(px) + iTime) * 6.28318;
                float r = 0.5;
                pos = vec3(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0));
            }
            fragColor = vec4(pos, 0.0);
        }
    } else if (py == 0 && px == CAM_PIXEL) {
        // Camera state pixel — persist yaw & pitch as normalized [0,1], mouse pos in zw.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(mod(yaw, 6.28318) / 6.28318, pitch / 3.14159 + 0.5, storeMouse);
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating to avoid smeared trails.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0.0);
    }
}
