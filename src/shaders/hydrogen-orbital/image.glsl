/**
 * Hydrogen Orbital
 * @author guinetik
 * @date 2026-02-22
 *
 * Volumetric ray-marched hydrogen atom electron orbitals that auto-cycle
 * through quantum states as a slideshow. Computes |psi(n,l,m)|² probability
 * density directly from associated Laguerre and Legendre polynomials.
 *
 * TECHNIQUE: Quantum wave functions via polynomial recurrence
 * The radial part R_{n,l}(r) uses associated Laguerre polynomials L_n^alpha(x),
 * the angular part Y_l^m(theta) uses associated Legendre polynomials P_l^m(x).
 * Both are computed via stable recurrence relations (same as textbook).
 *
 * TECHNIQUE: Volumetric density accumulation with noise stippling
 * Rays march through a bounding sphere, sampling |psi|² at each step.
 * A 3D hash creates particle-like stippling — high density = solid core,
 * low density = sparse scattered dots. Ocean/cyan colormap applied to density.
 *
 * TECHNIQUE: Slideshow cross-fade between orbital presets
 * 8 presets cycle every ~6 seconds. During 1.5s transitions, BOTH orbitals
 * are evaluated and blended via smoothstep for seamless morphing.
 */

// === ORBITAL PRESETS ===
#define NUM_PRESETS 8
#define PRESET_DURATION 6.0     // Seconds per orbital before transition
#define FADE_DURATION 1.5       // Cross-fade overlap in seconds

// === RAY MARCHING ===
#define MAX_MARCH_STEPS 80      // Volume sample count — higher = smoother, slower
#define OPACITY_THRESHOLD 0.99  // Early exit when accumulated opacity exceeds this

// === WAVE FUNCTION ===
#define BOHR_RADIUS 1.0         // Natural units — all distances in units of a0
#define R_MAX_SCALE 4.0         // Bounding sphere = n² * this + R_MAX_PAD
#define R_MAX_PAD 10.0          // Additive padding on bounding sphere radius
#define DENSITY_SCALE 800.0     // Multiplier on |psi|² for visible accumulation

// === NOISE STIPPLING ===
#define STIPPLE_SCALE 12.0      // Spatial frequency of noise — higher = finer grain
#define STIPPLE_GAIN 1.4        // Noise threshold = density × this — higher = more particles visible

// === COLORMAP ===
#define COLORMAP_FLOOR 0.15       // Skip darkest portion of inferno
#define COLORMAP_POWER 0.6        // Gamma on density-to-color — < 1.0 brightens midtones
#define COLORMAP_DENSITY_GAIN 5.0 // Amplifies density before colormap lookup — higher = more saturated

// === CAMERA ===
#define CAM_DIST 18.0           // Orbit distance from target — further to see full orbital
#define CAM_HEIGHT 2.0          // Camera height above target plane
#define CAM_TARGET vec3(0.0)    // Look-at target — orbital center
#define CAM_FOV 1.5             // Field of view factor

// === BACKGROUND ===
#define BG_TOP vec3(0.0, 0.003, 0.02)     // Dark blue-black gradient top
#define BG_BOTTOM vec3(0.002, 0.0, 0.01)  // Slightly warmer gradient bottom

// -------------------------------------------------------
// Orbital preset lookup
// -------------------------------------------------------

/**
 * Return (n, l, m) quantum numbers for the given preset index.
 * Covers s, p, d, f orbitals up to n=4.
 */
ivec3 getPreset(int idx) {
    if (idx == 0) return ivec3(1, 0, 0);  // 1s
    if (idx == 1) return ivec3(2, 0, 0);  // 2s
    if (idx == 2) return ivec3(2, 1, 0);  // 2p
    if (idx == 3) return ivec3(3, 0, 0);  // 3s
    if (idx == 4) return ivec3(3, 1, 0);  // 3p
    if (idx == 5) return ivec3(3, 2, 0);  // 3d
    if (idx == 6) return ivec3(4, 2, 0);  // 4d
    return ivec3(4, 3, 0);                // 4f
}

// -------------------------------------------------------
// Mathematical functions for quantum wave functions
// -------------------------------------------------------

/**
 * Compute n! iteratively. Returns 1.0 for n <= 1.
 */
float factorial(int n) {
    float result = 1.0;
    for (int i = 2; i <= n; i++) {
        result *= float(i);
    }
    return result;
}

/**
 * Associated Laguerre polynomial L_n^alpha(x) via three-term recurrence.
 * Used in the radial part of the hydrogen wave function.
 *
 * Recurrence: L_k = ((2k-1+alpha-x) * L_{k-1} - (k-1+alpha) * L_{k-2}) / k
 */
float associatedLaguerre(int n, int alpha, float x) {
    if (n == 0) return 1.0;
    float a = float(alpha);
    if (n == 1) return 1.0 + a - x;
    float prev2 = 1.0;
    float prev1 = 1.0 + a - x;
    for (int k = 2; k <= n; k++) {
        float fk = float(k);
        float curr = ((2.0 * fk - 1.0 + a - x) * prev1 - (fk - 1.0 + a) * prev2) / fk;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

/**
 * Associated Legendre polynomial P_l^m(x) via recurrence.
 * Used in the angular part of the hydrogen wave function.
 *
 * Starts from P_m^m, builds up to P_l^m via:
 *   P_{ll}^m = (x * (2*ll-1) * P_{ll-1}^m - (ll+m-1) * P_{ll-2}^m) / (ll-m)
 */
float associatedLegendre(int l, int m, float x) {
    int absM = abs(m);
    // Compute P_m^m (seed value)
    float pmm = 1.0;
    if (absM > 0) {
        float somx2 = sqrt(max((1.0 - x) * (1.0 + x), 0.0));
        float fact = 1.0;
        for (int j = 1; j <= absM; j++) {
            pmm *= -fact * somx2;
            fact += 2.0;
        }
    }
    if (l == absM) return pmm;
    // Compute P_{m+1}^m
    float pmm1 = x * (2.0 * float(absM) + 1.0) * pmm;
    if (l == absM + 1) return pmm1;
    // Recurrence up to P_l^m
    float result = 0.0;
    for (int ll = absM + 2; ll <= l; ll++) {
        float fll = float(ll);
        float fabsM = float(absM);
        result = (x * (2.0 * fll - 1.0) * pmm1 - (fll + fabsM - 1.0) * pmm) / (fll - fabsM);
        pmm = pmm1;
        pmm1 = result;
    }
    return result;
}

/**
 * Radial wave function R_{n,l}(r) for hydrogen atom.
 *
 * R_{n,l}(r) = norm * exp(-rho/2) * rho^l * L_{n-l-1}^{2l+1}(rho)
 * where rho = 2r / (n * a0)
 *
 * Physics: Describes how the electron probability varies with distance
 * from the nucleus. Normalization ensures integral of |R|^2 r^2 dr = 1.
 */
float radialWaveFunction(int n, int l, float r) {
    float fn = float(n);
    float fl = float(l);
    float rho = 2.0 * r / (fn * BOHR_RADIUS);
    // Normalization prefactor
    float prefactor = pow(max(2.0 / (fn * BOHR_RADIUS), 0.0), 3.0);
    float num = factorial(n - l - 1);
    float den = 2.0 * fn * factorial(n + l);
    float norm = sqrt(max(prefactor * num / den, 0.0));
    float expPart = exp(-rho * 0.5);
    float rhoPart = pow(max(rho, 0.0), fl);
    float lagPart = associatedLaguerre(n - l - 1, 2 * l + 1, rho);
    return norm * expPart * rhoPart * lagPart;
}

/**
 * Angular wave function Y_l^m(theta) (real spherical harmonic, m >= 0 slice).
 *
 * Y_l^m = norm * P_l^|m|(cos(theta))
 *
 * Physics: Describes the angular distribution of the electron cloud.
 * The lobed shapes of p, d, f orbitals come from the Legendre polynomials.
 */
float angularWaveFunction(int l, int m, float theta) {
    int absM = abs(m);
    float norm = sqrt(
        (2.0 * float(l) + 1.0) / (4.0 * 3.14159265) *
        factorial(l - absM) / factorial(l + absM)
    );
    return norm * associatedLegendre(l, absM, cos(theta));
}

/**
 * Probability density |psi(n,l,m)|² = |R_{n,l}(r)|² * |Y_l^m(theta)|²
 *
 * This is the quantity we volume-render: higher values mean the electron
 * is more likely to be found at that point in space.
 */
float probabilityDensity(int n, int l, int m, float r, float theta) {
    float R = radialWaveFunction(n, l, r);
    float Y = angularWaveFunction(l, m, theta);
    return R * R * Y * Y;
}

// -------------------------------------------------------
// Ocean/cyan colormap
// -------------------------------------------------------

/**
 * Ocean cyan colormap — deep navy through cyan to bright white.
 * Matches the "ocean" palette from the gcanvas hydrogen orbital demo.
 * Maps [0,1] through 6 control points.
 */
vec3 oceanCyan(float t) {
    t = clamp(t, 0.0, 1.0);
    const vec3 c0 = vec3(0.0, 0.0, 0.078);
    const vec3 c1 = vec3(0.0, 0.078, 0.314);
    const vec3 c2 = vec3(0.0, 0.314, 0.627);
    const vec3 c3 = vec3(0.0, 0.706, 0.863);
    const vec3 c4 = vec3(0.392, 0.941, 1.0);
    const vec3 c5 = vec3(1.0, 1.0, 1.0);
    float x = t * 5.0;
    if (x < 1.0) return mix(c0, c1, x);
    if (x < 2.0) return mix(c1, c2, x - 1.0);
    if (x < 3.0) return mix(c2, c3, x - 2.0);
    if (x < 4.0) return mix(c3, c4, x - 3.0);
    return mix(c4, c5, x - 4.0);
}

// -------------------------------------------------------
// Utility functions
// -------------------------------------------------------

/**
 * 3D hash for noise stippling — maps position to [0,1] pseudo-random value.
 * Creates the particle-cloud texture on the orbital density.
 */
float hash31(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}

/**
 * Ray-sphere intersection returning (tNear, tFar).
 * Returns vec2(-1.0) on miss. Sphere centered at origin.
 */
vec2 intersectSphere(vec3 ro, vec3 rd, float radius) {
    float b = dot(ro, rd);
    float c = dot(ro, ro) - radius * radius;
    float disc = b * b - c;
    if (disc < 0.0) return vec2(-1.0);
    float sq = sqrt(disc);
    return vec2(-b - sq, -b + sq);
}

// -------------------------------------------------------
// Main entry point
// -------------------------------------------------------

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // --- Camera ---
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    // --- Slideshow timing ---
    float totalT = iTime;
    float cycleT = mod(totalT, PRESET_DURATION);
    int presetIdx = int(mod(totalT / PRESET_DURATION, float(NUM_PRESETS)));
    int nextIdx = int(mod(float(presetIdx + 1), float(NUM_PRESETS)));

    ivec3 qCurrent = getPreset(presetIdx);
    ivec3 qNext = getPreset(nextIdx);

    // Cross-fade factor: 0 during hold, ramps 0->1 during last FADE_DURATION seconds
    float fadeT = smoothstep(PRESET_DURATION - FADE_DURATION, PRESET_DURATION, cycleT);

    // Bounding sphere radius — sized to larger orbital
    int maxN = max(qCurrent.x, qNext.x);
    float boundR = float(maxN * maxN) * R_MAX_SCALE + R_MAX_PAD;

    // --- Ray-sphere intersection ---
    vec2 tHit = intersectSphere(ro, rd, boundR);
    if (tHit.y < 0.0) {
        // Miss — sphere entirely behind camera
        vec2 uv = fragCoord / iResolution.xy;
        vec3 bg = mix(BG_BOTTOM, BG_TOP, uv.y);
        fragColor = vec4(bg, 1.0);
        return;
    }

    float tNear = max(tHit.x, 0.0);
    float tFar = tHit.y;
    float stepLen = (tFar - tNear) / float(MAX_MARCH_STEPS);

    // --- Volume march ---
    vec3 accum = vec3(0.0);
    float accumA = 0.0;

    for (int i = 0; i < MAX_MARCH_STEPS; i++) {
        if (accumA > OPACITY_THRESHOLD) break;

        float t = tNear + (float(i) + 0.5) * stepLen;
        vec3 pos = ro + rd * t;

        // Spherical coordinates
        float r = length(pos);
        float theta = acos(clamp(pos.y / max(r, 0.0001), -1.0, 1.0));

        // Sample density from current orbital
        float density = probabilityDensity(qCurrent.x, qCurrent.y, qCurrent.z, r, theta);

        // Cross-fade: blend with next orbital during transition
        if (fadeT > 0.0) {
            float densityNext = probabilityDensity(qNext.x, qNext.y, qNext.z, r, theta);
            density = mix(density, densityNext, fadeT);
        }

        density *= DENSITY_SCALE * stepLen;

        // Noise stippling — particle-cloud texture
        float noise = hash31(pos * STIPPLE_SCALE);
        float stipple = step(noise, density * STIPPLE_GAIN);

        float d = density * stipple;

        // Map density to inferno colormap
        float colorT = COLORMAP_FLOOR + pow(clamp(d * COLORMAP_DENSITY_GAIN, 0.0, 1.0), COLORMAP_POWER) * (1.0 - COLORMAP_FLOOR);
        vec3 col = oceanCyan(colorT);

        // Additive accumulation (emissive volume)
        accum += col * d * (1.0 - accumA);
        accumA += d * (1.0 - accumA);
    }

    // Background gradient
    vec2 uv = fragCoord / iResolution.xy;
    vec3 bg = mix(BG_BOTTOM, BG_TOP, uv.y);

    vec3 col = bg * (1.0 - accumA) + accum;

    // Gamma correction
    col = pow(max(col, vec3(0.0)), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
