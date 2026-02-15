/**
 * PCG-Style Hash Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using PCG-style polynomial hashing.
 * Avoids sin-based precision issues on some mobile GPUs.
 * Includes 1D, 3D, and 4D hash variants plus FBM with a
 * decorrelation matrix to eliminate axis-aligned artifacts.
 *
 * Noise: Preferred over sin-hash for mobile/WebGL targets.
 * The decorrelation matrix between FBM octaves prevents visible
 * grid lines in banded atmospheric patterns.
 */

// === CONSTANTS ===

/**
 * Decorrelation matrix for 3D FBM.
 * Rotates and scales domain between octaves to eliminate axis-aligned
 * artifacts. The non-orthogonal entries create a pseudo-random rotation
 * that prevents visible grid lines in banded patterns.
 */
const mat3 PCG_FBM_MATRIX = mat3(
    0.51162, -1.54702, 1.15972,
   -1.70666, -0.92510, -0.48114,
    0.90858, -0.86654, -1.55678
);

// === HASH FUNCTIONS ===

/**
 * 1D PCG-style hash — maps a float to pseudo-random [0, 1).
 */
float pcgHash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

/**
 * 3D PCG-style hash — maps vec3 to pseudo-random vec3 in [0, 1).
 */
vec3 pcgHash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

/**
 * 4D PCG-style hash — maps a float to pseudo-random vec4 in [0, 1).
 * Useful for seed-based parameter generation.
 */
vec4 pcgHash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

// === NOISE FUNCTIONS ===

/**
 * 1D value noise from PCG hash with Hermite interpolation.
 * @return Noise value in [-1, 1]
 */
float pcgNoise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(pcgHash1(i), pcgHash1(i + 1.0), u);
}

/**
 * 3D value noise from PCG hash with Hermite interpolation.
 * @return Noise vec3 in [-1, 1] per component
 */
vec3 pcgNoise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 0.0)),
                pcgHash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 0.0)),
                pcgHash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 1.0)),
                pcgHash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 1.0)),
                pcgHash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

// === FBM ===

/**
 * 1D Fractional Brownian Motion using PCG noise.
 *
 * 5 octaves, lacunarity 2.0, gain 0.5.
 * @param p  1D sample position
 * @return Normalized FBM value in approximately [-1, 1]
 */
float pcgFbm1(float p) {
    float f = pcgNoise1(p); p = 2.0 * p;
    f += 0.5 * pcgNoise1(p); p = 2.0 * p;
    f += 0.25 * pcgNoise1(p); p = 2.0 * p;
    f += 0.125 * pcgNoise1(p); p = 2.0 * p;
    f += 0.0625 * pcgNoise1(p);
    return f / 1.9375;
}

/**
 * 3D Fractional Brownian Motion using PCG noise with decorrelation matrix.
 *
 * 5 octaves with PCG_FBM_MATRIX applied between octaves to prevent
 * axis-aligned grid artifacts in banded patterns.
 *
 * @param p  3D sample position
 * @return Normalized FBM vec3 in approximately [-1, 1] per component
 */
vec3 pcgFbm3(vec3 p) {
    vec3 f = pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.5 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.25 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.125 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.0625 * pcgNoise3(p);
    return f / 1.9375;
}
