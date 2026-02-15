/**
 * Attractor Study #03: Rossler — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-11
 *
 * Simulates the Rossler attractor (1976, Otto Rossler), a minimal three-variable
 * system that produces a single-scroll spiral with periodic z-axis foldback bursts.
 * 8 particles with per-particle parameter variation trace the attractor with
 * distance-field line rendering and feedback accumulation. Stochastic respawn
 * dynamics continuously regenerate particles for organic renewal without hard
 * cycle cuts. Velocity-mapped HSL coloring (yellow-orange to purple) with
 * per-particle intensity modulation and blink pulses.
 *
 * Rossler attractor equations:
 *   dx/dt = -y - z
 *   dy/dt = x + a*y
 *   dz/dt = b + z*(x - c)
 * Parameters: a=0.2, b=0.2, c=5.7 (classic single-scroll chaotic regime)
 *
 * The z-equation creates the characteristic "foldback" spike: when x exceeds c,
 * z grows exponentially, then reinjection occurs as the trajectory spirals back.
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..7, 0):       Particle positions (xyz). Respawn on escape or by random chance.
// Pixel (PARTICLES, 0):   Camera state — xy = rotation offsets, zw = last mouse.
// All other pixels:       Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define PARTICLES 8        // Number of simultaneous particles — each gets slight parameter
                           // variation for orbit separation. More = denser but heavier.
#define STEPS 50.0        // Euler steps per particle per frame — more = longer trail segment.
                           // Below 30: sparse. Above 200: GPU cost grows (PARTICLES * STEPS).
#define BASE_VIEW_SCALE 0.045  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                               // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.8          // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.50     // Base brightness per segment — kept low since 8 particles overlap.
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.

// ── Stochastic respawn — individual particles reset randomly for continuous renewal ──
#define RESPAWN_CHANCE 0.025   // Per-particle per-frame probability of random respawn.
                               // Higher = more frequent refreshes. 0.0 = only respawn on escape.
                               // At 0.02, each particle respawns roughly every 50 frames (~0.8s at 60fps).
#define ESCAPE_RADIUS 50.0     // Particles beyond this distance are respawned immediately.
                               // The Rossler attractor stays within ~30 units for classic params.

// ── 3D view rotation defaults (radians) ──
#define DEFAULT_ROT_X 1.0      // Initial pitch — tilted forward to reveal the z-axis spike.
#define DEFAULT_ROT_Y 0.2      // Initial yaw — slight side rotation for depth perception.
#define MOUSE_SENSITIVITY 3.0  // Drag-to-rotate speed.

// Attractor 3D center — offset to keep the spiral centered on screen.
// The Rossler attractor orbits roughly around (0, -3, 5) for these parameters.
vec3 center3d = vec3(0.0, -3.0, 5.0);

// ── Color settings — yellow-orange to purple palette ──
#define MIN_HUE 40.0       // Hue for fastest velocity (yellow-orange).
#define MAX_HUE 280.0      // Hue for slowest velocity (purple-magenta).
#define MAX_SPEED 20.0     // Velocity clamp for hue mapping.
#define HUE_SHIFT_SPEED 10.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.85    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — random brightness pulses ──
#define BLINK_FREQ 8.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.3    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.4    // Lightness boost during blink.

// ── Rossler parameters (classic single-scroll chaotic regime) ──
// a: controls the speed of spiral growth in the xy-plane.
// b: sets the minimal z-injection rate. Small but critical for reinjection.
// c: threshold for the z-foldback. When x > c, z spikes upward.
#define PA 0.2             // Rossler 'a' — spiral growth rate. Higher = faster expansion.
#define PB 0.2             // Rossler 'b' — z-injection constant. Higher = more frequent spikes.
#define PC 5.7             // Rossler 'c' — foldback threshold. Higher = larger spiral before spike.

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Forward Euler integration of the Rossler system with per-particle variation.
// `pv` is a small fractional offset (e.g. +/-5%) applied to all three parameters,
// giving each particle a slightly different orbit to fill the attractor volume.
// dx/dt = -y - z, dy/dt = x + a*y, dz/dt = b + z*(x - c)
vec3 integrateV(vec3 cur, float dt, float pv) {
    float a = PA * (1.0 + pv);
    float b = PB * (1.0 + pv);
    float c = PC * (1.0 + pv);
    return cur + vec3(
        -cur.y - cur.z,
        cur.x + a * cur.y,
        b + cur.z * (cur.x - c)
    ) * dt;
}

// Rotation matrix around the X axis by angle `a` (radians).
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

// Rotation matrix around the Y axis by angle `a` (radians).
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// Project a 3D attractor point to 2D screen space.
// Subtracts the attractor center to keep the spiral visible on screen.
vec2 project(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * (p - center3d)).xy * scale;
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point `p` to the line segment (a, b).
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0);
    else if (h < 2.0) rgb = vec3(x, c, 0);
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

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera rotation offsets and last mouse position are stored in a dedicated
    // pixel (PARTICLES, 0) in the self-feedback buffer and read back each frame.
    vec4 rotState = texelFetch(iChannel0, ivec2(PARTICLES, 0), 0);
    float offsetRx = rotState.x;
    float offsetRy = rotState.y;
    vec2 lastMouse = rotState.zw;

    bool pressed = iMouse.z > 0.0;
    bool wasTracking = lastMouse.x >= 0.0;

    // Accumulate rotation delta while dragging
    if (pressed && wasTracking) {
        vec2 delta = iMouse.xy - lastMouse;
        offsetRx -= delta.y / iResolution.y * MOUSE_SENSITIVITY;
        offsetRy -= delta.x / iResolution.x * MOUSE_SENSITIVITY;
    }

    float rx = DEFAULT_ROT_X + offsetRx;
    float ry = DEFAULT_ROT_Y + offsetRy;
    mat3 viewRot = rotY(ry) * rotX(rx);

    // Detect actual mouse movement for instant fade
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // ── Integrate all particles, find closest line segment ──
    // Each of the PARTICLES particles gets +/-5% parameter variation for orbit
    // separation and a per-particle intensity oscillation for visual depth.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float bestAlpha = 1.0; // Per-particle intensity oscillation at the closest segment.
    vec3 finalPos[8];      // Final position of each particle (stored back to state row).

    for (int p = 0; p < PARTICLES; p++) {
        vec3 last = texelFetch(iChannel0, ivec2(p, 0), 0).xyz;
        vec3 next;

        // +/-5% parameter variation per particle for orbit separation.
        // Each particle explores a slightly different dynamical regime.
        float pv = (hash(float(p) * 7.13) - 0.5) * 0.10;

        // TECHNIQUE: Per-particle intensity modulation
        // Each particle oscillates brightness at its own frequency/phase,
        // creating a firefly-like effect where different orbits pulse independently.
        float pFreq = 0.3 + hash(float(p) * 3.71) * 0.7;
        float pPhase = hash(float(p) * 11.3) * 6.2832;
        float pAlpha = 0.3 + 0.7 * max(0.0, sin(iTime * pFreq + pPhase));

        for (float i = 0.0; i < STEPS; i++) {
            next = integrateV(last, 0.016 * SPEED, pv);

            float segD = dfLine(project(last, viewRot, viewScale), project(next, viewRot, viewScale), uv);
            if (segD < d) {
                d = segD;
                bestAlpha = pAlpha;
                // Recompute derivative at `next` for instantaneous speed (color mapping).
                bestSpeed = length(vec3(
                    -next.y - next.z,
                    next.x + PA * next.y,
                    PB + next.z * (next.x - PC)
                ));
            }

            last = next;
        }
        finalPos[p] = next;
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    // Modulated by per-particle alpha for depth variation.
    float c = bestAlpha * (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += bestAlpha * (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness — 30% chance each tick, sine-shaped.
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color: fast regions map to MIN_HUE, slow to MAX_HUE.
    // Continuous hue shift over time adds temporal variety.
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));
    if (py == 0 && px == PARTICLES) {
        // Pixel (PARTICLES, 0): Camera state — rotation offsets + mouse for drag continuity.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(offsetRx, offsetRy, storeMouse);
    } else if (py == 0 && px < PARTICLES) {
        if (iFrame == 0) {
            // Initial spawn near the attractor — z kept small since the
            // Rossler spiral lives mostly in the xy-plane with occasional z-spikes.
            float seed = float(px) * 37.0;
            vec3 pos = vec3(
                (hash(seed) - 0.5) * 10.0,
                (hash(seed * 1.31) - 0.5) * 10.0,
                hash(seed * 2.17) * 0.2
            );
            fragColor = vec4(pos, 0);
        } else {
            vec3 pos = finalPos[px];
            // TECHNIQUE: Stochastic respawn
            // Particles that escape beyond ESCAPE_RADIUS are respawned, plus a small
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal
            // even for well-behaved orbits. Prevents stale/stuck particles and keeps
            // the form regenerating organically without hard cycle cuts.
            float rng = hash(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > ESCAPE_RADIUS || rng < RESPAWN_CHANCE) {
                float seed = float(px) + iTime * 60.0;
                pos = vec3(
                    (hash(seed) - 0.5) * 10.0,
                    (hash(seed * 1.31) - 0.5) * 10.0,
                    hash(seed * 2.17) * 0.2
                );
            }
            fragColor = vec4(pos, 0);
        }
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;

        vec3 newCol = lineColor * c + prev * fade;
        fragColor = vec4(min(newCol, 1.5), 0);  // Cap at 1.5 to prevent white blowout in HDR buffer.
    }
}
