/**
 * Attractor Study #06: Chua — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-16
 *
 * Simulates Chua's circuit attractor, the first physical electronic circuit
 * proven to exhibit chaos (Leon Chua, 1983). A piecewise-linear nonlinear
 * resistor (Chua diode) drives the system into a double-scroll regime — two
 * spiralling lobes joined by a saddle region. 20 particles with stochastic
 * respawn dynamics are traced through 3D phase space using distance-field line
 * rendering and feedback accumulation. Velocity-mapped HSL coloring
 * (green-to-cyan) with blink pulses.
 * Ported from gcanvas attractor-3d-demo / chua.js.
 *
 * Chua's circuit equations:
 *   dx/dt = alpha * (y - x - g(x))
 *   dy/dt = x - y + z
 *   dz/dt = -gamma * y
 * where g(x) = m1*x + 0.5*(m0-m1)*(|x+1| - |x-1|) is the Chua diode.
 *
 * Parameters: alpha = 15.6, gamma = 25.58, m0 = -2.0 (inner slope),
 *             m1 = 0.0 (outer slope) — standard double-scroll regime.
 *
 * The piecewise-linear diode has three segments:
 *   g(x) = m0*x           for |x| < 1  (inner, steeper negative resistance)
 *   g(x) = m1*x +/- (m0-m1)  for |x| >= 1 (outer, shallower slope)
 * This creates two equilibrium regions (the scroll centers at x ~ +/- 1.5)
 * connected by a narrow saddle channel — particles spiral within a lobe then
 * occasionally hop to the other, producing the iconic double-scroll shape.
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..19, 0):      Particle positions (xyz). Respawn on escape or by random chance.
// Pixel (CAM_PIXEL, 0):   Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:        Accumulated trail color (RGB). Faded each frame by FADE.

// -- Integration & rendering --
#define NUM_PARTICLES 20   // Simultaneous particles tracing the attractor.
                           // More = denser trails. Above 30: GPU-heavy (NUM_PARTICLES * STEPS).
#define STEPS 5.0          // Euler steps per particle per frame — kept low since Chua
                           // moves fast with alpha=15.6. Above 15: trail segments get long.
#define BASE_VIEW_SCALE 0.15  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 1.5          // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.11     // Base brightness per segment.
#define FADE 0.995         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 1.2          // Distance-field softness (pixels) — smaller = thinner lines.
#define RESPAWN_CHANCE 0.005  // Per-particle per-frame probability of random respawn.
                              // Higher = more frequent refreshes. 0.0 = only respawn on escape.
#define ESCAPE_RADIUS 12.0 // Particles beyond this distance are respawned.
                           // Chua is compact; 12 is well outside the attractor basin.

// -- Chua diode parameters --
// Alpha controls the coupling strength between the capacitor voltages.
// At alpha=15.6 with these diode slopes, the system is in the double-scroll regime.
// Lower alpha (~9): period-1 orbit. Higher alpha (~16+): more chaotic, wider scrolls.
#define ALPHA 15.6         // Coupling constant — drives double-scroll chaos.
// Gamma controls the inductor's influence. At 25.58 the system balances
// spiral inward motion with cross-lobe hopping.
#define GAMMA 25.58        // Inductor coupling — higher compresses z-axis dynamics.
// Chua diode piecewise slopes:
// m0 = inner slope (|x| < 1), m1 = outer slope (|x| >= 1).
// The negative resistance (m0 < 0) provides energy to sustain oscillations.
#define M0 -2.0            // Inner diode slope — steeper negative = stronger scroll.
#define M1 0.0             // Outer diode slope — 0.0 = flat outside breakpoints.

// -- Color settings — green-to-cyan palette --
#define MIN_HUE 90.0       // Hue for fastest velocity (green — scroll transitions).
#define MAX_HUE 180.0      // Hue for slowest velocity (cyan — spiral arms).
#define MAX_SPEED 20.0     // Velocity clamp for hue mapping.
#define HUE_SHIFT_SPEED 10.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.90    // Base color saturation.
#define LIGHTNESS 0.48     // Base HSL lightness.

// -- Blink settings — random brightness pulses --
#define BLINK_FREQ 7.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.5    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.2    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.3    // Lightness boost during blink.

// -- State pixel index for camera --
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Piecewise-linear Chua diode characteristic.
// g(x) = m1*x + 0.5*(m0-m1)*(|x+1| - |x-1|)
// This simplifies to m0*x for |x|<1 and m1*x +/- (m0-m1) for |x|>=1,
// creating the three-segment nonlinearity that drives the double-scroll.
float chuaDiode(float x) {
    return M1 * x + 0.5 * (M0 - M1) * (abs(x + 1.0) - abs(x - 1.0));
}

// Forward Euler integration of Chua's circuit equations.
// dx/dt = alpha * (y - x - g(x))   — voltage across C1
// dy/dt = x - y + z                — voltage across C2
// dz/dt = -gamma * y               — current through inductor
vec3 integrate(vec3 cur, float dt) {
    float g = chuaDiode(cur.x);
    return cur + vec3(
        ALPHA * (cur.y - cur.x - g),
        cur.x - cur.y + cur.z,
        -GAMMA * cur.y
    ) * dt;
}

// Inline yaw-pitch projection — applies yaw (cy/sy) then pitch (cp/sp) rotation.
// More efficient than building a full mat3 when only 2D output is needed.
vec2 project(vec3 p, float cy, float sy, float cp, float sp) {
    vec3 r = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
    return vec2(r.x, r.y * cp - r.z * sp);
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
        yaw = 0.5;
        pitch = -0.6;
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

    // -- Integrate all particles, find closest line segment --
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.01 * SPEED;

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

    // -- Blink --
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hashN(blinkSeed) < 0.25
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // -- Color: green (fast, scroll transitions) -> cyan (slow, spiral arms) --
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // -- State persistence (row 0) & trail accumulation --
    if (py == 0 && px < NUM_PARTICLES) {
        // Particle state pixels — integrate this particle forward.
        if (iFrame == 0) {
            // TECHNIQUE: Dual-lobe seeding
            // Seed half the particles into each scroll lobe (x ~ +/-1.5).
            // This ensures both lobes are populated from frame 1, rather than
            // waiting for particles to migrate across the saddle region.
            float sign = (px < NUM_PARTICLES / 2) ? 1.0 : -1.0;
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 0.1;
            fragColor = vec4(sign * 1.5 + r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
            }
            // TECHNIQUE: Stochastic respawn into alternating lobes
            // Particles that escape beyond ESCAPE_RADIUS are respawned, plus a small
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal.
            // Respawn lobe is randomly chosen so both scrolls stay populated.
            float rng = hashN(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > ESCAPE_RADIUS || rng < RESPAWN_CHANCE) {
                float angle = hashN(float(px) + iTime) * 6.28318;
                float sign = hashN(float(px) * 7.3 + iTime * 31.0) < 0.5 ? 1.0 : -1.0;
                float r = 0.1;
                pos = vec3(sign * 1.5 + r * cos(angle), r * sin(angle), r * sin(angle * 0.7));
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
