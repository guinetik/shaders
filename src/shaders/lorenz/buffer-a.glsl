/**
 * Attractor Study #02: Lorenz — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-10
 *
 * Simulates the Lorenz attractor (1963, Edward Lorenz), the foundational
 * "butterfly effect" system of deterministic chaos. A single particle is
 * integrated via forward Euler, projected to 2D with interactive orbit
 * control, and rendered as distance-field line segments with feedback
 * accumulation for persistent trails. Velocity-mapped HSL coloring with
 * continuous hue shift and random blink pulses.
 *
 * Lorenz attractor equations:
 *   dx/dt = sigma * (y - x)
 *   dy/dt = x * (rho - z) - y
 *   dz/dt = x * y - beta * z
 * Parameters: sigma=10, rho=28, beta=8/3 (classic chaotic regime)
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixel (0, 0):          Particle position (xyz). Initialized to `start` on frame 0.
// Pixel (CAM_PIXEL, 0):  Camera state — xy = rotation offsets, zw = last mouse position.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define STEPS 96.0         // Euler steps per frame — more = longer trail per frame.
                           // Below 30: sparse trail. Above 200: GPU-heavy.
#define BASE_VIEW_SCALE 0.025  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                               // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.55         // Time-step multiplier — higher = faster traversal of attractor.
                           // Below 0.2: sluggish. Above 1.0: may overshoot.
#define INTENSITY 0.18     // Base brightness per segment — higher = brighter trails.
                           // Below 0.05: dim. Above 0.4: over-saturated.
#define FADE 0.985         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.97: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.

// 3D attractor center (midpoint of the two lobes at z~27 for rho=28).
// Subtracted before projection to keep the attractor centered on screen.
vec3 center3d = vec3(0.0, 0.0, 27.0);

// ── 3D view rotation defaults (radians) ──
// rotX = pi/2 maps xz plane to screen, producing the classic butterfly silhouette.
#define DEFAULT_ROT_X 1.5708       // Initial pitch — pi/2 rotates view to show butterfly wings.
#define DEFAULT_ROT_Y 0.0          // Initial yaw — 0 = symmetric front-on view.
#define MOUSE_SENSITIVITY 3.0      // Drag-to-rotate speed — higher = faster orbit.

#define CAM_PIXEL 1

// ── Color settings ──
#define MIN_HUE 30.0       // Hue for fastest velocity (orange region).
#define MAX_HUE 200.0      // Hue for slowest velocity (cyan-blue region).
#define MAX_SPEED 50.0     // Velocity clamp for hue mapping — above this maps to MIN_HUE.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.85    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — random brightness pulses ──
#define BLINK_FREQ 8.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.3    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.4    // Lightness boost during blink.

// ── Lorenz parameters (classic chaotic regime) ──
// sigma (Prandtl number): controls coupling between x and y.
// rho (Rayleigh number): drives convection — above ~24.74 the system is chaotic.
// beta (geometric factor): relates to the aspect ratio of convection cells.
const float sigma = 10.0;
const float rho   = 28.0;
const float beta  = 8.0 / 3.0;

const vec3 start = vec3(0.1, 0.001, 0.0);  // Initial position — off-center seed for chaos.

// Forward Euler integration of the Lorenz system.
// dx/dt = sigma*(y-x), dy/dt = x*(rho-z)-y, dz/dt = x*y - beta*z
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        sigma * (cur.y - cur.x),
        cur.x * (rho - cur.z) - cur.y,
        cur.x * cur.y - beta * cur.z
    ) * dt;
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
    // Camera rotation offsets and last mouse position are stored in a dedicated
    // pixel (CAM_PIXEL, 0) in the self-feedback buffer and read back each frame.
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float offsetRx = camState.x;
    float offsetRy = camState.y;
    vec2 lastMouse = camState.zw;

    if (iFrame == 0) {
        offsetRx = 0.0;
        offsetRy = 0.0;
        lastMouse = vec2(-1.0);
    }

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

    // Detect active mouse movement for instant trail clear
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // ── Integrate particle, find closest line segment ──
    // Each frame, the particle is advanced STEPS times. For every step, the
    // projected segment is tested against this pixel's UV. The closest segment
    // determines brightness and its velocity determines color hue.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.

    vec3 last = texelFetch(iChannel0, ivec2(0, 0), 0).xyz;
    vec3 next;

    for (float i = 0.0; i < STEPS; i++) {
        next = integrate(last, 0.016 * SPEED);

        float segD = dfLine(projectMat(last - center3d, viewRot, viewScale), projectMat(next - center3d, viewRot, viewScale), uv);
        if (segD < d) {
            d = segD;
            // Recompute derivative at `next` to get instantaneous speed for color mapping.
            bestSpeed = length(vec3(
                sigma * (next.y - next.x),
                next.x * (rho - next.z) - next.y,
                next.x * next.y - beta * next.z
            ));
        }

        last = next;
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness — 30% chance each tick, sine-shaped.
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hashN(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color: fast regions map to MIN_HUE, slow to MAX_HUE.
    // Continuous hue shift over time adds temporal variety.
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) ──
    if (py == 0 && px == 0) {
        // Particle position
        fragColor = (iFrame == 0) ? vec4(start, 0.0) : vec4(next, 0.0);
    } else if (py == 0 && px == CAM_PIXEL) {
        // Camera state: rotation offsets + mouse position for next frame
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(offsetRx, offsetRy, storeMouse);
    } else {
        // Visual pixels — accumulate with fade; instant clear when rotating
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0.0);
    }
}
