# Caustic Study #04: Beach — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Underwater camera with orbit control rendering sand floor, water volume with absorption, and water surface from below — caustic patterns on both sand and surface.

**Architecture:** Multi-pass shader (buffer-a for camera state, image for all rendering). Two infinite planes (sand, surface) with ray-plane intersection. `causticWarp()` from caustic common provides the pattern; sand gets depth-attenuated projection, surface gets bright network from below. Physically-based per-channel water absorption.

**Tech Stack:** GLSL ES 3.00, Shadertoy conventions, commons: `camera`, `caustic`

**Design doc:** `docs/plans/2026-03-01-caustic-beach-design.md`

---

### Task 1: Configure meta.json with commons and channels

**Files:**
- Modify: `src/shaders/caustics-beach/meta.json`

**Step 1: Update meta.json**

```json
{
  "title": "Caustic Study #04: Beach",
  "description": "Underwater camera between a sandy floor and the water surface. Dual-layer caustic light patterns project onto the sand as bright convergence lines, while the surface seen from below shows the same pattern with Snell's window refraction. Physically-based per-channel water absorption shifts color from clear to deep blue-green with distance.",
  "date": "2026-03-01",
  "tags": ["caustics", "raymarching", "3d", "physics", "underwater"],
  "commons": ["camera", "caustic"],
  "links": {},
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  }
}
```

**Step 2: Commit**

```bash
git add src/shaders/caustics-beach/meta.json
git commit -m "feat(caustics-beach): configure meta with camera+caustic commons"
```

---

### Task 2: Create buffer-a.glsl — orbit camera for underwater view

**Files:**
- Create: `src/shaders/caustics-beach/buffer-a.glsl`

**Step 1: Write buffer-a.glsl**

Copy the exact pattern from `caustics-pool/buffer-a.glsl` but adjust pitch limits for an underwater camera that can look up at the surface and down at the sand:

```glsl
/**
 * Caustics Beach — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-03-01
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Underwater view: pitch range allows looking up at surface and
 * down at the sand floor.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Underwater range: camera can look up at the surface or down at the sand
#define PITCH_MIN -0.4    // Look down toward the sand floor
#define PITCH_MAX  0.5    // Look up toward the water surface

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
```

**Step 2: Lint**

Run: `npm run lint:shaders`
Expected: `caustics-beach/buffer-a.glsl` passes (or skip-missing if no glslangValidator)

**Step 3: Commit**

```bash
git add src/shaders/caustics-beach/buffer-a.glsl
git commit -m "feat(caustics-beach): add orbit camera buffer with underwater pitch"
```

---

### Task 3: Write image.glsl skeleton — camera, planes, basic sand color

**Files:**
- Modify: `src/shaders/caustics-beach/image.glsl`

**Step 1: Replace the template with the shader skeleton**

This establishes the file structure, all `#define` constants, the camera setup, ray-plane intersections, and basic sand shading (without caustics yet). The surface is a placeholder flat color for now.

```glsl
/**
 * Caustic Study #04: Beach
 * @author guinetik
 * @date 2026-03-01
 *
 * Underwater camera between a sandy floor and the water surface.
 * Dual-layer caustic patterns project onto the sand from above,
 * while the surface seen from below shows Snell's window with
 * caustic bright lines. Per-channel water absorption shifts color
 * from clear to deep blue-green at distance.
 *
 * TECHNIQUE: Underwater ray-plane rendering
 * Camera sits between two infinite horizontal planes (sand, surface).
 * Ray direction determines which plane is hit first. Water volume
 * absorption is applied based on ray travel distance.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 */

// -- Scene geometry --
#define SURFACE_Y       0.0     // Water surface plane height
#define SAND_Y         -3.0     // Sand floor plane height
#define CAM_Y          -1.2     // Camera height (between sand and surface)

// -- Camera --
#define CAM_DIST        4.0     // Horizontal orbit distance
#define CAM_HEIGHT      0.0     // Height offset from CAM_Y (0 = level)
#define CAM_TARGET      vec3(0.0, CAM_Y, 0.0)  // Look-at point
#define CAM_FOV         1.8     // Field of view (lower = telephoto)

// -- Sand --
#define SAND_BASE       vec3(0.76, 0.70, 0.50)  // Warm tan base color
#define SAND_DARK       vec3(0.55, 0.48, 0.35)  // Darker sand in troughs
#define SAND_RIDGE_SCALE 1.2    // Frequency of sand ripple ridges
#define SAND_RIDGE_AMP  0.15    // Height amplitude of ridges (visual only)
#define SAND_NOISE_SCALE 8.0    // High-frequency sand grain noise scale
#define SAND_NOISE_AMP  0.08    // Grain noise contribution to color

// -- Water surface (seen from below) --
#define SNELL_COS       0.6494  // cos(critical angle) = cos(48.6°) for water (n=1.33)
                                // Below this: total internal reflection. Above: see through.
#define SURFACE_BRIGHT  vec3(0.6, 0.85, 1.0)    // Sky color seen through Snell's window
#define SURFACE_TIR     vec3(0.02, 0.06, 0.10)   // Total internal reflection color (dark blue-green)
#define SURFACE_RIPPLE_FREQ 4.0  // Surface ripple distortion frequency
#define SURFACE_RIPPLE_AMP  0.03 // Surface ripple distortion amplitude

// -- Water absorption (physically-based) --
// Red absorbs fastest, green next, blue least — real seawater behavior.
// At 3m depth: red ≈ 30%, green ≈ 79%, blue ≈ 89% remaining.
#define WATER_ABSORB    vec3(0.40, 0.08, 0.04)   // Per-channel extinction coefficients
#define WATER_SCATTER   vec3(0.01, 0.04, 0.06)    // Scattered ambient light (blue-green)

// -- Caustic (joltz0r / David Hoskins) --
#define TAU             6.28318530718
#define CAUSTIC_ITERS   5       // Warp iterations: 3=blobs, 5=crisp, 8+=sharp
#define CAUSTIC_INTEN   0.005   // Inverse-distance sensitivity — smaller = tighter lines
#define CAUSTIC_POWER   1.4     // Contrast curve exponent
#define CAUSTIC_BASE    1.17    // Brightness threshold offset
#define CAUSTIC_BRIGHT  8.0     // Final sharpening — 4=glow, 8=lines, 12=hair-thin
#define CAUSTIC_SPEED   0.5     // Time multiplier for caustic animation
#define CAUSTIC_OFFSET  23.0    // Time offset to skip boring initial state
#define CAUSTIC_SCALE_A 1.8     // Primary layer UV scale
#define CAUSTIC_SCALE_B 1.0     // Secondary layer UV scale (coarser for parallax)
#define CAUSTIC_MIX_B   0.35    // Blend weight of secondary layer
#define CAUSTIC_SAND_STR 0.6    // Caustic brightness on sand (depth-attenuated)
#define CAUSTIC_SURF_STR 0.4    // Caustic brightness on surface from below
#define CAUSTIC_COL     vec3(0.85, 0.95, 1.0)  // Caustic highlight color (warm white-blue)

// -- Lighting --
#define LIGHT_DIR       normalize(vec3(0.3, 1.0, 0.2))  // Sun direction (from above)
#define AMBIENT         0.35    // Ambient light level underwater
#define DIFFUSE_STR     0.5     // Diffuse lighting strength on sand

// -- Post-processing --
#define VIGNETTE_STR    0.30    // Radial edge darkening
#define GAMMA           vec3(0.45)  // Gamma correction exponent (~1/2.2)

// -------------------------------------------------------
// Hash — simple pseudo-random for sand texture
// -------------------------------------------------------
float hash21(vec2 p)
{
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// -------------------------------------------------------
// Value noise — smooth interpolated noise for sand
// -------------------------------------------------------
float valueNoise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);  // smoothstep

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// -------------------------------------------------------
// FBM — layered noise for sand granularity
// -------------------------------------------------------
float fbm(vec2 p, int octaves)
{
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 6; i++)
    {
        if (i >= octaves) break;
        val += amp * valueNoise(p);
        p *= 2.0;
        amp *= 0.5;
    }
    return val;
}

// -------------------------------------------------------
// Procedural sand color
// Combines ripple ridges + fine grain noise
// -------------------------------------------------------
vec3 sandColor(vec2 xz)
{
    // Low-frequency ridges (underwater sand ripples)
    float ridge = sin(xz.x * SAND_RIDGE_SCALE + xz.y * 0.3) *
                  sin(xz.y * SAND_RIDGE_SCALE * 0.7 - xz.x * 0.2);
    ridge = ridge * 0.5 + 0.5;  // remap to 0..1

    // High-frequency grain
    float grain = fbm(xz * SAND_NOISE_SCALE, 4);

    // Blend base/dark by ridge, add grain variation
    vec3 col = mix(SAND_DARK, SAND_BASE, ridge);
    col += (grain - 0.5) * SAND_NOISE_AMP;

    return col;
}

// -------------------------------------------------------
// Ray-plane intersection
// Returns distance along ray, or -1.0 if no hit
// -------------------------------------------------------
float planeHit(vec3 ro, vec3 rd, float planeY)
{
    if (abs(rd.y) < 0.0001) return -1.0;
    float t = (planeY - ro.y) / rd.y;
    return t > 0.0 ? t : -1.0;
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // Orbit camera from buffer-a state
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );

    // Override camera Y to stay underwater
    cam.ro.y = CAM_Y;
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    // Start with deep water background
    vec3 col = WATER_SCATTER;

    // Ray-plane intersections
    float tSand    = planeHit(ro, rd, SAND_Y);
    float tSurface = planeHit(ro, rd, SURFACE_Y);

    // Determine which plane is closer
    float tHit = -1.0;
    bool hitSand = false;
    bool hitSurface = false;

    if (tSand > 0.0 && tSurface > 0.0)
    {
        if (tSand < tSurface) { tHit = tSand;    hitSand = true; }
        else                  { tHit = tSurface;  hitSurface = true; }
    }
    else if (tSand > 0.0)    { tHit = tSand;    hitSand = true; }
    else if (tSurface > 0.0) { tHit = tSurface; hitSurface = true; }

    if (hitSand)
    {
        vec3 p = ro + rd * tHit;
        vec3 n = vec3(0.0, 1.0, 0.0);

        // Procedural sand
        col = sandColor(p.xz);

        // Basic diffuse lighting
        float diff = max(dot(n, LIGHT_DIR), 0.0);
        col *= AMBIENT + DIFFUSE_STR * diff;
    }
    else if (hitSurface)
    {
        // Placeholder: flat blue for now (Snell's window in Task 4)
        col = SURFACE_TIR;
    }

    // Water absorption based on travel distance
    if (tHit > 0.0)
    {
        vec3 fog = exp(-WATER_ABSORB * tHit);
        col = col * fog + WATER_SCATTER * (1.0 - fog);
    }

    // Vignette
    vec2 uv = fragCoord / iResolution.xy;
    vec2 q = uv * 2.0 - 1.0;
    col *= 1.0 - dot(q, q) * VIGNETTE_STR;

    // Gamma correction
    col = pow(max(col, 0.0), GAMMA);

    fragColor = vec4(col, 1.0);
}
```

**Step 2: Lint**

Run: `npm run lint:shaders`
Expected: `caustics-beach/image.glsl` passes

**Step 3: Commit**

```bash
git add src/shaders/caustics-beach/image.glsl
git commit -m "feat(caustics-beach): image skeleton with camera, sand, and absorption"
```

---

### Task 4: Add Snell's window to water surface

**Files:**
- Modify: `src/shaders/caustics-beach/image.glsl`

**Step 1: Add surface ripple normal function**

Add this function after `planeHit()`, before `mainImage()`:

```glsl
// -------------------------------------------------------
// Surface ripple normal (seen from below)
// Perturbs the flat surface normal with gentle waves
// -------------------------------------------------------
vec3 surfaceNormal(vec2 xz, float t)
{
    float tx = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float dx = cos(xz.x * SURFACE_RIPPLE_FREQ * TAU + tx * 1.1)
             + cos(xz.y * SURFACE_RIPPLE_FREQ * 0.7 * TAU + tx * 0.8);
    float dz = sin(xz.y * SURFACE_RIPPLE_FREQ * TAU + tx * 0.9)
             + sin(xz.x * SURFACE_RIPPLE_FREQ * 0.6 * TAU + tx * 1.2);
    return normalize(vec3(dx * SURFACE_RIPPLE_AMP, -1.0, dz * SURFACE_RIPPLE_AMP));
}
```

Note: the normal points **downward** (`-1.0` in y) because we're looking at the surface from below.

**Step 2: Replace the surface placeholder in `mainImage()`**

Replace the `else if (hitSurface)` block:

```glsl
    else if (hitSurface)
    {
        vec3 p = ro + rd * tHit;

        // TECHNIQUE: Snell's window (total internal reflection from below)
        // Looking up from underwater, you can only see through the surface
        // within the critical angle (~48.6° for water, n=1.33).
        // Outside this cone: total internal reflection — you see the
        // underwater scene mirrored. Inside: you see the bright sky.
        vec3 surfN = surfaceNormal(p.xz, t);
        float cosAngle = abs(dot(rd, surfN));

        // Smooth transition at Snell's window boundary
        float snellMask = smoothstep(SNELL_COS - 0.08, SNELL_COS + 0.08, cosAngle);

        // Inside window: bright sky with depth-tinted falloff
        // Outside window: dark TIR reflection of underwater scene
        col = mix(SURFACE_TIR, SURFACE_BRIGHT, snellMask);

        // Fresnel brightening near the edge of Snell's window
        float fresnelEdge = pow(max(1.0 - cosAngle, 0.0), 3.0);
        col += vec3(0.05, 0.12, 0.18) * fresnelEdge;
    }
```

**Step 3: Lint**

Run: `npm run lint:shaders`
Expected: passes

**Step 4: Commit**

```bash
git add src/shaders/caustics-beach/image.glsl
git commit -m "feat(caustics-beach): add Snell's window with surface ripple normals"
```

---

### Task 5: Add caustic pattern to sand and surface

**Files:**
- Modify: `src/shaders/caustics-beach/image.glsl`

**Step 1: Add the causticPattern wrapper function**

Add after `surfaceNormal()`, before `mainImage()`:

```glsl
// -------------------------------------------------------
// Caustic pattern — dual-layer wrapper around causticWarp
// (joltz0r / David Hoskins iterative domain warp)
//
// Returns combined brightness from two caustic layers at
// different UV scales, offset in time for parallax depth.
// -------------------------------------------------------
float causticPattern(vec2 uv, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c1 = causticWarp(uv, CAUSTIC_SCALE_A, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c1 = CAUSTIC_BASE - pow(max(c1, 0.0), CAUSTIC_POWER);
    c1 = pow(abs(c1), CAUSTIC_BRIGHT);

    float c2 = causticWarp(uv, CAUSTIC_SCALE_B, time + 7.0, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c2 = CAUSTIC_BASE - pow(max(c2, 0.0), CAUSTIC_POWER);
    c2 = pow(abs(c2), CAUSTIC_BRIGHT);

    return c1 + c2 * CAUSTIC_MIX_B;
}
```

**Step 2: Add caustic light to sand in the `hitSand` block**

After `col *= AMBIENT + DIFFUSE_STR * diff;`, add:

```glsl
        // Caustic light projected from the surface onto the sand
        // TECHNIQUE: Same causticWarp produces the "shadow" pattern —
        // bright convergence lines where sunlight focuses through waves.
        // Attenuated by water depth between surface and sand.
        float depthAboveSand = SURFACE_Y - p.y;
        float depthFade = exp(-depthAboveSand * 0.15);
        float caustic = causticPattern(p.xz, t);
        col += CAUSTIC_COL * caustic * CAUSTIC_SAND_STR * depthFade;
```

**Step 3: Add caustic pattern to the surface in the `hitSurface` block**

After the Fresnel edge brightening, add:

```glsl
        // Caustic pattern visible on the surface from below
        // Same pattern as on sand — seen at the source of the refraction
        float surfCaustic = causticPattern(p.xz, t);
        col += CAUSTIC_COL * surfCaustic * CAUSTIC_SURF_STR * snellMask;
```

The `snellMask` multiplier ensures caustics only appear within the Snell's window where light passes through.

**Step 4: Lint**

Run: `npm run lint:shaders`
Expected: passes

**Step 5: Commit**

```bash
git add src/shaders/caustics-beach/image.glsl
git commit -m "feat(caustics-beach): add dual-layer caustics to sand and surface"
```

---

### Task 6: Visual tuning pass — adjust constants for best look

**Files:**
- Modify: `src/shaders/caustics-beach/image.glsl`

This task requires the dev server running. The implementer should:

1. Run `npm run dev` (user does this manually)
2. Navigate to the caustics-beach shader
3. Adjust these constants iteratively for best visual result:

**Constants to tune (in priority order):**

| Constant | What to watch for |
|----------|-------------------|
| `CAM_Y` | Camera should float comfortably between sand and surface |
| `SAND_Y` / `SURFACE_Y` | Separation determines water depth — affects absorption color |
| `WATER_ABSORB` | Too high = can't see sand. Too low = no underwater feel |
| `CAUSTIC_SCALE_A/B` | Pattern density on sand and surface |
| `CAUSTIC_BRIGHT` | Line sharpness — 6=soft glow, 10=crisp lines |
| `CAUSTIC_SAND_STR` | Brightness of caustic light on sand |
| `CAUSTIC_SURF_STR` | Brightness of caustic pattern on surface |
| `SNELL_COS` | Size of the bright window when looking up |
| `SAND_RIDGE_SCALE` | Frequency of sand ripple ridges |
| `VIGNETTE_STR` | Edge darkening intensity |

**Step 1: Tune values**

Adjust defines and verify visually. No structural code changes.

**Step 2: Lint**

Run: `npm run lint:shaders`

**Step 3: Commit**

```bash
git add src/shaders/caustics-beach/image.glsl
git commit -m "fix(caustics-beach): tune visual constants for underwater look"
```

---

### Task 7: Add screenshot and final commit

**Files:**
- Create: `src/shaders/caustics-beach/screenshot.png`

**Step 1: Capture screenshot**

With the dev server running, capture a screenshot of the shader at a good angle and save it as `src/shaders/caustics-beach/screenshot.png`.

**Step 2: Optimize images**

Run: `npm run images`

**Step 3: Final build check**

Run: `npm run build`
Expected: builds successfully with no errors

**Step 4: Commit**

```bash
git add src/shaders/caustics-beach/
git commit -m "feat(caustics-beach): add gallery screenshot"
```
