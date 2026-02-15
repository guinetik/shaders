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
 *
 * Commons: sphere, noise-value, normal-map, lighting, atmosphere
 */

// FBM for terrain height & clouds — wraps the commons fbmValue with
// Earth-specific parameters: 6 octaves, lacunarity 2.77, gain ~1/2.1
// Base frequency 1.5 controls continent size — higher = smaller continents
float Heightmap(vec3 pos) {
    return fbmValue(pos * 1.5, 6, 2.77, 1.0 / 2.1);
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

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
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

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
        vec3 tropicsCol = mix(WATER_COL, TROPICS_COL, valueNoise3D(3.0 * noisePos));

        // If water...
        vec3 surfaceColor;
        float specAmount = 0.1;
        if (height < WATER_LEVEL) {
            surfaceColor = mix(WATER_COL, tropicsCol, pow(height / WATER_LEVEL, 16.0));
            vec3 wavesPos = pos;
            wavesPos.xz = Rotate(wavesPos.xz, 1.4);
            normal = normalize(normal + 0.08 * valueNoise3D(256.0 * (wavesPos + 0.04 * vec3(iTime))));
            specAmount = 0.55;
        }
        // Otherwise if land...
        else {

            // Find a tangent and binormal basis to use
            vec3 tangent, binormal;
            computeTangentBasis(noiseNormal, tangent, binormal);

            // Get surface normal via finite difference, rotate back into view space
            const float DX = 0.01;
            float scaledHeight = height * HEIGHT_SCALE;
            float dh_tangent = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * tangent)) / DX;
            float dh_binormal = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * binormal)) / DX;
            vec3 landNormal = perturbNormal(noiseNormal, tangent, binormal, dh_tangent, dh_binormal);
            landNormal.xz = Rotate(landNormal.xz, -surfaceRot);
            normal = landNormal;

            // Choose color
            vec3 landColor = mix(DESERT_COL, FOREST_COL,
                clamp(2.0 * valueNoise3D(2.0 * noisePos) - 0.8, 0.0, 1.0));
            landColor = mix(landColor, ICE_COL, smoothstep(0.7, 1.0, abs(pos.y)));
            float waterBlend = smoothstep(0.0, 0.01, height - WATER_LEVEL);
            specAmount = 0.55 * (1.0 - waterBlend);
            landColor = mix(tropicsCol, landColor, waterBlend);
            surfaceColor = mix(landColor, ICE_COL,
                smoothstep(WATER_LEVEL + 0.1, WATER_LEVEL + 0.2, height));
        }

        // Surface lighting — Blinn-Phong model with warm-tinted specular
        vec2 light = blinnPhong(normal, LIGHT_DIR, 15.0, specAmount, 0.05);
        fragColor.rgb = light.x * surfaceColor + vec3(1.0, 0.92, 0.81) * light.y; // Warm sun-tinted highlight

        // Clouds — separate noise layer with independent drift
        vec3 cloudPos = vec3(2.0, 6.0, 2.0) * noisePos + 0.07 * iTime;  // Anisotropic scale stretches clouds latitudinally
        cloudPos.xz = Rotate(cloudPos.xz, 0.007 * iTime);               // Slow jet-stream drift
        cloudPos.xy = Rotate(cloudPos.xy, 0.3);                          // Tilt cloud patterns off-axis
        float cloudMin = 0.35;                                            // FBM threshold for cloud formation
        float cloudAmt = 0.75 * smoothstep(cloudMin, 0.7, Heightmap(cloudPos)); // Max 75% opacity
        fragColor.rgb = mix(fragColor.rgb, vec3(pow(light.x, 0.9)), cloudAmt);  // Clouds lit by diffuse, slight gamma lift

        // TECHNIQUE: Fresnel-like atmospheric rim glow simulating Rayleigh scattering
        // Atmosphere blue intensifies at the limb where the optical path through
        // the atmosphere is longest, approximated by pow(1 - z, 1.2).
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * light.x + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 0.6);          // Edge antialias
        fragColor.rgb += rimGlow(pos.z, atmosCol, 1.2, 1.0);                  // Rim glow — exponent 1.2 controls falloff width
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
