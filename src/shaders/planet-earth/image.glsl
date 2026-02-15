/**
 * Earth-like Planet
 * @author guinetik
 * @date 2025-11-27
 *
 * Procedural Earth-like world with oceans, forests, deserts, ice caps, clouds,
 * and atmospheric scattering. All terrain is generated from inline hash-based
 * noise with no texture dependencies.
 *
 * Based on the atmospheric study shader from the exoplanets project.
 * Original texture-based noise replaced with hash-based procedural noise.
 *
 * Rendering layers (front to back):
 *   1. Surface — terrain heightmap drives biome selection (water/tropics/forest/desert/ice)
 *   2. Clouds  — separate FBM layer with independent drift speed
 *   3. Atmosphere — Fresnel-like rim glow simulating Rayleigh scattering
 *   4. Halo   — off-sphere atmospheric glow for the background
 *
 * TECHNIQUE: Analytic unit-sphere projection. The planet is rendered as a unit
 * sphere centered at the origin. For each pixel, z is derived from the
 * Pythagorean identity (x^2 + y^2 + z^2 = 1), giving both the 3D position and
 * the surface normal in a single step — no raymarching needed.
 *
 * TECHNIQUE: Finite-difference normal mapping. Land normals are computed by
 * sampling the heightmap at two offset points along the tangent and binormal
 * directions, then reconstructing the perturbed normal for diffuse/specular
 * lighting.
 *
 * Noise: Hash-based 3D value noise (fract-sin family) chosen for speed and
 * simplicity. Produces smooth, non-directional terrain suitable for planetary
 * surfaces. 6-octave FBM provides multi-scale detail from continental shapes
 * down to small terrain features.
 */

// =============================================================================
// INLINE NOISE (replaces iChannel0 texture lookups)
// =============================================================================
// Noise: Hash-based value noise using the fract(sin(x)*43758.5453) family.
// Fast and simple, produces smooth non-directional noise suitable for terrain.

float hashN(float n) { return fract(sin(n) * 43758.5453123); }

float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// 2D value noise — Hermite smoothstep interpolation (3t^2 - 2t^3) for C1 continuity
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

// 3D value noise (replaces the texture-based ValueNoise)
float ValueNoise(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// FBM for terrain height & clouds — 6 octaves, lacunarity ~2.77, gain ~1/2.1
// Higher octave count = more fine detail on terrain. The pos offset (0.23, 0.77, 0.57)
// and rotation (0.6 rad) between octaves decorrelate layers to avoid grid artifacts.
float Heightmap(vec3 pos) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    pos *= 1.5;                     // Base frequency — higher = smaller continents
    for (int i = 0; i < 6; i++) {
        height += scale * ValueNoise(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= 2.77;
        scale /= 2.1;
        pos.xy = Rotate(pos.xy, 0.6);
    }
    return height / total;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {

    // ── Biome color palette ──
    const vec3 ICE_COL = vec3(1.0, 1.0, 1.0);          // Polar ice caps and snow peaks
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0)); // Sun direction (upper-right)
    const float HEIGHT_SCALE = 0.09;                    // Normal perturbation strength — higher = sharper terrain relief

    vec3 ATMOS_COL = vec3(0.37, 0.71, 0.95);           // Atmosphere tint — Rayleigh-like blue
    vec3 WATER_COL = vec3(0.17, 0.32, 0.52) * 0.8;     // Deep ocean blue
    vec3 TROPICS_COL = vec3(0.0, 1.0, 1.0) * 0.75;     // Shallow tropical water — cyan-teal
    vec3 FOREST_COL = vec3(0.15, 0.58, 0.22);           // Temperate forest green
    vec3 DESERT_COL = vec3(0.8, 0.58, 0.52);            // Arid desert tan

    float WATER_LEVEL = 0.48;                           // FBM threshold for ocean — lower = more water, higher = more land

    // Map window roughly to -1..1, planet has r=1
    vec2 uv = 1.1 * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    // Derive Z pythagorean-ly; if on the sphere...
    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {

        // Unit sphere, so pos = normal
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Terrain height — rotate noise space for planetary spin
        vec3 noiseNormal = pos;
        float surfaceRot = -0.1 * iTime;               // Rotation speed — negative = eastward spin
        noiseNormal.xz = Rotate(noiseNormal.xz, surfaceRot);
        vec3 noisePos = noiseNormal + vec3(0.0, 0.0, 0.025 * iTime);
        float height = Heightmap(noisePos);

        // Tropics amount
        vec3 tropicsCol = mix(WATER_COL, TROPICS_COL, ValueNoise(3.0 * noisePos));

        // If water...
        vec3 surfaceColor;
        float specAmount = 0.1;
        if (height < WATER_LEVEL) {
            surfaceColor = mix(WATER_COL, tropicsCol, pow(height / WATER_LEVEL, 16.0));
            vec3 wavesPos = pos;
            wavesPos.xz = Rotate(wavesPos.xz, 1.4);
            normal = normalize(normal + 0.08 * ValueNoise(256.0 * (wavesPos + 0.04 * vec3(iTime))));
            specAmount = 0.55;
        }
        // Otherwise if land...
        else {

            // Find a tangent and binormal basis to use
            vec3 tangent = cross(noiseNormal, vec3(0.0, 1.0, 0.0));
            vec3 binormal = cross(noiseNormal, tangent);

            // Get surface normal via finite difference, rotate back into view space
            const float DX = 0.01;
            float scaledHeight = height * HEIGHT_SCALE;
            float tangentWeight = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * tangent)) / DX;
            float binormalWeight = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * binormal)) / DX;
            vec3 landNormal = normalize(
                noiseNormal +
                tangent * tangentWeight +
                binormal * binormalWeight
            );
            landNormal.xz = Rotate(landNormal.xz, -surfaceRot);
            normal = landNormal;

            // Choose color
            vec3 landColor = mix(DESERT_COL, FOREST_COL,
                clamp(2.0 * ValueNoise(2.0 * noisePos) - 0.8, 0.0, 1.0));
            landColor = mix(landColor, ICE_COL, smoothstep(0.7, 1.0, abs(pos.y)));
            float waterBlend = smoothstep(0.0, 0.01, height - WATER_LEVEL);
            specAmount = 0.55 * (1.0 - waterBlend);
            landColor = mix(tropicsCol, landColor, waterBlend);
            surfaceColor = mix(landColor, ICE_COL,
                smoothstep(WATER_LEVEL + 0.1, WATER_LEVEL + 0.2, height));
        }

        // Surface lighting — Blinn-Phong model with warm-tinted specular
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);  // 0.05 ambient floor
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0)); // Half-vector (view is +Z)
        float specular = specAmount * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 15.0); // Exponent 15 = moderate gloss
        fragColor.rgb = diffuse * surfaceColor + vec3(1.0, 0.92, 0.81) * specular; // Warm sun-tinted highlight

        // Clouds — separate noise layer with independent drift
        vec3 cloudPos = vec3(2.0, 6.0, 2.0) * noisePos + 0.07 * iTime;  // Anisotropic scale stretches clouds latitudinally
        cloudPos.xz = Rotate(cloudPos.xz, 0.007 * iTime);               // Slow jet-stream drift
        cloudPos.xy = Rotate(cloudPos.xy, 0.3);                          // Tilt cloud patterns off-axis
        float cloudMin = 0.35;                                            // FBM threshold for cloud formation
        float cloudAmt = 0.75 * smoothstep(cloudMin, 0.7, Heightmap(cloudPos)); // Max 75% opacity
        fragColor.rgb = mix(fragColor.rgb, vec3(pow(diffuse, 0.9)), cloudAmt);  // Clouds lit by diffuse, slight gamma lift

        // TECHNIQUE: Fresnel-like atmospheric rim glow simulating Rayleigh scattering
        // Atmosphere blue intensifies at the limb where the optical path through
        // the atmosphere is longest, approximated by pow(1 - z, 1.2).
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv))); // Edge antialias
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol;  // Rim glow — exponent 1.2 controls falloff width
    }
    // If off the sphere...
    else {

        // Add atmospheric halo, mild BG gradient
        vec3 skyCol = vec3(0.15, 0.2, 0.25) * abs(uv.y);
        vec3 pos = normalize(vec3(uv, 1.0));
        fragColor.rgb = mix(ATMOS_COL, skyCol, smoothstep(0.95, 1.06, length(uv))) *
            1.5 * clamp(dot(pos, normalize(vec3(0.5, 1.0, 1.0))), 0.0, 1.0);
    }

    fragColor.a = 1.0;
}
