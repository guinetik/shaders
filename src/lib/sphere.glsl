/**
 * Sphere Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic unit-sphere rendering:
 * 2D rotation and responsive UV-to-sphere projection.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle `a` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. Automatically zooms out on
 * portrait screens to prevent clipping.
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float uvScale = baseScale / min(1.0, resolution.x / resolution.y);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}
