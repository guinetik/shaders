/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution `res`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
