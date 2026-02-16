/**
 * Perlin Gradient Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * True 3D gradient noise with quintic interpolation for C2 continuity.
 * Smoother than value noise (noise-value.glsl) — gradient dot products
 * produce directional variation that eliminates the blocky artifacts of
 * lattice-aligned value noise.
 *
 * Noise: Chosen over value noise when smooth, organic turbulence is needed
 * (plasma fields, liquid surfaces). Costlier per sample due to 8 gradient
 * dot products vs 8 scalar lookups, but the quality difference is visible
 * at low octave counts.
 */

// === GRADIENT HASH ===

/**
 * 3D gradient vector hash.
 * Maps a lattice point to a pseudo-random unit-ish vector in [-1, 1]^3.
 * Uses dot-product projection + sin for decorrelation across axes.
 *
 * @param p  Integer lattice coordinate
 * @return   Gradient vector in [-1, 1] per component
 */
vec3 perlinGrad3(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 213.6)),
        dot(p, vec3(327.1, 211.7, 113.6)),
        dot(p, vec3(269.5, 183.3, 351.1))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// === PERLIN NOISE ===

/**
 * 3D Perlin gradient noise with quintic interpolation.
 *
 * At each of the 8 cube corners, a pseudo-random gradient vector is
 * dot-producted with the offset from that corner. Trilinear interpolation
 * blends the 8 results using quintic smoothstep (6t^5 - 15t^4 + 10t^3)
 * for C2 continuity — no visible grid-line artifacts.
 *
 * @param p  3D sample position
 * @return   Noise value in approximately [-0.5, 0.5]
 */
float perlinNoise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    // Quintic interpolation: 6t^5 - 15t^4 + 10t^3
    // C2 continuous — second derivative is zero at lattice boundaries,
    // eliminating the subtle grid-aligned ridges that cubic produces.
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    return mix(
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                dot(perlinGrad3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                dot(perlinGrad3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),
            u.y),
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                dot(perlinGrad3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                dot(perlinGrad3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),
            u.y),
        u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D Perlin noise.
 *
 * Sums multiple octaves of perlinNoise3D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return           FBM value (centered near 0, range depends on octaves)
 */
float perlinFbm(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * perlinNoise3D(pos);
        total += scale;
        pos += vec3(0.31, 0.83, 0.47);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
