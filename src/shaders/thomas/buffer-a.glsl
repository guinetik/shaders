/**
 * Attractor Study #04: Thomas — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-13
 *
 * Simulates Thomas' cyclically symmetric attractor (1999, Rene Thomas), a
 * dissipative system with three-fold cyclic symmetry where each variable feeds
 * into the next via sine coupling. 16 particles are traced simultaneously through
 * 3D phase space with distance-field line rendering and feedback accumulation.
 * Velocity-mapped HSL coloring (green/teal) with blink pulses.
 *
 * Thomas attractor equations:
 *   dx/dt = sin(y) - b*x
 *   dy/dt = sin(z) - b*y
 *   dz/dt = sin(x) - b*z
 * Parameter: b = 0.208186 (dissipation — below ~0.2 the system becomes chaotic,
 *   above ~0.3 it decays to a fixed point)
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..15, 0):     Particle positions (xyz), one per pixel. 16 total.
// Pixel (CAM_PIXEL, 0):  Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define NUM_PARTICLES 16   // Number of simultaneous particles tracing the attractor.
                           // More = denser visualization. Above 32: GPU-heavy per frame.
#define STEPS 32.0         // Euler steps per particle per frame — more = longer trail segment.
                           // Below 8: sparse. Above 64: GPU cost grows (NUM_PARTICLES * STEPS).
#define VIEW_SCALE 0.16    // 3D-to-screen scale — smaller zooms out, larger zooms in.
#define SPEED 0.65         // Time-step multiplier — higher = faster traversal.
                           // Below 0.2: sluggish. Above 1.5: may overshoot sine coupling.
#define INTENSITY 0.18     // Base brightness per segment — higher = brighter trails.
#define FADE 0.993         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.

// ── Thomas attractor parameter ──
// b controls dissipation. The system is cyclically symmetric: each axis damps
// itself by -b*x_i and is driven by sin(x_{i+1}). At b=0.208186, the system
// exhibits a strange attractor with intricate folded structure.
#define B 0.208186         // Dissipation constant — lower = more chaotic, higher = decays to fixed point.

// ── Color settings — green/teal palette ──
#define MIN_HUE 120.0      // Hue for fastest velocity (green).
#define MAX_HUE 200.0      // Hue for slowest velocity (teal-cyan).
#define MAX_SPEED 2.5      // Velocity clamp for hue mapping — Thomas is slow-moving compared to Lorenz.
#define HUE_SHIFT_SPEED 8.0   // Degrees/sec of continuous hue rotation.
#define SATURATION 0.85    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — subtle random brightness pulses ──
#define BLINK_FREQ 6.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.4    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.15   // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.2    // Lightness boost during blink.

// ── State pixel index for camera ──
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Forward Euler integration of the Thomas system.
// dx/dt = sin(y) - b*x, dy/dt = sin(z) - b*y, dz/dt = sin(x) - b*z
// The cyclic symmetry means swapping (x,y,z) -> (y,z,x) gives the same equations.
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        sin(cur.y) - B * cur.x,
        sin(cur.z) - B * cur.y,
        sin(cur.x) - B * cur.z
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
    else if (h < 3.0) rgb = vec3(0, c, x);
    else if (h < 4.0) rgb = vec3(0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0, c);
    else              rgb = vec3(c, 0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera yaw/pitch stored as normalized [0,1] values in rg channels;
    // last mouse position in zw (-1 = not tracking).
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float yaw, pitch;
    vec2 lastMouse = camState.zw;
    if (iFrame == 0) {
        yaw = 0.2;
        pitch = 0.35;
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

    // Precompute camera trig (same for all particles & segments)
    float cy = cos(yaw),  sy = sin(yaw);
    float cp = cos(pitch), sp = sin(pitch);

    // ── Integrate all particles, find closest line segment ──
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.08 * SPEED;

    for (int pid = 0; pid < NUM_PARTICLES; pid++) {
        vec3 pos = texelFetch(iChannel0, ivec2(pid, 0), 0).xyz;

        for (float i = 0.0; i < STEPS; i++) {
            vec3 next = integrate(pos, dt);

            vec2 a = project(pos,  cy, sy, cp, sp) * VIEW_SCALE;
            vec2 b = project(next, cy, sy, cp, sp) * VIEW_SCALE;

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

    // ── Color: green (fast) -> cyan-blue (slow), with continuous hue rotation ──
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
            // Spread particles evenly around a circle in the attractor's domain.
            // Radius 1.5 is within the basin of attraction for b=0.208186.
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 1.5;
            fragColor = vec4(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
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
