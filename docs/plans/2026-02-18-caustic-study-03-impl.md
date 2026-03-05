# Caustic Study #03: Crystal — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a ray-marched faceted crystal shader that projects prismatic rainbow caustics onto a ground plane below it, with camera orbit + inertia.

**Architecture:** Two-pass shader (buffer-a for camera state, image for rendering). Crystal geometry defined as an SDF (intersection of cones + clip planes for brilliant-cut shape). Caustics computed by tracing refracted light rays through the crystal with chromatic dispersion (three IOR values for R/G/B). Reuses the buffer-a camera-inertia pattern from caustics-pool.

**Tech Stack:** GLSL ES 3.00, WebGL2, commons: `sphere`, `color`, `sdf`, `caustic`

---

### Task 1: Scaffold the shader folder

**Files:**
- Create: `src/shaders/caustics-crystal/meta.json`

**Step 1: Create meta.json**

```json
{
  "title": "Caustic Study #03: Crystal",
  "description": "Ray-marched faceted crystal with prismatic caustics from chromatic dispersion. Light refracts through the gemstone's facets, projecting rainbow patterns on the ground plane below.",
  "date": "2026-02-18",
  "tags": ["caustics", "raymarching", "3d", "physics", "refraction"],
  "commons": ["sphere", "color", "sdf", "caustic"],
  "channels": {
    "image": { "iChannel0": "buffer-a" },
    "bufferA": { "iChannel0": "buffer-a" }
  },
  "links": {}
}
```

**Step 2: Commit**

```bash
git add src/shaders/caustics-crystal/meta.json
git commit -m "scaffold: add caustics-crystal shader folder with meta.json"
```

---

### Task 2: Create buffer-a (camera state)

**Files:**
- Create: `src/shaders/caustics-crystal/buffer-a.glsl`
- Reference: `src/shaders/caustics-pool/buffer-a.glsl` (copy and adapt)

This is the same camera-inertia pattern used in caustics-pool. Adapt the pitch limits for a slightly higher default viewing angle (looking down at the crystal from above).

**Step 1: Write buffer-a.glsl**

Copy the caustics-pool buffer-a verbatim, then adjust these constants:

```glsl
/**
 * Caustic Study #03: Crystal — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-02-18
 *
 * Pixel (0,0) stores camera angles and velocities:
 *   .x = yaw angle (radians, wraps TAU)
 *   .y = pitch angle (radians, clamped)
 *   .z = yaw velocity (radians/frame)
 *   .w = pitch velocity (radians/frame)
 *
 * Pixel (1,0) stores previous mouse position:
 *   .x = previous mouse X normalized
 *   .y = previous mouse Y normalized
 *
 * Same inertia system as caustics-pool: drag to orbit,
 * release to coast with friction, idle auto-orbit.
 */

// -- Camera physics (per-frame units) --
#define FRICTION          0.993
#define DRAG_SENSITIVITY  2.0
#define PITCH_SENSITIVITY 0.3
#define VELOCITY_SMOOTH   0.35
#define IDLE_ORBIT_SPEED  0.003
#define IDLE_THRESHOLD    0.0003
#define IDLE_BLEND        0.015
#define DRAG_DEAD_ZONE    0.0001

// -- Pitch limits (radians) --
// Slightly elevated default view to look down at the crystal
#define PITCH_MIN        -0.5   // Allow looking further down
#define PITCH_MAX         0.3   // Allow looking slightly up

#define TAU 6.28318530718
```

The `mainImage` body is identical to `caustics-pool/buffer-a.glsl` — same state layout, same drag/friction/idle logic.

**Step 2: Lint**

```bash
npm run lint:shaders
```

Expected: PASS (buffer-a is simple, no commons needed)

**Step 3: Commit**

```bash
git add src/shaders/caustics-crystal/buffer-a.glsl
git commit -m "feat(caustics-crystal): add buffer-a camera state with inertia"
```

---

### Task 3: Create image.glsl — Crystal SDF + ground plane (no caustics yet)

**Files:**
- Create: `src/shaders/caustics-crystal/image.glsl`

Start with the core ray marching scene: crystal geometry + ground plane + basic lighting. No caustics yet — just get the shape and camera working.

**Step 1: Write image.glsl with crystal SDF**

```glsl
/**
 * Caustic Study #03: Crystal
 * @author guinetik
 * @date 2026-02-18
 *
 * Ray-marched faceted crystal (brilliant-cut gemstone) hovering above a
 * dark ground plane. Light refracts through the crystal's facets and
 * projects prismatic rainbow caustics on the floor via chromatic dispersion.
 *
 * TECHNIQUE: Crystal SDF via cone intersections
 * The gemstone is approximated as the intersection of two cones (crown
 * and pavilion) clipped by a flat table on top. This creates a smooth
 * diamond-like silhouette. Facets are implied by the lighting model
 * rather than explicit geometry cuts, keeping the SDF cheap.
 *
 * TECHNIQUE: Chromatic dispersion for prismatic caustics
 * For each ground-plane pixel, trace refracted rays through the crystal
 * at three slightly different IOR values (one per RGB channel). Where
 * the refracted rays converge, caustic brightness peaks. The IOR spread
 * creates rainbow color separation.
 */

// -- Math --
#define PI              3.14159265359
#define TAU             6.28318530718

// -- Crystal geometry --
#define CRYSTAL_POS     vec3(0.0, 0.6, 0.0)  // Center of the crystal
#define CRYSTAL_SCALE   0.8                   // Overall size multiplier
#define CROWN_ANGLE     0.6                   // Crown half-angle (radians) — wider = flatter top
#define PAVILION_ANGLE  0.45                  // Pavilion half-angle — narrower = pointier bottom
#define TABLE_Y         0.35                  // Table facet height (relative to center)
#define GIRDLE_Y        0.0                   // Girdle height (widest point, relative to center)

// -- Crystal material --
#define CRYSTAL_IOR     1.52                  // Base index of refraction (glass/crystal)
#define CRYSTAL_ABSORB  vec3(0.05, 0.02, 0.08) // Internal absorption color (subtle purple tint)
#define CRYSTAL_SPEC    64.0                  // Specular exponent for surface highlights
#define FRESNEL_POWER   5.0                   // Fresnel falloff exponent
#define FRESNEL_MIN     0.04                  // Minimum reflectance at normal incidence
#define FRESNEL_MAX     1.0                   // Maximum reflectance at grazing angle

// -- Crystal rotation --
#define CRYSTAL_ROT_SPEED 0.3                 // Radians/second auto-rotation around Y

// -- Ground plane --
#define GROUND_Y       -0.8                   // Ground plane Y position
#define GROUND_COL     vec3(0.08, 0.08, 0.10) // Dark stone/marble base color
#define GROUND_SPEC    16.0                   // Ground specular exponent (subtle)

// -- Camera --
#define CAM_DIST        4.0                   // Camera distance from origin
#define CAM_HEIGHT      2.0                   // Camera base height
#define CAM_TARGET      vec3(0.0, 0.0, 0.0)  // Look-at target
#define CAM_FOV         2.0                   // Field of view (lower = narrower)

// -- Lighting --
#define LIGHT_DIR       normalize(vec3(0.4, 1.0, 0.2))  // Directional light (above-right)
#define LIGHT_COL       vec3(1.0, 0.98, 0.95)            // Warm white
#define AMBIENT         0.08                              // Ambient light level
#define SKY_COL         vec3(0.02, 0.02, 0.04)            // Background color

// -- Ray marching --
#define MAX_STEPS       128
#define MAX_DIST        20.0
#define SURF_EPSILON    0.001
#define NORMAL_EPSILON  0.0005

// -- Caustics (chromatic dispersion) --
#define IOR_R           1.514                 // IOR for red channel — lowest dispersion
#define IOR_G           1.522                 // IOR for green channel
#define IOR_B           1.534                 // IOR for blue channel — highest dispersion
#define CAUSTIC_SAMPLES 6                     // Refraction samples through the crystal per ground pixel
#define CAUSTIC_BRIGHT  3.0                   // Caustic brightness multiplier
#define CAUSTIC_RADIUS  1.2                   // Bounding radius for caustic sampling area

// -- Ambient shimmer (from caustic commons) --
#define SHIMMER_SCALE   1.5                   // UV scale for ambient caustic shimmer
#define SHIMMER_SPEED   0.4                   // Time scale for shimmer animation
#define SHIMMER_OFFSET  23.0                  // Time offset (same as other studies)
#define SHIMMER_ITERS   4                     // Warp iterations (softer than studies #01/#02)
#define SHIMMER_INTEN   0.005                 // Inverse-distance sensitivity
#define SHIMMER_STR     0.15                  // Blend strength of ambient shimmer

// -------------------------------------------------------
// Crystal SDF
// Brilliant-cut: intersection of crown cone, pavilion
// cone, and table clip plane. The crystal auto-rotates.
// -------------------------------------------------------

// Cone SDF: infinite cone along Y axis, tip at origin
// `angle` is the half-angle from the Y axis
float sdCone(vec3 p, float angle)
{
    float sinA = sin(angle);
    float cosA = cos(angle);
    vec2 q = vec2(length(p.xz), p.y);
    float d = length(q) * cosA - q.y * sinA + q.x * cosA;
    // Simplified: distance to cone surface
    vec2 c = vec2(sinA, cosA);
    float d2 = dot(q, c);
    return length(q - c * max(d2, 0.0)) * sign(q.x * c.y - q.y * c.x);
}

// Capped cone along Y with tip at origin pointing up
float sdCappedCone(vec3 p, float angle, float h)
{
    float sinA = sin(angle);
    float cosA = cos(angle);
    vec2 q = vec2(length(p.xz), p.y);
    vec2 tip = vec2(0.0, 0.0);
    vec2 base = vec2(h * sinA / cosA, -h);

    vec2 ab = base - tip;
    vec2 ap = q - tip;
    float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    vec2 closest = tip + ab * t;
    return length(q - closest) * sign(ap.x * ab.y - ap.y * ab.x);
}

// Full crystal SDF: two capped cones + table clip
float sdCrystal(vec3 p)
{
    // Crown: cone pointing down from table, widening to girdle
    float crown = sdCappedCone(vec3(p.x, TABLE_Y - p.y, p.z), CROWN_ANGLE, TABLE_Y - GIRDLE_Y);

    // Pavilion: cone pointing up from bottom, widening to girdle
    float pavilion = sdCappedCone(vec3(p.x, p.y - GIRDLE_Y, p.z), PAVILION_ANGLE, GIRDLE_Y - GROUND_Y * 0.5);

    // Intersection of both cones
    float d = max(crown, pavilion);

    // Table: flat clip on top
    d = max(d, p.y - (CRYSTAL_POS.y + TABLE_Y));

    return d * CRYSTAL_SCALE;
}

// Scene SDF: crystal + ground
float map(vec3 p, float rotAngle)
{
    // Rotate crystal around Y
    vec3 cp = p - CRYSTAL_POS;
    float ca = cos(rotAngle);
    float sa = sin(rotAngle);
    cp.xz = mat2(ca, -sa, sa, ca) * cp.xz;

    float crystal = sdCrystal(cp);
    float ground = p.y - GROUND_Y;

    return min(crystal, ground);
}

// Scene SDF with material ID
float mapID(vec3 p, float rotAngle, out int matID)
{
    vec3 cp = p - CRYSTAL_POS;
    float ca = cos(rotAngle);
    float sa = sin(rotAngle);
    cp.xz = mat2(ca, -sa, sa, ca) * cp.xz;

    float crystal = sdCrystal(cp);
    float ground = p.y - GROUND_Y;

    if (crystal < ground) {
        matID = 1; // crystal
        return crystal;
    } else {
        matID = 0; // ground
        return ground;
    }
}

// -------------------------------------------------------
// Normal via central differences
// -------------------------------------------------------
vec3 calcNormal(vec3 p, float rotAngle)
{
    vec2 e = vec2(NORMAL_EPSILON, 0.0);
    return normalize(vec3(
        map(p + e.xyy, rotAngle) - map(p - e.xyy, rotAngle),
        map(p + e.yxy, rotAngle) - map(p - e.yxy, rotAngle),
        map(p + e.yyx, rotAngle) - map(p - e.yyx, rotAngle)
    ));
}

// -------------------------------------------------------
// Ray march
// -------------------------------------------------------
float march(vec3 ro, vec3 rd, float rotAngle)
{
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++)
    {
        float d = map(ro + rd * t, rotAngle);
        if (d < SURF_EPSILON) return t;
        t += d;
        if (t > MAX_DIST) break;
    }
    return -1.0;
}

// -------------------------------------------------------
// Fresnel (Schlick approximation)
// -------------------------------------------------------
float fresnelSchlick(float cosTheta)
{
    float f0 = FRESNEL_MIN;
    return f0 + (FRESNEL_MAX - f0) * pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
}

// -------------------------------------------------------
// Camera
// -------------------------------------------------------
mat3 lookAt(vec3 ro, vec3 ta)
{
    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    return mat3(right, up, fwd);
}

// -------------------------------------------------------
// Caustic brightness on the ground plane
// Trace refracted light through the crystal bounding sphere.
// Three IOR values produce chromatic separation.
// -------------------------------------------------------
vec3 crystalCaustic(vec3 groundPos, float rotAngle)
{
    // Only compute caustics within the crystal's shadow footprint
    vec2 offset = groundPos.xz - CRYSTAL_POS.xz;
    if (dot(offset, offset) > CAUSTIC_RADIUS * CAUSTIC_RADIUS) return vec3(0.0);

    // Trace a ray from the ground point upward toward the light
    vec3 ro = groundPos;
    vec3 rd = LIGHT_DIR;

    // Check if this ray intersects the crystal's bounding sphere
    float bsT = intersectSphere(ro, rd, CRYSTAL_POS, CAUSTIC_RADIUS);
    if (bsT < 0.0) return vec3(0.0);

    // Enter the crystal volume — compute refraction for each channel
    vec3 enterPos = ro + rd * bsT;
    vec3 cp = enterPos - CRYSTAL_POS;
    float ca = cos(rotAngle);
    float sa = sin(rotAngle);
    cp.xz = mat2(ca, -sa, sa, ca) * cp.xz;

    vec3 n = calcNormal(enterPos, rotAngle);

    // Refract for each color channel (different IOR = dispersion)
    vec3 refR = refract(-rd, n, 1.0 / IOR_R);
    vec3 refG = refract(-rd, n, 1.0 / IOR_G);
    vec3 refB = refract(-rd, n, 1.0 / IOR_B);

    // If total internal reflection for any channel, no caustic
    float validR = step(0.001, length(refR));
    float validG = step(0.001, length(refG));
    float validB = step(0.001, length(refB));

    // Caustic intensity: based on how close the refracted ray
    // comes to the vertical (i.e., hits the ground below)
    float cR = validR * pow(max(dot(normalize(refR), -LIGHT_DIR), 0.0), 4.0);
    float cG = validG * pow(max(dot(normalize(refG), -LIGHT_DIR), 0.0), 4.0);
    float cB = validB * pow(max(dot(normalize(refB), -LIGHT_DIR), 0.0), 4.0);

    return vec3(cR, cG, cB) * CAUSTIC_BRIGHT;
}

// -------------------------------------------------------
// Ambient shimmer — subtle causticWarp layer from commons
// -------------------------------------------------------
float ambientShimmer(vec2 uv, float t)
{
    float time = t * SHIMMER_SPEED + SHIMMER_OFFSET;
    float c = causticWarp(uv, SHIMMER_SCALE, time, SHIMMER_ITERS, SHIMMER_INTEN);
    c = 1.17 - pow(max(c, 0.0), 1.4);
    return pow(abs(c), 8.0) * SHIMMER_STR;
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    float t = iTime;

    // Crystal rotation
    float rotAngle = t * CRYSTAL_ROT_SPEED;

    // Camera from buffer-a
    vec4 camState = texelFetch(iChannel0, ivec2(0, 0), 0);
    float yaw   = camState.x;
    float pitch = camState.y;

    float baseElev = atan(CAM_HEIGHT, CAM_DIST);
    float elev     = baseElev + pitch;
    float camR     = length(vec2(CAM_DIST, CAM_HEIGHT));

    vec3 ro = vec3(
        cos(elev) * cos(yaw) * camR,
        sin(elev) * camR,
        cos(elev) * sin(yaw) * camR
    );
    mat3 cam = lookAt(ro, CAM_TARGET);
    vec3 rd = cam * normalize(vec3(uv, CAM_FOV));

    // Ray march
    float hit = march(ro, rd, rotAngle);
    vec3 col = SKY_COL;

    if (hit > 0.0)
    {
        vec3 p = ro + rd * hit;
        vec3 n = calcNormal(p, rotAngle);
        int matID;
        mapID(p, rotAngle, matID);

        // Diffuse + specular
        float diff = max(dot(n, LIGHT_DIR), 0.0);
        vec3 h = normalize(LIGHT_DIR - rd);

        if (matID == 0)
        {
            // Ground plane
            float spec = pow(max(dot(n, h), 0.0), GROUND_SPEC);
            col = GROUND_COL * (AMBIENT + diff * 0.5);
            col += vec3(spec) * 0.1;

            // Prismatic caustics from crystal refraction
            col += crystalCaustic(p, rotAngle);

            // Ambient shimmer from caustic commons
            col += ambientShimmer(p.xz, t) * vec3(0.3, 0.5, 0.7);
        }
        else
        {
            // Crystal surface
            float cosTheta = max(dot(n, -rd), 0.0);
            float fres = fresnelSchlick(cosTheta);

            // Reflection
            vec3 reflDir = reflect(rd, n);
            vec3 reflCol = SKY_COL + LIGHT_COL * pow(max(dot(reflDir, LIGHT_DIR), 0.0), CRYSTAL_SPEC);

            // Refraction (simple single-bounce for the body)
            vec3 refrDir = refract(rd, n, 1.0 / CRYSTAL_IOR);
            float refrHit = march(p + refrDir * 0.02, refrDir, rotAngle);
            vec3 refrCol = SKY_COL;
            if (refrHit > 0.0)
            {
                vec3 rp = p + refrDir * 0.02 + refrDir * refrHit;
                // Absorb light based on path length through crystal
                refrCol = LIGHT_COL * exp(-CRYSTAL_ABSORB * refrHit * 2.0);

                // Color the refraction based on exit angle (dispersion hint)
                float exitAngle = dot(normalize(refrDir), vec3(0.0, -1.0, 0.0));
                refrCol *= hsl2rgb(exitAngle * 360.0, 0.6, 0.5);
            }

            // Blend reflection and refraction via Fresnel
            col = mix(refrCol, reflCol, fres);

            // Surface specular highlight
            float spec = pow(max(dot(n, h), 0.0), CRYSTAL_SPEC);
            col += LIGHT_COL * spec * 0.8;
        }
    }

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
```

**Step 2: Lint**

```bash
npm run lint:shaders
```

Expected: PASS

**Step 3: Visual test**

Open in browser, verify:
- Crystal shape is visible and rotates
- Ground plane renders below
- Camera orbit works via mouse drag
- Basic lighting + Fresnel on crystal surface

**Step 4: Commit**

```bash
git add src/shaders/caustics-crystal/image.glsl
git commit -m "feat(caustics-crystal): ray-marched crystal SDF with ground plane and camera"
```

---

### Task 4: Tune the crystal SDF

**Files:**
- Modify: `src/shaders/caustics-crystal/image.glsl`

The initial SDF is a starting point. This task is for iterating on the crystal shape until it looks like a convincing gemstone. Things to tune:

1. **Crown and pavilion angles** — adjust `CROWN_ANGLE` and `PAVILION_ANGLE` until the silhouette reads as a gem, not a generic cone
2. **Table size** — adjust `TABLE_Y` for a realistic flat top
3. **Girdle proportions** — ensure the widest point looks right
4. **Scale** — adjust `CRYSTAL_SCALE` so it fills the frame nicely
5. **Position** — tweak `CRYSTAL_POS.y` so it floats naturally above the ground

If the capped-cone intersection SDF doesn't produce clean facets, consider switching to an octahedron SDF (`max(abs(p.x) + abs(p.y) + abs(p.z) - r, ...)`) which gives a more faceted look with less math.

**Commit after tuning:**

```bash
git add src/shaders/caustics-crystal/image.glsl
git commit -m "tune(caustics-crystal): refine crystal SDF geometry and proportions"
```

---

### Task 5: Tune caustics and dispersion

**Files:**
- Modify: `src/shaders/caustics-crystal/image.glsl`

Iterate on the caustic rendering until the prismatic rainbow patterns look convincing on the ground plane.

1. **IOR spread** — adjust `IOR_R`, `IOR_G`, `IOR_B` to control rainbow width. Wider spread = more color separation. Real glass is ~1.52–1.54; exaggerate to ~1.50–1.56 for artistic effect.
2. **Caustic brightness** — tune `CAUSTIC_BRIGHT` so caustics are visible but not blown out
3. **Caustic sampling** — the `crystalCaustic()` function may need refinement. If the initial approach (single refraction at bounding sphere) produces weak results, consider:
   - Multiple sample points along the crystal surface
   - A screen-space accumulation approach (march rays from crystal downward to ground)
4. **Ambient shimmer** — tune `SHIMMER_STR` so it adds subtle life without overpowering the prismatic caustics
5. **Ground material** — ensure `GROUND_COL` is dark enough to let colors pop

**Commit after tuning:**

```bash
git add src/shaders/caustics-crystal/image.glsl
git commit -m "tune(caustics-crystal): refine prismatic caustics and chromatic dispersion"
```

---

### Task 6: Polish and screenshot

**Files:**
- Modify: `src/shaders/caustics-crystal/image.glsl` (final polish)
- Create: `src/shaders/caustics-crystal/screenshot.webp`

1. **Final visual polish:**
   - Add soft shadow from crystal onto ground plane (simple: darken ground where crystal SDF is close)
   - Subtle edge glow on crystal silhouette (rim lighting)
   - Vignette if it helps the composition
   - Ensure gamma correction looks right

2. **Screenshot:** capture a representative frame and save as `screenshot.webp`

3. **Final lint + build:**

```bash
npm run lint:shaders && npm run build
```

Expected: PASS

**Step 4: Commit**

```bash
git add src/shaders/caustics-crystal/
git commit -m "feat(caustics-crystal): final polish, shadow, screenshot"
```
