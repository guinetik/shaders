/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (posZ approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
