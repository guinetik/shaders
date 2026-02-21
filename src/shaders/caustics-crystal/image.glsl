/**
 * Caustic Study #03: Crystal
 * @author guinetik
 * @date 2026-02-18
 *
 * Ray-marched faceted crystal (octahedron-based diamond SDF) hovering above
 * a dark ground plane. Light refracts through the gemstone's facets with
 * chromatic dispersion (separate UV offset per R/G/B channel), projecting
 * prismatic rainbow caustics on the ground.
 *
 * TECHNIQUE: Modified octahedron SDF
 * The octahedron's L1-norm distance gives natural faceted edges.
 * Y-stretch elongates into a diamond profile; max() with a plane
 * clips a flat table facet on top, mimicking a brilliant cut.
 *
 * TECHNIQUE: Prismatic caustics via chromatic causticWarp
 * Instead of expensive per-pixel ray tracing, we sample the causticWarp()
 * pattern at three chromatically offset UV positions (one per R/G/B channel).
 * The UV offsets rotate with the crystal, creating shifting rainbow patterns.
 * Brightness is modulated by the crystal's projected shadow footprint.
 *
 * TECHNIQUE: Refract-through via analytical ground intersection
 * Instead of unreliable interior SDF marching, refract the view ray
 * at the crystal entry surface and intersect the ground plane
 * analytically. This always works regardless of view angle or
 * crystal shape complexity.
 */

// === CRYSTAL GEOMETRY ===
#define CRYSTAL_POS     vec3(0.0, 0.5, 0.0)   // Hover center — raise to widen caustic spread on ground
#define CRYSTAL_SIZE    0.5                     // Octahedron half-extent — controls gem width
#define CRYSTAL_STRETCH 1.6                     // Y-axis stretch — >1 = taller diamond, <1 = pancake
#define TABLE_CUT       0.28                    // Y-height for flat table facet — lower = larger flat top
#define ROTATE_SPEED    0.25                    // Auto-rotation rad/s around Y — 0 disables

// === RAY MARCHING ===
#define MAX_STEPS       100                     // March iterations — 100 sufficient for simple scene
#define SURF_EPSILON    0.0005                  // Surface hit threshold — tight for sharp facet edges
#define MAX_DIST        30.0                    // Maximum ray travel distance
#define NORMAL_EPS      0.0005                  // Central-difference offset for normals
#define STEP_BIAS       0.01                    // Offset to step past surface when entering/exiting crystal

// === GROUND PLANE ===
#define GROUND_Y       -0.6                     // Ground plane Y — distance below crystal affects caustic scale
#define GROUND_COL     vec3(0.12, 0.11, 0.13)   // Medium-dark stone — visible but doesn't compete with caustics
#define GROUND_SPEC    24.0                     // Specular exponent for ground highlights
#define GROUND_SPEC_COL vec3(0.12)              // Specular highlight color

// === LIGHTING ===
#define LIGHT_DIR       normalize(vec3(0.5, 1.0, 0.3))  // Directional light from above-right
#define LIGHT_COL       vec3(1.0, 0.97, 0.92)            // Warm white light color
#define AMBIENT         0.2                               // Ambient illumination — enough to see the ground

// === CRYSTAL MATERIAL ===
#define IOR_BASE        1.54                    // Index of refraction — quartz = 1.54
#define FRESNEL_POWER   5.0                     // Schlick exponent — higher = more edge reflection
#define FRESNEL_MIN     0.04                    // Reflectance at normal incidence (clear quartz is low)
#define FRESNEL_MAX     0.85                    // Reflectance at grazing angle
#define ABSORB_TINT     vec3(0.98, 0.98, 1.0)  // Near-white — clear quartz, very slight cool tint
#define ABSORB_DENSITY  0.1                     // Very low absorption — nearly transparent
#define SPEC_POWER      80.0                    // Specular exponent — high = tiny bright highlights
#define SPEC_BRIGHT     2.5                     // Specular intensity multiplier

// === PRISMATIC CAUSTICS ===
#define CAUSTIC_FOOTPRINT 0.8                   // Radius of caustic pattern — tight focus under crystal
#define CAUSTIC_BRIGHT  1.5                     // Caustic brightness — visible against brighter ground
#define CAUSTIC_SCALE_A 1.8                     // UV scale for primary caustic layer — lower = larger pattern
#define CAUSTIC_SCALE_B 1.2                     // UV scale for secondary caustic layer (parallax)
#define CAUSTIC_SPEED   0.4                     // Time multiplier for caustic animation
#define CAUSTIC_OFFSET  23.0                    // Time offset — decorrelates from t=0 boring state
#define CAUSTIC_ITERS   5                       // Warp iterations — 5 = crisp convergence lines
#define CAUSTIC_INTEN   0.005                   // Inverse-distance sensitivity
#define CAUSTIC_BASE    1.17                    // Brightness curve offset
#define CAUSTIC_POWER   1.4                     // Brightness curve exponent
#define CAUSTIC_SHARP   8.0                     // Final power — higher = thinner brighter lines
#define CHROMA_SPREAD   0.25                    // Chromatic UV offset between R/G/B — higher = wider rainbow
#define CAUSTIC_MIX_B   0.35                    // Blend weight of secondary caustic layer

// === AMBIENT SHIMMER ===
#define SHIMMER_SCALE   1.0                     // UV scale for background shimmer
#define SHIMMER_SPEED   0.25                    // Shimmer animation speed
#define SHIMMER_OFFSET  11.0                    // Decorrelation offset from main caustics
#define SHIMMER_STR     0.02                    // Very subtle background life — too high = noisy ground

// === CAMERA ===
#define CAM_DIST        3.0                     // Orbital distance — closer for more detail
#define CAM_HEIGHT      1.9                     // Base camera height
#define CAM_TARGET      vec3(0.0, 0.1, 0.0)    // Look slightly above ground center
#define CAM_FOV         1.8                     // Focal length inverse — lower = more telephoto

// === BACKGROUND ===
#define SKY_COL         vec3(0.05, 0.05, 0.08)  // Dark blue-gray sky — visible but moody
#define INV_SQRT3       0.57735027               // 1/sqrt(3) — octahedron normalization

// -------------------------------------------------------
// Crystal SDF — octahedron stretched into diamond
// -------------------------------------------------------
float sdOctahedron(vec3 p, float s)
{
    p = abs(p);
    return (p.x + p.y + p.z - s) * INV_SQRT3;
}

float sdCrystal(vec3 p)
{
    vec3 q = p;
    q.y /= CRYSTAL_STRETCH;
    float d = sdOctahedron(q, CRYSTAL_SIZE);
    // Flat table facet on top
    d = max(d, p.y - TABLE_CUT);
    return d;
}

// -------------------------------------------------------
// Rotation
// -------------------------------------------------------
mat3 rotateY(float a)
{
    float c = cos(a);
    float s = sin(a);
    return mat3(c, 0.0, s,  0.0, 1.0, 0.0,  -s, 0.0, c);
}

// -------------------------------------------------------
// Crystal in world space (used by both full scene and crystal-only maps)
// -------------------------------------------------------
float crystalWorld(vec3 p, float rotAngle)
{
    vec3 cp = p - CRYSTAL_POS;
    cp = rotateY(-rotAngle) * cp;
    return sdCrystal(cp);
}

// -------------------------------------------------------
// Full scene map — crystal + ground
// -------------------------------------------------------
float map(vec3 p, float rotAngle)
{
    float dGround = p.y - GROUND_Y;
    float dCrystal = crystalWorld(p, rotAngle);
    return min(dGround, dCrystal);
}

// Scene map with material ID (0=ground, 1=crystal)
float mapID(vec3 p, float rotAngle, out int matID)
{
    float dGround = p.y - GROUND_Y;
    float dCrystal = crystalWorld(p, rotAngle);
    if (dCrystal < dGround) { matID = 1; return dCrystal; }
    else                    { matID = 0; return dGround; }
}

// -------------------------------------------------------
// Normals
// -------------------------------------------------------
vec3 calcNormal(vec3 p, float rotAngle)
{
    vec2 e = vec2(NORMAL_EPS, 0.0);
    return normalize(vec3(
        map(p + e.xyy, rotAngle) - map(p - e.xyy, rotAngle),
        map(p + e.yxy, rotAngle) - map(p - e.yxy, rotAngle),
        map(p + e.yyx, rotAngle) - map(p - e.yyx, rotAngle)
    ));
}

// -------------------------------------------------------
// Ray march — full scene
// -------------------------------------------------------
float march(vec3 ro, vec3 rd, float rotAngle)
{
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++)
    {
        float d = map(ro + rd * t, rotAngle);
        if (d < SURF_EPSILON) return t;
        if (t > MAX_DIST) break;
        t += d;
    }
    return -1.0;
}

// -------------------------------------------------------
// Fresnel (Schlick)
// -------------------------------------------------------
float fresnelSchlick(vec3 rd, vec3 n)
{
    float cosTheta = abs(dot(rd, n));
    float f = pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
    return mix(FRESNEL_MIN, FRESNEL_MAX, f);
}

// -------------------------------------------------------
// Single caustic layer with chromatic offsets
//
// TECHNIQUE: Chromatic causticWarp sampling
// Sample causticWarp at 3 UV positions offset in the direction
// determined by crystal rotation. The UV shift per channel
// simulates how different wavelengths refract at different
// angles through the crystal, creating rainbow separation.
// -------------------------------------------------------
float causticLayer(vec2 uv, float scale, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c = causticWarp(uv, scale, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_SHARP);
}

vec3 prismaticCaustic(vec3 groundPos, float rotAngle, float t)
{
    // Project crystal position onto ground — caustic center
    vec2 center = CRYSTAL_POS.xz;
    vec2 gxz = groundPos.xz;

    // Soft circular footprint — fades at edges
    float dist = length(gxz - center);
    float footprint = 1.0 - smoothstep(0.0, CAUSTIC_FOOTPRINT, dist);
    if (footprint < 0.01) return vec3(0.0);

    // Chromatic UV offset direction rotates with crystal
    vec2 chromaDir = vec2(cos(rotAngle), sin(rotAngle));
    vec2 baseUV = gxz;

    // Sample caustic pattern at chromatically offset UVs
    // Red refracts least, blue refracts most
    vec2 uvR = baseUV - chromaDir * CHROMA_SPREAD;
    vec2 uvG = baseUV;
    vec2 uvB = baseUV + chromaDir * CHROMA_SPREAD;

    // Primary layer
    float cR = causticLayer(uvR, CAUSTIC_SCALE_A, t);
    float cG = causticLayer(uvG, CAUSTIC_SCALE_A, t);
    float cB = causticLayer(uvB, CAUSTIC_SCALE_A, t);

    // Secondary layer at different scale for depth
    float cR2 = causticLayer(uvR, CAUSTIC_SCALE_B, t + 5.0);
    float cG2 = causticLayer(uvG, CAUSTIC_SCALE_B, t + 5.0);
    float cB2 = causticLayer(uvB, CAUSTIC_SCALE_B, t + 5.0);

    vec3 c1 = vec3(cR, cG, cB);
    vec3 c2 = vec3(cR2, cG2, cB2);
    vec3 caustic = c1 + c2 * CAUSTIC_MIX_B;

    // Brighten toward center, fade at edges
    float centerBright = smoothstep(CAUSTIC_FOOTPRINT, 0.0, dist * 0.8);

    return caustic * footprint * centerBright * CAUSTIC_BRIGHT;
}

// -------------------------------------------------------
// Ambient shimmer — very subtle background caustic wash
// -------------------------------------------------------
float ambientShimmer(vec2 uv, float t)
{
    float time = t * SHIMMER_SPEED + SHIMMER_OFFSET;
    float c = causticWarp(uv, SHIMMER_SCALE, time, 3, CAUSTIC_INTEN);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_SHARP) * SHIMMER_STR;
}

// -------------------------------------------------------
// Soft shadow — approximate crystal shadow on ground
// March from ground point toward light, check if crystal blocks
// -------------------------------------------------------
float softShadow(vec3 p, float rotAngle)
{
    vec3 rd = LIGHT_DIR;
    float shade = 1.0;
    float t = STEP_BIAS;
    for (int i = 0; i < 32; i++)
    {
        float d = crystalWorld(p + rd * t, rotAngle);
        if (d < SURF_EPSILON) return 0.15;
        shade = min(shade, 8.0 * d / t);
        t += clamp(d, 0.01, 0.2);
        if (t > 3.0) break;
    }
    return clamp(shade, 0.15, 1.0);
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
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    float rotAngle = t * ROTATE_SPEED;

    vec3 col = SKY_COL;

    float hitT = march(ro, rd, rotAngle);

    if (hitT > 0.0)
    {
        vec3 hitPos = ro + rd * hitT;
        int matID;
        mapID(hitPos, rotAngle, matID);
        vec3 n = calcNormal(hitPos, rotAngle);

        if (matID == 1)
        {
            // === CRYSTAL (clear quartz) ===
            // TECHNIQUE: Refract-through via analytical ground intersection
            // Instead of unreliable interior SDF marching, refract the view
            // ray at entry and intersect the ground plane analytically.
            // This always works regardless of crystal shape or view angle.

            float fres = fresnelSchlick(rd, n);

            // --- Reflection ---
            vec3 reflDir = reflect(rd, n);
            vec3 reflCol = SKY_COL + LIGHT_COL * max(reflDir.y, 0.0) * 0.2;

            // Specular highlight — bright point light on facets
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), SPEC_POWER);
            reflCol += LIGHT_COL * spec * SPEC_BRIGHT;

            // --- Refraction (see-through) ---
            // TECHNIQUE: Project-down with refraction offset
            // Project the crystal hit point straight down to the ground plane,
            // then offset by the refraction displacement. This always works
            // regardless of camera angle — top, front, side, any pitch.
            vec3 refrDir = refract(rd, n, 1.0 / IOR_BASE);
            if (length(refrDir) < 0.001) refrDir = rd; // TIR fallback

            // Project hit point down to ground, offset by refraction
            vec2 groundUV = hitPos.xz + (refrDir.xz - rd.xz) * (hitPos.y - GROUND_Y);
            vec3 groundHit = vec3(groundUV.x, GROUND_Y, groundUV.y);

            float diff = max(dot(vec3(0.0, 1.0, 0.0), LIGHT_DIR), 0.0);
            vec3 refrCol = GROUND_COL * (AMBIENT + diff * 0.5);
            refrCol += prismaticCaustic(groundHit, rotAngle, t);
            refrCol += ambientShimmer(groundHit.xz, t) * 0.3;

            // Subtle tint based on view angle (thicker path = more tint)
            float NdotV = abs(dot(n, -rd));
            vec3 absorption = mix(ABSORB_TINT, vec3(1.0), NdotV);
            refrCol *= absorption;

            col = mix(refrCol, reflCol, fres);

            // Rim light — subtle white edge glow on silhouette
            float rim = 1.0 - NdotV;
            col += LIGHT_COL * pow(max(rim, 0.0), 3.0) * 0.1;

            // Facet edge highlight — makes edges sparkle
            float edgeCatch = pow(max(dot(n, LIGHT_DIR), 0.0), 2.0);
            col += LIGHT_COL * edgeCatch * 0.15;
        }
        else
        {
            // === GROUND ===
            float diff = max(dot(n, LIGHT_DIR), 0.0);
            float shadow = softShadow(hitPos, rotAngle);
            col = GROUND_COL * (AMBIENT + diff * 0.4 * shadow);

            // Specular
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), GROUND_SPEC);
            col += GROUND_SPEC_COL * spec * shadow;

            // Prismatic caustics
            col += prismaticCaustic(hitPos, rotAngle, t);

            // Very subtle ambient shimmer
            col += ambientShimmer(hitPos.xz, t) * 0.5;
        }
    }

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
