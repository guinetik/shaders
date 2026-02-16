/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
