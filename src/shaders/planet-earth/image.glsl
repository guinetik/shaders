/**
 * Earth-like Planet
 *
 * Procedural terrain with oceans, forests, deserts, ice caps, and clouds.
 * All noise is generated inline (no texture dependencies).
 *
 * Based on the atmospheric study shader from the exoplanets project.
 * Original texture-based noise replaced with hash-based procedural noise.
 *
 * @author guinetik
 */

// =============================================================================
// INLINE NOISE (replaces iChannel0 texture lookups)
// =============================================================================

float hashN(float n) { return fract(sin(n) * 43758.5453123); }

float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// 2D value noise
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

// FBM for terrain height & clouds
float Heightmap(vec3 pos) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    pos *= 1.5;
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

    // Constants
    const vec3 ICE_COL = vec3(1.0, 1.0, 1.0);
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0));
    const float HEIGHT_SCALE = 0.09;

    vec3 ATMOS_COL = vec3(0.37, 0.71, 0.95);
    vec3 WATER_COL = vec3(0.17, 0.32, 0.52) * 0.8;
    vec3 TROPICS_COL = vec3(0.0, 1.0, 1.0) * 0.75;
    vec3 FOREST_COL = vec3(0.15, 0.58, 0.22);
    vec3 DESERT_COL = vec3(0.8, 0.58, 0.52);

    float WATER_LEVEL = 0.48;

    // Map window roughly to -1..1, planet has r=1
    vec2 uv = 1.1 * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    // Derive Z pythagorean-ly; if on the sphere...
    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {

        // Unit sphere, so pos = normal
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Terrain height
        vec3 noiseNormal = pos;
        float surfaceRot = -0.1 * iTime;
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

        // Surface lighting
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0));
        float specular = specAmount * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 15.0);
        fragColor.rgb = diffuse * surfaceColor + vec3(1.0, 0.92, 0.81) * specular;

        // Clouds
        vec3 cloudPos = vec3(2.0, 6.0, 2.0) * noisePos + 0.07 * iTime;
        cloudPos.xz = Rotate(cloudPos.xz, 0.007 * iTime);
        cloudPos.xy = Rotate(cloudPos.xy, 0.3);
        float cloudMin = 0.35;
        float cloudAmt = 0.75 * smoothstep(cloudMin, 0.7, Heightmap(cloudPos));
        fragColor.rgb = mix(fragColor.rgb, vec3(pow(diffuse, 0.9)), cloudAmt);

        // Atmosphere, edge antialias
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol;
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
