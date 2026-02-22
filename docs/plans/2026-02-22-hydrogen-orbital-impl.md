# Hydrogen Orbital Shader — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a volumetric ray-marched hydrogen orbital shader with slideshow cycling through 8 presets and orbit camera interaction.

**Architecture:** Single image pass with buffer-a for camera state. Quantum wave functions (Laguerre/Legendre polynomials) computed in GLSL. Inferno colormap with noise stippling for particle-cloud aesthetic. Slideshow cross-fades between orbital presets.

**Tech Stack:** GLSL ES 3.00, Shadertoy conventions, camera + color commons

**Design doc:** `docs/plans/2026-02-22-hydrogen-orbital-design.md`

**Reference implementation:** `D:\Developer\gcanvas\src\math\hydrogen.js` (wave function math to port)

---

### Task 1: Scaffold shader folder

**Files:**
- Run: `npm run new hydrogen-orbital`
- Modify: `src/shaders/hydrogen-orbital/meta.json`

**Step 1: Run scaffold script**

Run: `npm run new hydrogen-orbital`
Expected: Creates `src/shaders/hydrogen-orbital/` with `image.glsl` and `meta.json`

**Step 2: Update meta.json**

Replace contents of `src/shaders/hydrogen-orbital/meta.json` with:

```json
{
  "title": "Hydrogen Orbital",
  "description": "Volumetric ray-marched hydrogen atom electron orbitals cycling through quantum states. Computes |ψ(n,l,m)|² probability density from associated Laguerre and Legendre polynomials directly in GLSL.",
  "date": "2026-02-22",
  "tags": ["volumetric", "raymarching", "3d", "physics", "quantum"],
  "commons": ["camera", "color"],
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  },
  "links": {}
}
```

**Step 3: Commit**

```bash
git add src/shaders/hydrogen-orbital/
git commit -m "feat(hydrogen-orbital): scaffold folder with meta.json"
```

---

### Task 2: Create buffer-a.glsl (orbit camera state)

**Files:**
- Create: `src/shaders/hydrogen-orbital/buffer-a.glsl`

This is a thin wrapper around the camera common, identical pattern to `src/shaders/caustics-crystal/buffer-a.glsl`.

**Step 1: Write buffer-a.glsl**

```glsl
/**
 * Hydrogen Orbital — Buffer A: Camera state
 * @author guinetik
 * @date 2026-02-22
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Slightly elevated default view to look at the orbital from a natural angle.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
#define PITCH_MIN -0.6    // Max downward tilt — view orbital from above
#define PITCH_MAX  0.6    // Max upward tilt — view orbital from below

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
```

**Step 2: Commit**

```bash
git add src/shaders/hydrogen-orbital/buffer-a.glsl
git commit -m "feat(hydrogen-orbital): add orbit camera buffer-a"
```

---

### Task 3: Write quantum wave function math in image.glsl

This is the core physics. Port the wave functions from `D:\Developer\gcanvas\src\math\hydrogen.js` to GLSL ES 3.00.

**Files:**
- Modify: `src/shaders/hydrogen-orbital/image.glsl`

**Step 1: Write the file header, constants, and all math functions**

Replace the entire contents of `image.glsl`. The file should contain:

1. **File docblock** — title, author, date, description of volumetric orbital rendering, TECHNIQUE callouts for:
   - Quantum wave functions via polynomial recurrence
   - Volumetric density accumulation with noise stippling
   - Slideshow cross-fade between orbital presets

2. **Constants section** organized by purpose:

```glsl
// === ORBITAL PRESETS ===
// Stored as ivec3(n, l, m) — 8 presets cycling 1s through 4f
#define NUM_PRESETS 8
#define PRESET_DURATION 6.0     // Seconds per orbital before transition
#define FADE_DURATION 1.5       // Cross-fade overlap in seconds

// === RAY MARCHING ===
#define MAX_MARCH_STEPS 80      // Volume sample count — higher = smoother, slower
#define STEP_SIZE 0.08          // Base step size through volume — smaller = finer detail
#define OPACITY_THRESHOLD 0.99  // Early exit when accumulated opacity exceeds this

// === WAVE FUNCTION ===
#define BOHR_RADIUS 1.0         // Natural units — all distances in units of a₀
#define R_MAX_SCALE 4.0         // Bounding sphere = n² × this + R_MAX_PAD
#define R_MAX_PAD 10.0          // Additive padding on bounding sphere radius
#define DENSITY_SCALE 800.0     // Multiplier on |ψ|² for visible accumulation
                                // Higher = brighter/denser cloud. Tune per visual.

// === NOISE STIPPLING ===
#define STIPPLE_SCALE 12.0      // Spatial frequency of noise — higher = finer grain
#define STIPPLE_THRESHOLD 0.4   // Density threshold for particle visibility
                                // Lower = more particles visible, higher = sparser

// === COLORMAP ===
#define COLORMAP_FLOOR 0.15     // Skip darkest portion of inferno — avoids invisible particles
#define COLORMAP_POWER 0.6      // Gamma on density-to-color mapping — < 1.0 brightens midtones

// === CAMERA ===
#define CAM_DIST 6.0            // Orbit distance from target — further = smaller orbital
#define CAM_HEIGHT 1.0          // Camera height above target plane
#define CAM_TARGET vec3(0.0)    // Look-at target — orbital center
#define CAM_FOV 1.5             // Field of view factor — higher = wider angle

// === BACKGROUND ===
#define BG_TOP vec3(0.0, 0.003, 0.02)     // Dark blue-black gradient top
#define BG_BOTTOM vec3(0.002, 0.0, 0.01)  // Slightly warmer gradient bottom
```

3. **Orbital preset function:**

```glsl
// TECHNIQUE: Slideshow presets stored as integer quantum numbers
// Each preset defines (n, l, m) for one hydrogen orbital.
// Transitions blend density from outgoing/incoming orbitals.
ivec3 getPreset(int idx) {
    // Ordered for visual storytelling: simple → complex
    if (idx == 0) return ivec3(1, 0, 0);  // 1s  — spherical
    if (idx == 1) return ivec3(2, 0, 0);  // 2s  — spherical + node
    if (idx == 2) return ivec3(2, 1, 0);  // 2p  — dumbbell
    if (idx == 3) return ivec3(3, 0, 0);  // 3s  — spherical + 2 nodes
    if (idx == 4) return ivec3(3, 1, 0);  // 3p  — dumbbell + node
    if (idx == 5) return ivec3(3, 2, 0);  // 3d  — cloverleaf
    if (idx == 6) return ivec3(4, 2, 0);  // 4d  — cloverleaf + node
    return ivec3(4, 3, 0);                // 4f  — multi-lobed flower
}
```

4. **Math functions** — port from hydrogen.js:

```glsl
// --- Factorial (iterative, integer) ---
float factorial(int n) {
    float result = 1.0;
    for (int i = 2; i <= n; i++) {
        result *= float(i);
    }
    return result;
}

// --- Associated Laguerre polynomial L_n^alpha(x) via recurrence ---
// L_0^a(x) = 1
// L_1^a(x) = 1 + a - x
// k·L_k^a(x) = (2k-1+a-x)·L_{k-1} - (k-1+a)·L_{k-2}
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

// --- Associated Legendre polynomial P_l^|m|(x) via recurrence ---
// Only computes for |m| (sign handled by caller if needed)
float associatedLegendre(int l, int m, float x) {
    int absM = abs(m);
    // P_m^m(x) starting value
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
    // P_{m+1}^m(x)
    float pmm1 = x * (2.0 * float(absM) + 1.0) * pmm;
    if (l == absM + 1) return pmm1;
    // Recurrence for higher l
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

// --- Radial wave function R_{n,l}(r) ---
// R = norm · exp(-ρ/2) · ρ^l · L_{n-l-1}^{2l+1}(ρ)
// where ρ = 2r / (n·a₀)
float radialWaveFunction(int n, int l, float r) {
    float fn = float(n);
    float fl = float(l);
    float rho = 2.0 * r / (fn * BOHR_RADIUS);
    float prefactor = pow(2.0 / (fn * BOHR_RADIUS), 3.0);
    float num = factorial(n - l - 1);
    float den = 2.0 * fn * factorial(n + l);
    float norm = sqrt(prefactor * num / den);
    float expPart = exp(-rho * 0.5);
    float rhoPart = pow(max(rho, 0.0), fl);
    float lagPart = associatedLaguerre(n - l - 1, 2 * l + 1, rho);
    return norm * expPart * rhoPart * lagPart;
}

// --- Angular wave function Y_l^m(θ) (real spherical harmonic θ-part) ---
float angularWaveFunction(int l, int m, float theta) {
    int absM = abs(m);
    float norm = sqrt(
        (2.0 * float(l) + 1.0) / (4.0 * 3.14159265) *
        factorial(l - absM) / factorial(l + absM)
    );
    return norm * associatedLegendre(l, absM, cos(theta));
}

// --- Probability density |ψ|² = |R_{n,l}(r)|² × |Y_l^m(θ)|² ---
float probabilityDensity(int n, int l, int m, float r, float theta) {
    float R = radialWaveFunction(n, l, r);
    float Y = angularWaveFunction(l, m, theta);
    return R * R * Y * Y;
}
```

5. **Inferno colormap function:**

```glsl
// TECHNIQUE: Piecewise-linear inferno colormap
// Stops from matplotlib's inferno — maps [0,1] density to black→purple→orange→yellow
vec3 inferno(float t) {
    t = clamp(t, 0.0, 1.0);
    // 8 stops normalized to [0,1] RGB
    const vec3 c0 = vec3(0.0, 0.0, 0.016);
    const vec3 c1 = vec3(0.157, 0.043, 0.329);
    const vec3 c2 = vec3(0.396, 0.082, 0.431);
    const vec3 c3 = vec3(0.624, 0.165, 0.388);
    const vec3 c4 = vec3(0.831, 0.282, 0.259);
    const vec3 c5 = vec3(0.961, 0.490, 0.082);
    const vec3 c6 = vec3(0.980, 0.757, 0.153);
    const vec3 c7 = vec3(0.988, 1.0, 0.643);
    float x = t * 7.0;
    if (x < 1.0) return mix(c0, c1, x);
    if (x < 2.0) return mix(c1, c2, x - 1.0);
    if (x < 3.0) return mix(c2, c3, x - 2.0);
    if (x < 4.0) return mix(c3, c4, x - 3.0);
    if (x < 5.0) return mix(c4, c5, x - 4.0);
    if (x < 6.0) return mix(c5, c6, x - 5.0);
    return mix(c6, c7, x - 6.0);
}
```

6. **Hash function for noise stippling:**

```glsl
float hash31(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}
```

7. **Bounding sphere intersection:**

```glsl
// Returns (tNear, tFar) or (-1, -1) if no hit
vec2 intersectSphere(vec3 ro, vec3 rd, float radius) {
    float b = dot(ro, rd);
    float c = dot(ro, ro) - radius * radius;
    float disc = b * b - c;
    if (disc < 0.0) return vec2(-1.0);
    float sq = sqrt(disc);
    return vec2(-b - sq, -b + sq);
}
```

8. **mainImage function** — the ray march and slideshow logic:

```glsl
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

    // Cross-fade factor: 0 during hold, ramps 0→1 during last FADE_DURATION seconds
    float fadeT = smoothstep(PRESET_DURATION - FADE_DURATION, PRESET_DURATION, cycleT);

    // Bounding sphere radius — sized to larger orbital
    int maxN = max(qCurrent.x, qNext.x);
    float boundR = float(maxN * maxN) * R_MAX_SCALE + R_MAX_PAD;

    // --- Ray-sphere intersection ---
    vec2 tHit = intersectSphere(ro, rd, boundR);
    if (tHit.x < 0.0) {
        // Miss — background gradient
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
        float stipple = step(noise, density * STIPPLE_THRESHOLD + density);

        float d = density * stipple;

        // Map density to inferno colormap
        float colorT = COLORMAP_FLOOR + pow(clamp(d * 5.0, 0.0, 1.0), COLORMAP_POWER) * (1.0 - COLORMAP_FLOOR);
        vec3 col = inferno(colorT);

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
```

**Step 2: Verify the shader lints**

Run: `npm run lint:shaders`
Expected: `hydrogen-orbital` passes validation (no GLSL errors)

**Step 3: Commit**

```bash
git add src/shaders/hydrogen-orbital/image.glsl
git commit -m "feat(hydrogen-orbital): volumetric ray march with quantum wave functions and slideshow"
```

---

### Task 4: Visual tuning pass

After getting the shader running, tune these constants for best visual match to the gcanvas particle-cloud look:

**Files:**
- Modify: `src/shaders/hydrogen-orbital/image.glsl`

**Step 1: Adjust density and stippling for particle feel**

Key constants to tune (current values are starting estimates):

- `DENSITY_SCALE` — if cloud is too dim, increase; too blown out, decrease
- `STIPPLE_SCALE` — controls grain size of particle texture
- `STIPPLE_THRESHOLD` — controls sparseness of particles at edges
- `COLORMAP_FLOOR` — how much of dark end of inferno to skip
- `COLORMAP_POWER` — < 1.0 pushes midtones brighter (more orange/yellow)
- `STEP_SIZE` / `MAX_MARCH_STEPS` — quality vs performance tradeoff

**Step 2: Verify each preset orbital looks distinct and correct**

Manually check by waiting through the slideshow:
- 1s: single sphere
- 2p: clear dumbbell with two lobes
- 3d: cloverleaf pattern
- 4f: complex multi-lobed shape

**Step 3: Commit**

```bash
git add src/shaders/hydrogen-orbital/image.glsl
git commit -m "fix(hydrogen-orbital): tune density, stippling, and colormap for particle-cloud look"
```

---

### Task 5: Add screenshot and final cleanup

**Files:**
- Create: `src/shaders/hydrogen-orbital/screenshot.webp` (capture from dev server)
- Modify: `src/shaders/hydrogen-orbital/image.glsl` (final polish if needed)

**Step 1: Capture screenshot**

Open the shader in dev server, navigate to the 3p or 3d preset (most visually striking), and capture a screenshot. Save as `screenshot.webp` in the shader folder.

**Step 2: Run full build to verify**

Run: `npm run build`
Expected: Clean build, no errors

**Step 3: Final commit**

```bash
git add src/shaders/hydrogen-orbital/
git commit -m "feat(hydrogen-orbital): add screenshot and finalize"
```

---

## Notes for Implementer

- **GLSL loop bounds:** The `associatedLaguerre` and `associatedLegendre` functions use `for (int k = 2; k <= n; k++)` where `n` comes from the preset (max 4). GLSL ES 3.00 allows this with uniform/non-constant bounds. If the linter complains, unroll with a fixed upper bound and `if (k > n) break;`.
- **No `f` suffix:** All float literals must be `1.0` not `1.0f`.
- **No `saturate()`:** Use `clamp(x, 0.0, 1.0)`.
- **Protect pow/sqrt:** `pow(max(x, 0.0), p)`, `sqrt(abs(x))` or `sqrt(max(x, 0.0))`.
- **Camera common prepended:** The commons `["camera", "color"]` are prepended before the shader source at build time. Functions like `orbitCameraRay()`, `OrbitCameraRay`, `OrbitCameraConfig`, `orbitCameraDefaultConfig()`, `orbitCameraUpdate()` are available without imports.
- **Reference:** Compare wave function output against `D:\Developer\gcanvas\src\math\hydrogen.js` — the GLSL port should produce identical values for the same inputs.
