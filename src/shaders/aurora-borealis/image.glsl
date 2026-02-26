/**
 * Aurora Borealis
 * @author guinetik
 * @date 2026-02-26
 *
 * Volumetric aurora based on Baranoski et al. "Simulating the Aurora Borealis".
 * Three independent emission lines sampled at different spatial scales to
 * approximate the per-channel gaussian blur from the paper.
 *
 * TECHNIQUE: Three-line emission model (Baranoski et al.)
 * Real auroras have three dominant spectral lines:
 *   - 557.7nm green (atomic oxygen) — transition state 0.7s → moderate spread
 *   - 630.0nm red (atomic oxygen)   — transition state 110s → very diffuse
 *   - 427.8nm blue (ionized nitrogen) — transition state <0.001s → razor sharp
 * We sample curtain noise at different domain scales per line to fake
 * per-channel gaussian blur.
 *
 * TECHNIQUE: Triangle-wave noise
 * Triangle waves produce sharp, non-smooth fibrous patterns. Iterated with
 * rotation for anisotropic band structure resembling real curtains.
 *
 * TECHNIQUE: Polynomial ray stride
 * Sample spacing grows as pow(i, 1.4) — dense near base, sparse up high.
 *
 * Commons: noise-value (hashN2 for dithering), color (hsl2rgb for star tints)
 */

// --- Ray marching ---
#define MARCH_STEPS       50        // volume samples per ray
#define SLAB_BASE         0.8       // altitude where aurora slab begins
#define STRIDE_POWER      1.4       // polynomial stride — dense near base, sparse up high
#define STRIDE_SCALE      0.002     // base stride multiplier
#define DITHER_STRENGTH   0.006     // per-sample jitter to kill banding
#define FALLOFF_RATE      0.07      // exponential decay per sample
#define BRIGHTNESS        1.7       // final intensity multiplier

// --- Curtain noise ---
#define NOISE_ITERS       5         // triangle-wave octaves
#define NOISE_SPEED       0.12      // animation rate
#define NOISE_SHARPNESS   1.1       // pow exponent — lower = softer curtains
#define NOISE_DENSITY     25.0      // accumulator multiplier — higher = tighter fibers
#define CURTAIN_SKEW      0.06      // domain rotation for anisotropic banding

// --- Three emission lines (Baranoski model) ---
// Each line: color, altitude profile (center, width), noise scale, intensity.
// Noise scale fakes per-channel blur: red sampled at 0.6x (diffuse),
// green at 1.0x (moderate), blue at 1.6x (sharp).

// 557.7nm oxygen green — dominant, lower-mid altitude
#define GREEN_COLOR       vec3(0.05, 0.9, 0.2)
#define GREEN_ALT_CENTER  0.25      // peaks at 25% up the slab
#define GREEN_ALT_WIDTH   0.35      // moderate vertical extent
#define GREEN_NOISE_SCALE 1.0       // baseline (0.7s transition state)
#define GREEN_INTENSITY   0.75      // strongest line

// 630.0nm oxygen red — upper altitude, very diffuse
#define RED_COLOR         vec3(0.9, 0.1, 0.08)
#define RED_ALT_CENTER    0.65      // peaks at 65% up the slab
#define RED_ALT_WIDTH     0.45      // wide spread (110s transition — atoms drift far)
#define RED_NOISE_SCALE   0.6       // large scale = smoother/more diffuse
#define RED_INTENSITY     0.45      // weaker than green (quenching at lower altitudes)

// 427.8nm nitrogen blue — lower border, razor sharp
#define BLUE_COLOR        vec3(0.12, 0.15, 0.95)
#define BLUE_ALT_CENTER   0.08      // peaks at bottom 8%
#define BLUE_ALT_WIDTH    0.12      // very narrow band (<0.001s transition)
#define BLUE_NOISE_SCALE  1.6       // small scale = sharper detail
#define BLUE_INTENSITY    0.35       // weakest of the three

// --- Camera ---
#define CAM_FOCAL         1.2       // focal length
#define CAM_TILT          0.55      // base tilt above horizon (~30°) — keeps aurora centered
#define PAN_SPEED_X       0.04      // horizontal pan speed
#define PAN_SPEED_Y       0.025     // vertical wobble speed (different from X for organic motion)
#define PAN_AMP_X         0.35      // horizontal pan range
#define PAN_AMP_Y         0.12      // vertical wobble range

// --- Sky ---
#define SKY_ZENITH        vec3(0.02, 0.02, 0.06)
#define SKY_LOW           vec3(0.06, 0.08, 0.15)

// --- Stars ---
#define STAR_LAYERS       4         // multi-scale grid layers for depth
#define STAR_THRESHOLD    0.0005    // hash cutoff — lower = fewer stars
#define STAR_POINT_SHARPNESS 800.0  // gaussian falloff for star core
#define STAR_HALO_SHARPNESS  80.0   // gaussian falloff for soft halo
#define STAR_HALO_INTENSITY  0.15   // halo brightness relative to core

// ---- 2D rotation ----

mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

// ---- triangle-wave noise ----
// TECHNIQUE: Triangle waves produce sharp, angular patterns.
// Iterating with rotation creates anisotropic band structure
// that resembles real aurora curtains. Unlike smooth value/perlin noise,
// the non-differentiable peaks create the fibrous vertical trails.

float tri(float x) {
    return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
}

vec2 tri2(vec2 p) {
    return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
}

// Fixed rotation matrix (~17°) for noise iteration — avoids recomputing trig
mat2 noiseRot = mat2(0.9563, 0.2924, -0.2924, 0.9563);

float curtainNoise(vec2 p, float speed) {
    float z = 1.8;
    float z2 = 2.5;
    float acc = 0.0;
    p *= rot2(p.x * CURTAIN_SKEW);
    vec2 bp = p;
    for (int i = 0; i < NOISE_ITERS; i++) {
        vec2 dg = tri2(bp * 1.85) * 0.75;
        dg *= rot2(iTime * speed);
        p -= dg / z2;
        bp *= 1.3;
        z2 *= 0.45;
        z *= 0.42;
        p *= 1.21 + (acc - 1.0) * 0.02;
        acc += tri(p.x + tri(p.y)) * z;
        p *= -noiseRot;
    }
    return clamp(1.0 / pow(max(acc * NOISE_DENSITY, 0.001), NOISE_SHARPNESS), 0.0, 0.55);
}

// ---- altitude envelope ----
// TECHNIQUE: Asymmetric gaussian (Vegard & Krogness 1920)
// Aurora intensity has a sharp lower border (drops to 10% within km)
// and gradual upper falloff. We use a narrower spread below center.

float altitudeEnvelope(float h, float center, float width) {
    float d = h - center;
    float spread = (d < 0.0) ? width * 0.4 : width;
    return exp(-d * d / (spread * spread));
}

// ---- integer hash for stars ----
// Multiply-xor-shift avoids sin-hash precision issues at large coordinates.

// ---- volumetric aurora ----
// TECHNIQUE: Polynomial stride ray march
// Step size grows as pow(i, STRIDE_POWER). Dense sampling near the base
// (where curtain structures are sharp and bright), sparse up high
// (where faint trails don't need fine resolution).

vec4 aurora(vec3 ro, vec3 rd) {
    vec4 col = vec4(0.0);
    vec4 avgCol = vec4(0.0);
    float maxI = float(MARCH_STEPS);

    for (int i = 0; i < MARCH_STEPS; i++) {
        float fi = float(i);
        // Per-sample dither using hashN2 from noise-value common
        float dither = DITHER_STRENGTH * hashN2(gl_FragCoord.xy) * smoothstep(0.0, 15.0, fi);
        // Polynomial stride
        float t = ((SLAB_BASE + pow(fi, STRIDE_POWER) * STRIDE_SCALE) - ro.y) / (rd.y * 2.0 + 0.4);
        t -= dither;
        vec3 pos = ro + t * rd;

        // Normalized altitude within the slab (0 = base, 1 = top)
        float h = fi / maxI;

        // Single noise evaluation — altitude envelopes handle color separation.
        // Red uses the same density but its wide envelope makes it look diffuse.
        // Blue uses the same density but its narrow envelope keeps it razor-thin.
        // This cuts noise calls from 3 to 1 per step (50 vs 150 total).
        float density = curtainNoise(pos.zx, NOISE_SPEED);

        // Altitude envelopes — each line peaks at different height
        float envR = altitudeEnvelope(h, RED_ALT_CENTER, RED_ALT_WIDTH);
        float envG = altitudeEnvelope(h, GREEN_ALT_CENTER, GREEN_ALT_WIDTH);
        float envB = altitudeEnvelope(h, BLUE_ALT_CENTER, BLUE_ALT_WIDTH);

        // Three spectral lines sharing one noise sample, separated by altitude
        vec3 emission = GREEN_COLOR * envG * GREEN_INTENSITY
                      + RED_COLOR   * envR * RED_INTENSITY
                      + BLUE_COLOR  * envB * BLUE_INTENSITY;
        emission *= density;

        float totalDensity = density * envG;

        vec4 sampleCol = vec4(emission, totalDensity);
        avgCol = mix(avgCol, sampleCol, 0.5);
        col += avgCol * exp2(-fi * FALLOFF_RATE - 2.5) * smoothstep(0.0, 5.0, fi);
    }

    return col * BRIGHTNESS;
}

// ---- stars ----
// TECHNIQUE: Spherical-coordinate star grid
// Project rd onto 2D angular coords (azimuth, elevation) for stable
// sky-dome mapping. A 3D grid on unit direction vectors causes cell-boundary
// flicker during camera pan because floor(rd*scale) is unstable near edges.
// Dual gaussian (tight core + soft halo) for natural point-source look.

vec2 hash22(vec2 p) {
    vec2 h = vec2(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)));
    return fract(sin(h) * 43758.5453123);
}

vec3 stars(vec3 rd) {
    vec2 angles = vec2(atan(rd.x, rd.z), asin(clamp(rd.y, -1.0, 1.0)));
    vec3 c = vec3(0.0);
    for (int i = 0; i < STAR_LAYERS; i++) {
        float fi = float(i);
        float scale = 25.0 + fi * 10.0;
        vec2 grid = angles * scale;
        vec2 id = floor(grid);
        vec2 gv = fract(grid) - 0.5;
        // Per-layer seed offset to avoid overlapping patterns
        vec2 rn = hash22(id + fi * 100.0);
        float rn3 = hashN2(id + fi * 73.0);
        // Randomize position within cell
        vec2 starPos = (rn - 0.5) * 0.7;
        float d = length(gv - starPos);
        // Dual gaussian: tight core + soft halo
        float star = exp(-d * d * STAR_POINT_SHARPNESS)
                   + exp(-d * d * STAR_HALO_SHARPNESS) * STAR_HALO_INTENSITY;
        star *= step(rn3, STAR_THRESHOLD * 80.0 + fi * fi * 0.02);
        // Twinkle — slow and gentle
        star *= 0.8 + 0.2 * sin(iTime * 1.5 + rn.x * 100.0);
        // Color from hsl2rgb — hue 20° (warm) to 220° (cool) based on hash
        vec3 starCol = hsl2rgb(mix(20.0, 220.0, rn.y), 0.3, 0.85);
        c += star * starCol;
    }
    return c * 0.7;
}

// ---- main ----

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (fragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);

    // Camera looking forward, tilted up ~30° to look across the aurora band
    vec3 rd = normalize(vec3(p.x, p.y, CAM_FOCAL));
    rd.yz *= rot2(CAM_TILT);

    // Slow wandering pan — two sine waves at different speeds
    rd.xz *= rot2(sin(iTime * PAN_SPEED_X) * PAN_AMP_X + cos(iTime * 0.031) * 0.1);
    rd.yz *= rot2(sin(iTime * PAN_SPEED_Y) * PAN_AMP_Y);

    vec3 ro = vec3(0.0, 0.0, -6.7);

    // Sky gradient — darker at zenith
    float zenithDot = max(dot(rd, vec3(0.0, 1.0, 0.0)), 0.0);
    vec3 col = mix(SKY_LOW, SKY_ZENITH, zenithDot);

    // Stars
    col += stars(rd);

    // Aurora — skip rays below horizon
    if (rd.y > 0.0) {
        vec4 aur = smoothstep(0.0, 1.5, aurora(ro, rd));
        col = col * (1.0 - aur.a) + aur.rgb;
    }

    fragColor = vec4(col, 1.0);
}
