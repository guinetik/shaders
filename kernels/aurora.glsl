/**
 * Aurora Borealis
 * @author guinetik
 * @date 2026-02-26
 *
 * Volumetric aurora based on Baranoski et al. "Simulating the Aurora Borealis".
 * Three independent emission lines sampled at different spatial scales to
 * approximate the per-channel gaussian blur from the paper.
 * Camera looks straight up — lying on your back watching the sky.
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
 */

// --- Ray marching ---
#define MARCH_STEPS       60        // volume samples per ray — more = smoother
#define SLAB_BASE         0.8       // altitude where aurora slab begins
#define STRIDE_POWER      1.4       // polynomial stride — slightly less aggressive for smoother sampling
#define STRIDE_SCALE      0.002     // base stride multiplier
#define DITHER_STRENGTH   0.006     // per-sample jitter to kill banding
#define FALLOFF_RATE      0.07      // exponential decay per sample
#define BRIGHTNESS        1.7       // final intensity multiplier

// --- Curtain noise ---
#define NOISE_ITERS       6         // triangle-wave octaves — one more for smoother detail
#define NOISE_SPEED       0.12      // animation rate — faster drift
#define NOISE_SHARPNESS   1.1       // pow exponent — slightly softer to reduce pixelation
#define NOISE_SCALE       25.0      // accumulator multiplier — slightly lower for smoother fibers
#define CURTAIN_SKEW      0.06      // domain rotation for anisotropic banding

// --- Three emission lines (Baranoski model) ---

// 557.7nm oxygen green — dominant, lower-mid altitude
#define GREEN_COLOR       vec3(0.05, 0.9, 0.2)
#define GREEN_ALT_CENTER  0.25
#define GREEN_ALT_WIDTH   0.35
#define GREEN_NOISE_SCALE 1.0       // baseline (0.7s transition)
#define GREEN_INTENSITY   0.75      // strongest line

// 630.0nm oxygen red — upper altitude, very diffuse
#define RED_COLOR         vec3(0.9, 0.1, 0.08)
#define RED_ALT_CENTER    0.65
#define RED_ALT_WIDTH     0.45      // wide spread (110s transition)
#define RED_NOISE_SCALE   0.6       // sample at larger scale = smoother
#define RED_INTENSITY     0.45      // weaker than green (quenching)

// 427.8nm nitrogen blue — lower border, razor sharp
#define BLUE_COLOR        vec3(0.12, 0.15, 0.95)
#define BLUE_ALT_CENTER   0.08
#define BLUE_ALT_WIDTH    0.12      // narrow band (<0.001s transition)
#define BLUE_NOISE_SCALE  1.6       // sharp detail
#define BLUE_INTENSITY    0.3       // weakest of the three

// --- Camera ---
#define CAM_FOCAL         1.2       // focal length
#define CAM_TILT          0.55      // base tilt above horizon (~30°) — keeps aurora centered
#define PAN_SPEED_X       0.04      // horizontal pan speed
#define PAN_SPEED_Y       0.025     // vertical wobble speed
#define PAN_AMP_X         0.35      // horizontal pan range
#define PAN_AMP_Y         0.12      // vertical wobble range — subtle so we stay in the band

// --- Sky ---
#define SKY_ZENITH        vec3(0.02, 0.02, 0.06)  // straight up — deep blue-black
#define SKY_LOW           vec3(0.06, 0.08, 0.15)   // toward edges — slightly lighter

// --- Stars ---
#define STAR_LAYERS       4
#define STAR_THRESHOLD    0.0005
#define STAR_POINT_SHARPNESS 800.0  // gaussian falloff for star core
#define STAR_HALO_SHARPNESS  80.0   // gaussian falloff for soft halo
#define STAR_HALO_INTENSITY  0.15   // halo brightness relative to core

// ---- 2D rotation ----

mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

// ---- triangle-wave noise ----

float tri(float x) {
    return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
}

vec2 tri2(vec2 p) {
    return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
}

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
    return clamp(1.0 / pow(max(acc * NOISE_SCALE, 0.001), NOISE_SHARPNESS), 0.0, 0.55);
}

// ---- hash ----

float hash21(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// ---- altitude envelope ----
// Asymmetric gaussian: sharp lower border, soft upper falloff.

float altitudeEnvelope(float h, float center, float width) {
    float d = h - center;
    // Sharp bottom, soft top (Vegard & Krogness measurements)
    float spread = (d < 0.0) ? width * 0.4 : width;
    return exp(-d * d / (spread * spread));
}

// ---- volumetric aurora ----

vec4 aurora(vec3 ro, vec3 rd) {
    vec4 col = vec4(0.0);
    vec4 avgCol = vec4(0.0);
    float maxI = float(MARCH_STEPS);

    for (int i = 0; i < MARCH_STEPS; i++) {
        float fi = float(i);
        float dither = DITHER_STRENGTH * hash21(gl_FragCoord.xy) * smoothstep(0.0, 15.0, fi);
        float t = ((SLAB_BASE + pow(fi, STRIDE_POWER) * STRIDE_SCALE) - ro.y) / (rd.y * 2.0 + 0.4);
        t -= dither;
        vec3 pos = ro + t * rd;

        float h = fi / maxI;

        // Three noise samples at different scales
        float densityR = curtainNoise(pos.zx * RED_NOISE_SCALE, NOISE_SPEED);
        float densityG = curtainNoise(pos.zx * GREEN_NOISE_SCALE, NOISE_SPEED);
        float densityB = curtainNoise(pos.zx * BLUE_NOISE_SCALE, NOISE_SPEED);

        // Altitude envelopes
        float envR = altitudeEnvelope(h, RED_ALT_CENTER, RED_ALT_WIDTH);
        float envG = altitudeEnvelope(h, GREEN_ALT_CENTER, GREEN_ALT_WIDTH);
        float envB = altitudeEnvelope(h, BLUE_ALT_CENTER, BLUE_ALT_WIDTH);

        // Three independent spectral lines
        vec3 emission = GREEN_COLOR * densityG * envG * GREEN_INTENSITY
                      + RED_COLOR   * densityR * envR * RED_INTENSITY
                      + BLUE_COLOR  * densityB * envB * BLUE_INTENSITY;

        float totalDensity = densityG * envG;

        vec4 sampleCol = vec4(emission, totalDensity);
        avgCol = mix(avgCol, sampleCol, 0.5);
        col += avgCol * exp2(-fi * FALLOFF_RATE - 2.5) * smoothstep(0.0, 5.0, fi);
    }

    // No horizon fade — we're looking up, everything is sky
    return col * BRIGHTNESS;
}

// ---- stars ----
// TECHNIQUE: Spherical-coordinate star grid
// Project rd onto 2D angular coords (azimuth, elevation) for stable
// sky-dome mapping. A 3D grid on unit direction vectors causes cell-boundary
// flicker during camera pan because floor(rd*scale) is unstable near edges.

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
        float rn3 = hash21(id + fi * 73.0);
        // Randomize position within cell
        vec2 starPos = (rn - 0.5) * 0.7;
        float d = length(gv - starPos);
        // Dual gaussian: tight core + soft halo
        float star = exp(-d * d * STAR_POINT_SHARPNESS)
                   + exp(-d * d * STAR_HALO_SHARPNESS) * STAR_HALO_INTENSITY;
        star *= step(rn3, STAR_THRESHOLD * 80.0 + fi * fi * 0.02);
        // Twinkle — slow and gentle
        star *= 0.8 + 0.2 * sin(iTime * 1.5 + rn.x * 100.0);
        // Warm/cool color variation
        c += star * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.0), rn.y) * 0.15 + 0.85);
    }
    return c * 0.7;
}

// ---- main ----

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (fragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);

    // Camera looking forward then tilted up ~30° — aurora fills the view
    vec3 rd = normalize(vec3(p.x, p.y, CAM_FOCAL));

    // Tilt up so we're looking across the aurora band, not straight at zenith
    rd.yz *= rot2(CAM_TILT);

    // Slow wandering pan
    rd.xz *= rot2(sin(iTime * PAN_SPEED_X) * PAN_AMP_X + cos(iTime * 0.031) * 0.1);
    rd.yz *= rot2(sin(iTime * PAN_SPEED_Y) * PAN_AMP_Y);

    vec3 ro = vec3(0.0, 0.0, -6.7);

    // Sky gradient
    float zenithDot = max(dot(rd, vec3(0.0, 1.0, 0.0)), 0.0);
    vec3 col = mix(SKY_LOW, SKY_ZENITH, zenithDot);

    // Stars
    col += stars(rd);

    // Aurora — skip only rays pointing below horizon
    if (rd.y > 0.0) {
        vec4 aur = smoothstep(0.0, 1.5, aurora(ro, rd));
        col = col * (1.0 - aur.a) + aur.rgb;
    }

    fragColor = vec4(col, 1.0);
}
