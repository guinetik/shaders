/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
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
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
