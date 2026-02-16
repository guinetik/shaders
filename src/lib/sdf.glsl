/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point `p` to the closest
 * point on the segment from `a` to `b`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from `p` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
