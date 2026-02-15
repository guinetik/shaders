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
 * Polar fold math:
 *   1. Convert to polar (angle, radius)
 *   2. mod(angle, TAU/N) maps all angles into one wedge of N segments
 *   3. Mirror within the wedge (if angle > half-wedge, reflect it)
 *   4. Convert back to Cartesian — produces N-fold mirror symmetry
 * The +PI offset shifts atan's discontinuity from 9 o'clock to 3 o'clock.
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
 * Each iteration: rotate -> fold into 60-degree wedge -> abs-fold -> scale down.
 * Repeated folding creates fractal self-similarity at progressively smaller scales.
 */
vec2 kaleidoIterative(vec2 p, float time, int iterations) {
    float scale = PI / 3.0;  // 60 degree segments (hexagonal symmetry)

    for (int i = 0; i < iterations; i++) {
        float fi = float(i);

        // Rotate each iteration
        float rotSpeed = 0.1 + fi * 0.02;
        p *= rot2D(time * rotSpeed);

        // Fold into segment
        float theta = atan(p.y, p.x) + PI;
        theta = (floor(theta / scale) + 0.5) * scale;

        vec2 dir = vec2(cos(theta), sin(theta));
        vec2 codir = vec2(-dir.y, dir.x);
        p = vec2(dot(dir, p), dot(codir, p));

        // Translate and fold
        p += vec2(sin(time * 0.5 + fi), cos(time * 0.6 + fi)) * 0.05;
        p = abs(fract(p + 0.5) * 2.0 - 1.0);

        // Scale down
        p *= 0.8;
    }

    return p;
}

/**
 * Spiral kaleidoscope - adds spiral twist
 * Fixed: shift angle to avoid atan discontinuity at 9 o'clock
 */
vec2 kaleidoSpiral(vec2 p, float segments, float twist, float time) {
    // Shift angle by PI to move discontinuity from 9 o'clock to 3 o'clock
    // Then add PI back so the visual result is the same
    float angle = atan(p.y, p.x) + PI;
    float radius = length(p);

    // Add spiral twist based on radius
    angle += radius * twist + time * 0.3;

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
 * Breathing zoom effect
 */
float breathe(float time) {
    return 1.0 + sin(time * 0.8) * 0.3;
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
    float cycleTime = mod(time * 0.08, 3.0);
    vec2 kp;

    if (cycleTime < 1.0) {
        // Simple 6-fold symmetry
        kp = kaleido(p, 6.0);
        kp *= rot2D(time * 0.2);
    } else if (cycleTime < 2.0) {
        // Iterative fractal kaleidoscope
        kp = kaleidoIterative(p, time, 8);
    } else {
        // Spiral kaleidoscope
        float segments = 6.0 + sin(time * 0.3) * 2.0;
        float twist = 3.0 + sin(time * 0.2) * 2.0;
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
        // Colorful geometric pattern
        float dist = length(kp);
        float angle = atan(kp.y, kp.x);

        // Concentric rings
        float rings = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;

        // Radial spokes
        float spokes = sin(angle * 12.0 + time) * 0.5 + 0.5;

        // Combine
        float pattern = rings * 0.5 + spokes * 0.5;

        // Rainbow color
        vec3 col = 0.5 + 0.5 * cos(TAU * (pattern + time * 0.1 + vec3(0.0, 0.33, 0.67)));

        // Center glow
        col += vec3(1.0, 0.8, 0.5) * smoothstep(0.3, 0.0, dist);

        color = col;
    }

    // === EDGE GLOW ===
    // Add glow at fold boundaries
    float edgeDist = min(abs(kp.x), abs(kp.y));
    float edge = smoothstep(0.02, 0.0, edgeDist);
    color += vec3(0.5, 0.7, 1.0) * edge * 0.3;

    // === CENTER HIGHLIGHT ===
    float centerGlow = smoothstep(0.2, 0.0, length(p / zoom));
    color += color * centerGlow * 0.5;

    // === POST ===
    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.6;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
