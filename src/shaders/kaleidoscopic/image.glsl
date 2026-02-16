/**
 * Kaleidoscopic Study
 * @author guinetik
 * @date 2026-02-01
 *
 * Mandala-like symmetric patterns through polar coordinate folding.
 * Three kaleidoscope styles cycle over time: simple N-fold symmetry,
 * iterative fractal folding, and spiral twist warped with radius.
 *
 * Kaleidoscope Techniques:
 * - Polar coordinate folding
 * - Iterative mirror reflections
 * - Rotational symmetry control
 *
 * Visual Features:
 * - Mandala-like symmetric patterns
 * - Animated rotation and zoom
 * - Samples and reflects input texture
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// --- Kaleidoscope Geometry ---
#define SIMPLE_SEGMENTS 6.0           // N-fold symmetry count — 4 = square, 6 = hex, 8+ = near-circular
#define HEX_FOLD_ANGLE (PI / 3.0)    // 60-degree wedge for iterative hex folding — PI/4 gives octagonal
#define ITERATIVE_PASSES 8            // Fractal fold depth — 4: coarse, 8: detailed, 12+: diminishing returns
#define SPIRAL_TWIST_CENTER 3.0       // Base twist amount — higher values wind the spiral tighter
#define SPIRAL_TWIST_RANGE 2.0        // Twist oscillation amplitude — 0: static, 2.0: moderate breathing
#define SPIRAL_SEGMENTS_CENTER 6.0    // Base segment count for spiral mode — same tuning as SIMPLE_SEGMENTS
#define SPIRAL_SEGMENTS_RANGE 2.0     // Segment oscillation amplitude — 0: fixed, 2.0: varies from 4 to 8

// --- Animation ---
#define BREATHE_AMPLITUDE 0.3         // Zoom oscillation depth — 0: static, 0.3: gentle pulse, 0.8: dramatic
#define BREATHE_SPEED 0.8             // Zoom oscillation rate (rad/s) — higher = faster pulsing
#define CYCLE_SPEED 0.08              // Speed of cycling between kaleido modes — 0.08: ~38s full cycle
#define SIMPLE_ROTATION_SPEED 0.2     // Rotation speed for simple mode (rad/s) — keep < 1.0 to avoid nausea
#define ITER_ROT_BASE_SPEED 0.1       // Per-iteration rotation base speed — sets the slowest layer
#define ITER_ROT_INCREMENT 0.02       // Extra rotation per deeper iteration — creates speed gradient across layers
#define SPIRAL_ANGLE_SPEED 0.3        // Spiral rotation rate (rad/s) — adds swirl animation on top of twist
#define TRANSLATE_AMPLITUDE 0.05      // Per-iteration translation jitter — 0: rigid, 0.05: organic wobble
#define TRANSLATE_SPEED_X 0.5         // Horizontal translation oscillation rate
#define TRANSLATE_SPEED_Y 0.6         // Vertical translation oscillation rate — differs from X to avoid lissajous loops
#define ITER_SCALE_FACTOR 0.8         // Scale reduction per iteration — 0.5: rapid zoom, 0.8: gradual, 1.0: none

// --- Fallback Pattern ---
#define RING_FREQUENCY 20.0           // Concentric ring density — higher = thinner rings
#define RING_SPEED 2.0                // Ring animation speed — scrolls rings inward/outward
#define SPOKE_COUNT 12.0              // Number of radial spokes — more = finer angular detail
#define CENTER_GLOW_RADIUS 0.3        // Fallback center glow fade distance — larger = wider glow

// --- Post-Processing ---
#define EDGE_GLOW_WIDTH 0.02          // Fold-boundary glow thickness — smaller = sharper lines
#define EDGE_GLOW_BRIGHTNESS 0.3      // Fold-boundary glow intensity — 0: off, 0.3: subtle, 1.0: harsh
#define HIGHLIGHT_RADIUS 0.2          // Center highlight fade distance — larger = broader highlight
#define HIGHLIGHT_STRENGTH 0.5        // Center highlight intensity multiplier — 0: off, 0.5: gentle bloom
#define VIGNETTE_STRENGTH 0.6         // Edge darkening — 0: none, 0.6: cinematic, 1.5: tunnel vision

/**
 * Rotation matrix
 */
mat2 rot2D(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
}

/**
 * Simple kaleidoscope - fold into N segments
 *
 * TECHNIQUE: Polar coordinate folding
 * Converts to polar (angle, radius), uses mod() to map all angles into one
 * wedge of N segments, then mirrors within the wedge for bilateral symmetry.
 * The +PI offset shifts atan's discontinuity from 9 o'clock to 3 o'clock,
 * preventing visible seam artifacts in the final image.
 */
vec2 kaleido(vec2 p, float segments) {
    // Add PI to shift discontinuity from -PI/+PI (9 o'clock) to 0/TAU (3 o'clock)
    float angle = atan(p.y, p.x) + PI;
    float radius = length(p);

    // Fold angle into one segment
    float segmentAngle = TAU / segments;
    angle = mod(angle, segmentAngle);

    // Mirror within segment — creates bilateral symmetry inside each wedge
    if (angle > segmentAngle * 0.5) {
        angle = segmentAngle - angle;
    }

    return vec2(cos(angle), sin(angle)) * radius;
}

/**
 * Iterative kaleidoscope - multiple fold passes
 *
 * TECHNIQUE: Iterative fractal folding
 * Each iteration: rotate -> fold into 60-degree wedge -> abs-fold -> scale down.
 * Repeated folding creates fractal self-similarity at progressively smaller scales.
 * The abs(fract(p + 0.5) * 2.0 - 1.0) pattern creates a triangle-wave fold that
 * mirrors the domain without discontinuities, feeding each layer into the next.
 */
vec2 kaleidoIterative(vec2 p, float time, int iterations) {
    for (int i = 0; i < iterations; i++) {
        float fi = float(i);

        // Rotate each iteration — deeper layers spin faster
        float rotSpeed = ITER_ROT_BASE_SPEED + fi * ITER_ROT_INCREMENT;
        p *= rot2D(time * rotSpeed);

        // Fold into hex wedge
        float theta = atan(p.y, p.x) + PI;
        theta = (floor(theta / HEX_FOLD_ANGLE) + 0.5) * HEX_FOLD_ANGLE;

        vec2 dir = vec2(cos(theta), sin(theta));
        vec2 codir = vec2(-dir.y, dir.x);
        p = vec2(dot(dir, p), dot(codir, p));

        // Translate and fold — triangle-wave domain mirroring
        p += vec2(sin(time * TRANSLATE_SPEED_X + fi), cos(time * TRANSLATE_SPEED_Y + fi)) * TRANSLATE_AMPLITUDE;
        p = abs(fract(p + 0.5) * 2.0 - 1.0);

        // Scale down for next iteration
        p *= ITER_SCALE_FACTOR;
    }

    return p;
}

/**
 * Spiral kaleidoscope - adds spiral twist
 *
 * TECHNIQUE: Spiral twist via radius-dependent angle offset
 * Before folding, the polar angle is offset by (radius * twist), creating an
 * Archimedean spiral distortion. Points farther from center rotate more,
 * producing the characteristic spiral arm pattern. The time-animated angle
 * addition makes the spiral appear to rotate continuously.
 */
vec2 kaleidoSpiral(vec2 p, float segments, float twist, float time) {
    // Shift angle by PI to move discontinuity from 9 o'clock to 3 o'clock
    float angle = atan(p.y, p.x) + PI;
    float radius = length(p);

    // Add spiral twist based on radius
    angle += radius * twist + time * SPIRAL_ANGLE_SPEED;

    // Fold into segment (using TAU to keep in 0-TAU range)
    float segmentAngle = TAU / segments;
    angle = mod(angle, segmentAngle);

    // Mirror within segment
    if (angle > segmentAngle * 0.5) {
        angle = segmentAngle - angle;
    }

    return vec2(cos(angle), sin(angle)) * radius;
}

/**
 * Breathing zoom effect — sinusoidal scale oscillation
 */
float breathe(float time) {
    return 1.0 + sin(time * BREATHE_SPEED) * BREATHE_AMPLITUDE;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    // Centered aspect-corrected coords
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // === BREATHING ZOOM ===
    float zoom = breathe(time);
    p *= zoom;

    // === CHOOSE KALEIDOSCOPE STYLE ===
    float cycleTime = mod(time * CYCLE_SPEED, 3.0);
    vec2 kp;

    if (cycleTime < 1.0) {
        // Simple N-fold symmetry
        kp = kaleido(p, SIMPLE_SEGMENTS);
        kp *= rot2D(time * SIMPLE_ROTATION_SPEED);
    } else if (cycleTime < 2.0) {
        // Iterative fractal kaleidoscope
        kp = kaleidoIterative(p, time, ITERATIVE_PASSES);
    } else {
        // Spiral kaleidoscope with oscillating params
        float segments = SPIRAL_SEGMENTS_CENTER + sin(time * SPIRAL_ANGLE_SPEED) * SPIRAL_SEGMENTS_RANGE;
        float twist = SPIRAL_TWIST_CENTER + sin(time * SIMPLE_ROTATION_SPEED) * SPIRAL_TWIST_RANGE;
        kp = kaleidoSpiral(p, segments, twist, time);
    }

    // === MAP TO TEXTURE UV ===
    vec2 texUV = kp * 0.5 + 0.5;

    // Tile/wrap for infinite pattern
    texUV = fract(texUV);

    // === SAMPLE TEXTURE ===
    vec3 color = texture(iChannel0, texUV).rgb;

    // === FALLBACK PATTERN ===
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        // Colorful geometric pattern when no texture is bound
        float dist = length(kp);
        float angle = atan(kp.y, kp.x);

        // Concentric rings
        float rings = sin(dist * RING_FREQUENCY - time * RING_SPEED) * 0.5 + 0.5;

        // Radial spokes
        float spokes = sin(angle * SPOKE_COUNT + time) * 0.5 + 0.5;

        // Combine
        float pattern = rings * 0.5 + spokes * 0.5;

        // Rainbow color
        vec3 col = 0.5 + 0.5 * cos(TAU * (pattern + time * 0.1 + vec3(0.0, 0.33, 0.67)));

        // Center glow
        col += vec3(1.0, 0.8, 0.5) * smoothstep(CENTER_GLOW_RADIUS, 0.0, dist);

        color = col;
    }

    // === EDGE GLOW ===
    // Add glow at fold boundaries
    float edgeDist = min(abs(kp.x), abs(kp.y));
    float edge = smoothstep(EDGE_GLOW_WIDTH, 0.0, edgeDist);
    color += vec3(0.5, 0.7, 1.0) * edge * EDGE_GLOW_BRIGHTNESS;

    // === CENTER HIGHLIGHT ===
    float centerGlow = smoothstep(HIGHLIGHT_RADIUS, 0.0, length(p / zoom));
    color += color * centerGlow * HIGHLIGHT_STRENGTH;

    // === POST ===
    // Vignette
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
