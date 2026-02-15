/**
 * Kaleidoscope Interactive
 * @author guinetik
 * @date 2026-01-28
 *
 * Polar coordinate folding with iterative symmetry. Auto-rotating
 * with mouse X/Y control for speed and zoom, producing vignette-focused
 * mandala-like patterns from a sampled texture.
 *
 * Kaleidoscope Techniques:
 * - Polar coordinate transformation
 * - Iterative angle folding for symmetry
 * - Modulo-based reflection patterns
 * - Radial coordinate mapping
 * - Mouse-controlled rotation and zoom
 *
 * Visual Features:
 * - 10 iterations of symmetry folding
 * - Auto-rotation with mouse speed control
 * - Mouse Y controls zoom level
 * - Vignette for center focus
 * - Interactive time-based animation
 *
 * Controls:
 * - Move mouse left/right to speed up/slow down rotation
 * - Move mouse up/down to zoom in/out
 */

#define PI 3.14159265359
#define KALEIDO_ITERATIONS 10  // number of fold passes — higher = more complex symmetry

vec2 safeUV(vec2 uv) {
    return clamp(uv, vec2(0.001), vec2(0.999));
}

vec3 renderKaleidoscope(vec2 p, float aspect, float time, vec2 mouse) {
    // Convert to polar - angle tells us direction, radius is distance
    float angle = atan(p.y, p.x);
    float radius = length(p);

    // Base rotation + mouse X controls additional speed
    float baseRotation = time * 0.3;
    float mouseModifier = (mouse.x - 0.5) * 2.0;
    angle += baseRotation * (1.0 + mouseModifier);

    // Fold the angle space repeatedly — each iteration compounds the symmetry.
    // abs() mirrors negative angles, mod() wraps into a 60-degree wedge,
    // then centering by -half shifts the seam. Repeated folding creates
    // exponentially complex symmetry patterns.
    for (int i = 0; i < KALEIDO_ITERATIONS; i++) {
        angle = abs(angle);  // Mirror across the fold line
        float foldAngle = PI / 3.0;  // 60 degrees — hexagonal symmetry base
        angle = mod(angle, foldAngle) - foldAngle * 0.5;
    }

    // Convert back to cartesian coordinates
    vec2 foldedP = vec2(cos(angle), sin(angle)) * radius;

    // Mouse Y controls zoom (0.5x to 2x)
    float zoom = 0.5 + mouse.y * 1.5;
    foldedP *= zoom;

    // Add a little breathing effect
    float pulse = sin(time * 0.5) * 0.1 + 1.0;
    foldedP *= pulse;

    // Map to UV space for texture sampling
    vec2 kaleidoUV = foldedP * 0.5 + 0.5;
    kaleidoUV.x /= aspect;
    kaleidoUV = kaleidoUV * 0.5 + 0.25;
    kaleidoUV = safeUV(kaleidoUV);

    // Sample the image
    vec3 color = texture(iChannel0, kaleidoUV).rgb;

    // Darken the edges to keep focus on the center
    float vignette = smoothstep(1.2, 0.4, radius);
    color *= vignette * 0.7 + 0.3;

    return color;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = (uv - 0.5) * 2.0;

    float aspect = iResolution.x / iResolution.y;
    p.x *= aspect;

    // Normalize mouse position to 0-1 range
    vec2 mouse = iMouse.xy / iResolution.xy;
    // If mouse hasn't been used yet, default to center
    if (iMouse.z < 0.0) {
        mouse = vec2(0.5);
    }

    vec3 color = renderKaleidoscope(p, aspect, iTime, mouse);

    fragColor = vec4(color, 1.0);
}
