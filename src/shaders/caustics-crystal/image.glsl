/**
 * Caustic Study #03: Crystal
 * @author guinetik
 * @date 2026-02-18
 *
 * Ray-marched faceted crystal (octahedron-based diamond SDF) hovering above
 * a dark ground plane. Light refracts through the gemstone's facets with
 * chromatic dispersion (separate IOR per R/G/B channel), projecting prismatic
 * caustic rainbows on the ground.
 *
 * Key techniques:
 * - Modified octahedron SDF with Y-stretch + table-facet clipping for gem shape
 * - Single-bounce Fresnel reflection/refraction with absorption tint
 * - Per-channel refraction at different IOR values for chromatic dispersion
 * - intersectSphere() bounding test for efficient caustic ray filtering
 * - causticWarp() ambient shimmer ties visually to other caustic studies
 */

// === CRYSTAL GEOMETRY ===
#define CRYSTAL_POS     vec3(0.0, 0.6, 0.0)  // Hover height above ground — raise to increase caustic spread
#define CRYSTAL_SIZE    0.55                   // Octahedron half-extent — base gem radius
#define CRYSTAL_STRETCH 1.4                    // Y-axis stretch — >1 makes taller diamond, <1 pancake
#define TABLE_CUT       0.35                   // Height above center to clip flat table facet (0=half, size=none)
#define ROTATE_SPEED    0.3                    // Auto-rotation radians/sec — 0 disables

// === CRYSTAL BOUNDING ===
#define CRYSTAL_BOUND_R 0.9                    // Bounding sphere radius for caustic ray test — must enclose gem

// === RAY MARCHING ===
#define MAX_STEPS       128                    // March iterations — higher = more detail, more cost
#define SURF_EPSILON    0.001                  // Surface hit threshold — smaller = sharper edges
#define MAX_DIST        50.0                   // Maximum ray travel — beyond this is background
#define NORMAL_EPS      0.001                  // Central-difference offset for normal estimation

// === GROUND PLANE ===
#define GROUND_Y        -0.5                   // Ground plane Y position
#define GROUND_COL      vec3(0.04, 0.035, 0.05) // Dark stone base — subtle purple undertone
#define GROUND_SPEC     32.0                   // Specular exponent for ground highlights

// === LIGHTING ===
#define LIGHT_DIR       normalize(vec3(0.6, 0.9, 0.4))  // Directional light — elevation affects caustic angle
#define AMBIENT         0.08                   // Minimum ambient illumination
#define DIFFUSE_STR     0.5                    // Diffuse lighting strength on ground

// === CRYSTAL MATERIAL ===
#define IOR_BASE        1.52                   // Base index of refraction (glass-like, diamond=2.42)
#define FRESNEL_POWER   5.0                    // Schlick Fresnel exponent — higher = more reflection at grazing
#define FRESNEL_MIN     0.04                   // Fresnel reflectance at normal incidence
#define FRESNEL_MAX     1.0                    // Fresnel reflectance at grazing angle
#define ABSORB_TINT     vec3(0.7, 0.5, 0.85)  // Internal absorption color — amethyst purple
#define ABSORB_DENSITY  1.2                    // Absorption strength — higher = more colored
#define SPEC_POWER      64.0                   // Crystal specular exponent — high = tight highlights
#define SPEC_BRIGHT     1.5                    // Crystal specular brightness multiplier

// === PRISMATIC CAUSTICS ===
#define IOR_R           1.50                   // Red channel IOR — lower IOR = less bend
#define IOR_G           1.52                   // Green channel IOR — middle
#define IOR_B           1.56                   // Blue channel IOR — higher IOR = more bend (chromatic spread)
#define CAUSTIC_RADIUS  3.0                    // Max ground distance from crystal to compute caustics — early exit beyond
#define CAUSTIC_BRIGHT  2.5                    // Prismatic caustic brightness multiplier
#define CAUSTIC_FOCUS   4.0                    // Convergence sharpness — higher = tighter bright spots

// === AMBIENT SHIMMER (causticWarp from commons) ===
#define SHIMMER_SCALE   1.2                    // UV scale for ambient shimmer pattern
#define SHIMMER_SPEED   0.3                    // Animation speed multiplier
#define SHIMMER_OFFSET  17.0                   // Time offset to decorrelate from main caustics
#define SHIMMER_ITERS   4                      // Warp iterations (3=soft, 5=crisp)
#define SHIMMER_INTEN   0.005                  // Inverse-distance sensitivity
#define SHIMMER_BASE    1.17                   // Brightness curve base
#define SHIMMER_POWER   1.4                    // Brightness curve exponent
#define SHIMMER_BRIGHT  6.0                    // Final power curve
#define SHIMMER_STR     0.06                   // Overall shimmer strength — subtle complement to prismatic caustics

// === CAMERA ===
#define CAM_DIST        4.0                    // Orbital distance from target
#define CAM_HEIGHT      2.5                    // Base camera height
#define CAM_TARGET      vec3(0.0, 0.0, 0.0)   // Look-at target
#define CAM_FOV         1.8                    // Field of view (focal length inverse)

// === BACKGROUND ===
#define SKY_COL         vec3(0.02, 0.02, 0.04) // Dark ambient sky
#define REFL_SKY_TINT   vec3(0.05, 0.08, 0.15) // Sky tint added to reflections based on up-facing angle
#define EXIT_SKY_TINT   vec3(0.02, 0.04, 0.08) // Sky tint for refracted exit rays
#define SHIMMER_TINT    vec3(0.3, 0.5, 0.6)    // Cool blue tint for ambient shimmer highlights
#define GROUND_SPEC_COL vec3(0.15)              // Ground specular highlight color
#define STEP_OFFSET     3.0                     // Surface offset multiplier for entering/exiting crystal body
#define TIR_FLASH       0.3                     // Internal flash brightness on total internal reflection
#define DIFFUSE_WRAP    0.05                     // Subtle body diffuse wrap strength on crystal
#define INV_SQRT3       0.57735027              // 1/sqrt(3) — octahedron normalization factor

// -------------------------------------------------------
// Crystal SDF — octahedron stretched into diamond shape
// -------------------------------------------------------

// TECHNIQUE: Octahedron SDF with axis stretch + table clipping
// The octahedron's L1-norm distance gives natural faceted edges.
// Y-stretch elongates into a diamond profile; max() with a plane
// clips a flat table facet on top, mimicking a brilliant cut.
float sdOctahedron(vec3 p, float s)
{
    p = abs(p);
    return (p.x + p.y + p.z - s) * INV_SQRT3;
}

float sdCrystal(vec3 p)
{
    // Stretch Y for taller diamond proportions
    vec3 q = p;
    q.y /= CRYSTAL_STRETCH;

    float d = sdOctahedron(q, CRYSTAL_SIZE);

    // Clip flat table facet at top
    float tablePlane = p.y - TABLE_CUT;
    d = max(d, tablePlane);

    return d;
}

// -------------------------------------------------------
// Y-axis rotation matrix
// -------------------------------------------------------
mat3 rotateY(float a)
{
    float c = cos(a);
    float s = sin(a);
    return mat3(c, 0.0, s,
                0.0, 1.0, 0.0,
               -s, 0.0, c);
}

// -------------------------------------------------------
// Scene map — ground plane + crystal
// -------------------------------------------------------
float map(vec3 p, float rotAngle)
{
    // Ground plane
    float dGround = p.y - GROUND_Y;

    // Crystal: translate to position, apply rotation
    vec3 cp = p - CRYSTAL_POS;
    cp = rotateY(-rotAngle) * cp;
    float dCrystal = sdCrystal(cp);

    return min(dGround, dCrystal);
}

// -------------------------------------------------------
// Scene map with material ID
// -------------------------------------------------------
float mapID(vec3 p, float rotAngle, out int matID)
{
    float dGround = p.y - GROUND_Y;

    vec3 cp = p - CRYSTAL_POS;
    cp = rotateY(-rotAngle) * cp;
    float dCrystal = sdCrystal(cp);

    if (dCrystal < dGround)
    {
        matID = 1;
        return dCrystal;
    }
    else
    {
        matID = 0;
        return dGround;
    }
}

// -------------------------------------------------------
// Surface normal via central differences
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
// Ray march
// -------------------------------------------------------
float march(vec3 ro, vec3 rd, float rotAngle)
{
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++)
    {
        vec3 p = ro + rd * t;
        float d = map(p, rotAngle);
        if (d < SURF_EPSILON) return t;
        if (t > MAX_DIST) break;
        t += d;
    }
    return -1.0;
}

// -------------------------------------------------------
// Schlick Fresnel
// -------------------------------------------------------
float fresnelSchlick(vec3 rd, vec3 n)
{
    float cosTheta = abs(dot(rd, n));
    float f = pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
    return mix(FRESNEL_MIN, FRESNEL_MAX, f);
}

// -------------------------------------------------------
// Prismatic caustics on ground
// -------------------------------------------------------

// TECHNIQUE: Per-channel refraction for chromatic dispersion
// Trace a shadow ray from the ground point toward the light.
// If it hits the crystal's bounding sphere, compute the surface
// normal at entry and refract for R, G, B at three different IOR
// values. The angular spread between refracted rays creates the
// prismatic rainbow pattern.
vec3 crystalCaustic(vec3 groundPos, float rotAngle)
{
    // Early exit: only compute within radius of crystal projection
    vec2 offset = groundPos.xz - CRYSTAL_POS.xz;
    float dist2 = dot(offset, offset);
    if (dist2 > CAUSTIC_RADIUS * CAUSTIC_RADIUS) return vec3(0.0);

    // Trace ray from ground point toward light source
    vec3 ro = groundPos;
    vec3 rd = LIGHT_DIR;

    // Check if this ray hits the crystal bounding sphere
    float tSphere = intersectSphere(ro, rd, CRYSTAL_POS, CRYSTAL_BOUND_R);
    if (tSphere < 0.0) return vec3(0.0);

    // Get hit point on bounding sphere, then refine with SDF normal
    vec3 hitPoint = ro + rd * tSphere;
    vec3 cp = hitPoint - CRYSTAL_POS;
    cp = rotateY(-rotAngle) * cp;

    // Compute crystal surface normal at this point
    vec3 n = calcNormal(hitPoint, rotAngle);

    // Refract for each color channel at different IOR
    vec3 refR = refract(-rd, n, 1.0 / IOR_R);
    vec3 refG = refract(-rd, n, 1.0 / IOR_G);
    vec3 refB = refract(-rd, n, 1.0 / IOR_B);

    // Total internal reflection check — refract returns vec3(0) on TIR
    float validR = step(0.001, length(refR));
    float validG = step(0.001, length(refG));
    float validB = step(0.001, length(refB));

    // Measure angular convergence — how much the refracted rays
    // converge toward this ground point. Use dot product between
    // refracted direction and the vector from hit to ground.
    vec3 toGround = normalize(groundPos - hitPoint);

    float convergenceR = pow(max(dot(refR, toGround), 0.0), CAUSTIC_FOCUS) * validR;
    float convergenceG = pow(max(dot(refG, toGround), 0.0), CAUSTIC_FOCUS) * validG;
    float convergenceB = pow(max(dot(refB, toGround), 0.0), CAUSTIC_FOCUS) * validB;

    // Distance falloff from crystal center
    float distFade = 1.0 - smoothstep(0.0, CAUSTIC_RADIUS, sqrt(dist2));

    return vec3(convergenceR, convergenceG, convergenceB) * CAUSTIC_BRIGHT * distFade;
}

// -------------------------------------------------------
// Ambient shimmer — causticWarp from commons
// Adds subtle animated caustic texture to the ground,
// tying this shader visually to the other caustic studies.
// -------------------------------------------------------
float ambientShimmer(vec2 uv, float t)
{
    float time = t * SHIMMER_SPEED + SHIMMER_OFFSET;
    float c = causticWarp(uv, SHIMMER_SCALE, time, SHIMMER_ITERS, SHIMMER_INTEN);
    c = SHIMMER_BASE - pow(max(c, 0.0), SHIMMER_POWER);
    return pow(abs(c), SHIMMER_BRIGHT) * SHIMMER_STR;
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
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    float t = iTime;

    // Camera angles from buffer-a (pixel 0,0) — has inertia/friction
    vec4 camState = texelFetch(iChannel0, ivec2(0, 0), 0);
    float yaw   = camState.x;
    float pitch = camState.y;

    // Spherical camera: pitch tilts elevation around the base height
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

    // Crystal auto-rotation
    float rotAngle = t * ROTATE_SPEED;

    vec3 col = SKY_COL;

    // Ray march the scene
    float hitT = march(ro, rd, rotAngle);

    if (hitT > 0.0)
    {
        vec3 hitPos = ro + rd * hitT;
        int matID;
        mapID(hitPos, rotAngle, matID);
        vec3 n = calcNormal(hitPos, rotAngle);

        if (matID == 1)
        {
            // === CRYSTAL MATERIAL ===

            // Fresnel blend
            float fres = fresnelSchlick(rd, n);

            // Reflection
            vec3 reflDir = reflect(rd, n);
            vec3 reflCol = SKY_COL + REFL_SKY_TINT * max(reflDir.y, 0.0);

            // Specular highlight from directional light
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), SPEC_POWER);
            reflCol += vec3(1.0) * spec * SPEC_BRIGHT;

            // Refraction: single bounce through crystal body
            vec3 refrDir = refract(rd, n, 1.0 / IOR_BASE);
            vec3 refrCol = SKY_COL;

            if (length(refrDir) > 0.001)
            {
                // March through the crystal interior — step inside slightly
                vec3 innerRo = hitPos - n * SURF_EPSILON * STEP_OFFSET;
                float innerT = march(innerRo, refrDir, rotAngle);

                if (innerT > 0.0)
                {
                    // Apply absorption based on path length through crystal
                    vec3 absorption = exp(-ABSORB_DENSITY * innerT * (1.0 - ABSORB_TINT));
                    vec3 exitPos = innerRo + refrDir * innerT;
                    vec3 exitN = -calcNormal(exitPos, rotAngle);

                    // Second refraction at exit surface
                    vec3 exitDir = refract(refrDir, exitN, IOR_BASE);
                    if (length(exitDir) > 0.001)
                    {
                        // March from exit to see what's behind
                        vec3 exitRo = exitPos + exitN * SURF_EPSILON * STEP_OFFSET;
                        float behindT = march(exitRo, exitDir, rotAngle);

                        if (behindT > 0.0)
                        {
                            vec3 behindPos = exitRo + exitDir * behindT;
                            int behindMat;
                            mapID(behindPos, rotAngle, behindMat);

                            if (behindMat == 0)
                            {
                                // Seeing the ground through the crystal
                                float diff = max(dot(vec3(0.0, 1.0, 0.0), LIGHT_DIR), 0.0);
                                refrCol = GROUND_COL * (AMBIENT + DIFFUSE_STR * diff);

                                // Add prismatic caustics visible through crystal
                                refrCol += crystalCaustic(behindPos, rotAngle);

                                // Add shimmer
                                refrCol += ambientShimmer(behindPos.xz, t) * SHIMMER_TINT;
                            }
                        }
                        else
                        {
                            // Exit ray hits sky
                            refrCol = SKY_COL + EXIT_SKY_TINT * max(exitDir.y, 0.0);
                        }
                    }
                    else
                    {
                        // Total internal reflection at exit — bright internal flash
                        refrCol = ABSORB_TINT * TIR_FLASH;
                    }

                    refrCol *= absorption;
                }
            }

            // Fresnel blend reflection + refraction
            col = mix(refrCol, reflCol, fres);

            // Diffuse wrap for subtle body lighting
            float diff = max(dot(n, LIGHT_DIR), 0.0);
            col += ABSORB_TINT * diff * DIFFUSE_WRAP;
        }
        else
        {
            // === GROUND PLANE ===
            float diff = max(dot(n, LIGHT_DIR), 0.0);
            col = GROUND_COL * (AMBIENT + DIFFUSE_STR * diff);

            // Specular highlight on ground
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), GROUND_SPEC);
            col += GROUND_SPEC_COL * spec;

            // Prismatic caustics from crystal refraction
            vec3 caustic = crystalCaustic(hitPos, rotAngle);
            col += caustic;

            // Ambient shimmer from causticWarp commons
            float shimmer = ambientShimmer(hitPos.xz, t);
            col += shimmer * SHIMMER_TINT;
        }
    }

    // Gamma correction — final step, linear → sRGB
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
