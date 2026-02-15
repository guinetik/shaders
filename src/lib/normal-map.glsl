/**
 * Normal Mapping Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for finite-difference normal perturbation on
 * analytic sphere surfaces. Provides tangent/binormal basis computation.
 *
 * TECHNIQUE: Finite-difference normal mapping. The caller samples their
 * height function at offset positions along the tangent and binormal,
 * then uses perturbNormal() to reconstruct the perturbed surface normal.
 *
 * Usage pattern in shader:
 *   vec3 tangent, binormal;
 *   computeTangentBasis(surfaceNormal, tangent, binormal);
 *   float dh_dt = (centerHeight - heightFunc(pos + DX * tangent)) / DX;
 *   float dh_db = (centerHeight - heightFunc(pos + DX * binormal)) / DX;
 *   vec3 normal = perturbNormal(surfaceNormal, tangent, binormal, dh_dt, dh_db);
 */

/**
 * Compute a tangent/binormal basis from a sphere surface normal.
 *
 * Uses cross products with the Y-axis to derive orthogonal tangent
 * and binormal vectors lying in the sphere's tangent plane.
 *
 * @param normal    Unit sphere surface normal (= position for unit sphere)
 * @param tangent   Output tangent vector (set by this function)
 * @param binormal  Output binormal vector (set by this function)
 */
void computeTangentBasis(vec3 normal, out vec3 tangent, out vec3 binormal) {
    tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    binormal = cross(normal, tangent);
}

/**
 * Reconstruct a perturbed normal from finite-difference height gradients.
 *
 * @param normal     Original surface normal
 * @param tangent    Tangent vector from computeTangentBasis
 * @param binormal   Binormal vector from computeTangentBasis
 * @param dh_tangent Height gradient along tangent direction (scaled height delta / DX)
 * @param dh_binorm  Height gradient along binormal direction (scaled height delta / DX)
 * @return Perturbed and normalized surface normal
 */
vec3 perturbNormal(vec3 normal, vec3 tangent, vec3 binormal, float dh_tangent, float dh_binorm) {
    return normalize(normal + tangent * dh_tangent + binormal * dh_binorm);
}
