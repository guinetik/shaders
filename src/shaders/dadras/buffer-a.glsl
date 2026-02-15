/**
 * Attractor Study #01: Dadras — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-10
 *
 * Simulates the Dadras strange attractor (2010, Sara Dadras & Hamid Reza Momeni),
 * a three-scroll chaotic system. A single particle is integrated via forward Euler,
 * projected to 2D, and rendered as distance-field line segments with feedback
 * accumulation for persistent trails. Velocity-mapped HSL coloring with random
 * blink pulses provides visual variety.
 *
 * Dadras attractor equations:
 *   dx/dt = y - a*x + b*y*z
 *   dy/dt = c*y - x*z + z
 *   dz/dt = d*x*y - e*z
 * Parameters: a=3, b=2.7, c=1.7, d=2, e=9
 *
 * Reference: Dadras, S. & Momeni, H.R. (2010). "A novel three-dimensional
 * autonomous chaotic system generating two, three and four-scroll attractors."
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixel (0, 0):          Particle position (xyz). Initialized to `start` on frame 0.
// Pixel (CAM_PIXEL, 0):  Camera state — xy = rotation offsets, zw = last mouse position.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define STEPS 500.0        // Euler integration steps per frame — more = longer trail segment
                           // per frame. Below 100: short/sparse trail. Above 800: GPU-heavy.
#define VIEW_SCALE 0.05    // 3D-to-screen scale factor — smaller zooms out, larger zooms in.
#define SPEED 0.85         // Time-step multiplier for integration — higher = faster traversal.
                           // Below 0.3: sluggish. Above 1.5: may overshoot and diverge.
#define INTENSITY 0.35     // Base brightness of each line segment — higher = brighter trails.
                           // Below 0.1: barely visible. Above 0.6: over-saturated accumulation.
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting/smearing.
#define FOCUS 1.5          // Distance-field softness in pixels — smaller = sharper/thinner lines.
                           // Below 0.5: aliased. Above 3.0: wide, blurry glow.

// ── 3D view rotation defaults (radians) ──
// Identity shows xy plane — matches the thumbnail
#define DEFAULT_ROT_X 0.0          // Initial pitch rotation — 0 = front-on view of xy plane.
#define DEFAULT_ROT_Y 0.0          // Initial yaw rotation — 0 = no horizontal rotation.
#define MOUSE_SENSITIVITY 3.0      // Drag-to-rotate speed — higher = faster orbit on drag.

// Camera state stored at pixel (1, 0)
#define CAM_PIXEL 1

// ── Color settings ──
#define MIN_HUE 60.0       // Hue for fastest velocity (yellow-green region).
#define MAX_HUE 240.0      // Hue for slowest velocity (blue region).
#define MAX_SPEED 30.0     // Velocity clamp for hue mapping — speeds above this all map to MIN_HUE.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation over time.
#define SATURATION 0.85    // Base color saturation — 0.0 = grayscale, 1.0 = fully vivid.
#define LIGHTNESS 0.55     // Base HSL lightness — 0.5 = pure color, higher = pastel.

// ── Blink settings — random brightness pulses for visual interest ──
#define BLINK_FREQ 8.0         // Pulse evaluation rate (Hz). Higher = more frequent blink checks.
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak — 1.0 = no change.
#define BLINK_SAT_BOOST 1.3    // Saturation multiplier during blink — pushes color more vivid.
#define BLINK_LIT_BOOST 1.4    // Lightness multiplier during blink — makes highlight whiter.

// ── Dadras attractor parameters ──
// These define the chaotic regime producing three-scroll behavior.
float pa = 3.0;    // Dadras 'a' — linear damping on x. Higher = stronger contraction.
float pb = 2.7;    // Dadras 'b' — coupling strength of y*z into dx/dt.
float pc = 1.7;    // Dadras 'c' — linear gain on y. Drives the instability.
float pd = 2.0;    // Dadras 'd' — coupling of x*y into dz/dt.
float pe = 9.0;    // Dadras 'e' — linear damping on z. Higher = faster z-decay.

vec3 start = vec3(1.0, 1.0, 1.0);  // Initial particle position on frame 0.

// Forward Euler integration of the Dadras system.
// dx/dt = y - a*x + b*y*z
// dy/dt = c*y - x*z + z
// dz/dt = d*x*y - e*z
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        cur.y - pa * cur.x + pb * cur.y * cur.z,
        pc * cur.y - cur.x * cur.z + cur.z,
        pd * cur.x * cur.y - pe * cur.z
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

// Project a 3D attractor point to 2D screen space via camera rotation + scale.
vec2 project(vec3 p, mat3 viewRot) {
    return (viewRot * p).xy * VIEW_SCALE;
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point `p` to the line segment (a, b).
// Used to evaluate per-pixel intensity of each trail segment.
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
        next = integrate(last, 0.005 * SPEED);

        float segD = dfLine(project(last, viewRot), project(next, viewRot), uv);
        if (segD < d) {
            d = segD;
            // Recompute derivative at `next` to get instantaneous speed for color mapping.
            bestSpeed = length(vec3(
                next.y - pa * next.x + pb * next.y * next.z,
                pc * next.y - next.x * next.z + next.z,
                pd * next.x * next.y - pe * next.z
            ));
        }

        last = next;
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color with hue shift + blink boost
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    if (py == 0 && px == 0) {
        // Pixel (0,0): Particle position — seed on frame 0, else store latest state.
        fragColor = (iFrame == 0) ? vec4(start, 0) : vec4(next, 0);
    } else if (py == 0 && px == CAM_PIXEL) {
        // Pixel (1,0): Camera state — rotation offsets + mouse for drag continuity.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(offsetRx, offsetRy, storeMouse);
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating to avoid smeared trails.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0);
    }
}
