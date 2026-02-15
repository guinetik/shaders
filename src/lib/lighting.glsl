/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
