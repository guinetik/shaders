/**
 * Neptune-like Ice Giant
 * @author guinetik
 * @date 2025-11-27
 *
 * A Neptune-like ice giant planet with colorful banded atmosphere, turbulent
 * storms, and dramatic lighting. Fully procedural with no texture dependencies.
 *
 * Based on the exoplanets study shader by guinetik.
 * Stripped down to a single planet — no star, moons, or rings.
 *
 * Rendering layers (front to back):
 *   1. Banded atmosphere — FBM-driven color bands stretched along latitude,
 *      with seed-based HSV palette for consistent hue across runs
 *   2. Storm features   — high-frequency 1D FBM along latitude creates
 *      localized bright storm ovals
 *   3. Specular highlight — Blinn-Phong half-vector specular tinted by
 *      atmosphere color
 *   4. Atmosphere limb   — Fresnel-like rim glow at the sphere edge
 *   5. Halo              — off-sphere atmospheric glow for background
 *
 * TECHNIQUE: Analytic unit-sphere projection — planet rendered as a unit sphere
 * with z derived from the Pythagorean identity. No raymarching needed.
 *
 * TECHNIQUE: Anisotropic band scaling. The 3D noise input is scaled with
 * vec3(0.05, 1.0, 0.05), compressing X/Z to stretch features into horizontal
 * bands while preserving vertical (latitudinal) variation. Small turbulence
 * displacement (bandTurbulence) breaks up perfect stripes.
 *
 * Noise: PCG-style hash noise from commons/noise-pcg.glsl with a decorrelation
 * matrix (PCG_FBM_MATRIX) applied between FBM octaves. The matrix rotates and
 * scales the domain to eliminate axis-aligned artifacts that would otherwise
 * create visible grid lines on the planetary bands. 5-octave FBM provides
 * detail from broad belt structure down to fine turbulent wisps.
 *
 * Commons: sphere.glsl, noise-pcg.glsl, lighting.glsl, atmosphere.glsl
 */

const float tau = 6.283185;  // 2*PI — full circle in radians

vec3 hsv(float hue, float sat, float val) {
    return val * (vec3(1.0 - sat) + sat * (0.5 + 0.5 * cos(6.2831853 * (vec3(hue) + vec3(0.0, 0.33, 0.67)))));
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0));  // Sun direction (upper-right)

    // Fixed seed for consistent gas giant look — changing this value generates
    // a completely different color palette and band pattern
    const float seed = 3.7;

    // Planet visual properties
    float bandScale = 4.5;          // Number of atmospheric bands — higher = more/thinner bands
    float bandTurbulence = 0.04;    // FBM displacement of bands — higher = wavier band edges

    // TECHNIQUE: Seed-based HSV palette generation. The seed is hashed to derive
    // a base hue, then minor color axes are offset in hue/sat/val to create
    // coherent but varied color bands when mixed by the 3-channel FBM.
    vec4 planetHash = pcgHash4(seed + 0.3);
    vec3 planetColor = hsv(planetHash.x, 0.5, 0.5 + 0.2 * planetHash.y);          // Base band color
    vec3 planetMinorX = hsv(planetHash.x, 0.3, 0.5 + 0.2 * planetHash.y + 0.3 * planetHash.w) - planetColor;  // Band variation axis X
    vec3 planetMinorY = hsv(planetHash.x + 0.4 * planetHash.z, 0.5, 0.5 + 0.2 * planetHash.y) - planetColor;  // Band variation axis Y
    vec3 planetMinorZ = hsv(planetHash.x + 0.4 * planetHash.z, 0.3, 0.5 + 0.2 * planetHash.y - 0.4 * planetHash.w) - planetColor; // Band variation axis Z

    // Atmospheric glow color — derived from same hue family for consistency
    vec3 atmosColor = hsv(planetHash.x, 0.3, 0.7);

    // Map window to -1..1, planet has r=1
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.8 * iTime;    // Rotation speed — negative = eastward spin (SUPER fast)
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Use Y (screen vertical) as latitude for horizontal bands
        // Add slight turbulence to break up perfect stripes
        vec3 p = noisePos;
        p += bandTurbulence * pcgFbm3(10.0 * p);  // Turbulence displacement — breaks geometric perfection

        // TECHNIQUE: Anisotropic band scaling — vec3(0.05, 1.0, 0.05) compresses
        // X and Z by 20x, stretching features into horizontal bands while keeping
        // latitudinal variation at full resolution
        vec3 bands = pcgFbm3(bandScale * vec3(0.05, 1.0, 0.05) * p + seed);
        vec3 color = planetColor;
        color += planetMinorX * bands.x;
        color += planetMinorY * bands.y;
        color += planetMinorZ * bands.z;

        // Storm features — large oval spots at certain latitudes
        float stormNoise = pcgFbm1(8.0 * p.y + seed);
        float storm = smoothstep(0.6, 0.8, stormNoise) * 0.3;
        color = mix(color, color * 1.5 + vec3(0.1), storm);

        // Lighting — Blinn-Phong with atmosphere-tinted specular
        vec2 light = blinnPhong(normal, LIGHT_DIR, 20.0, 0.15, 0.05);
        fragColor.rgb = light.x * color * 2.0 + atmosColor * light.y;

        // TECHNIQUE: Fresnel-like atmospheric rim — intensifies at limb where
        // optical path through the atmosphere is longest
        vec3 atmosCol = atmosColor * clamp(0.7 * light.x + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 0.6);
        fragColor.rgb += rimGlow(pos.z, atmosCol, 1.2, 0.8);
    }
    // Off sphere — atmospheric halo
    else {
        fragColor.rgb = halo(uv, atmosColor, LIGHT_DIR, 0.5);
    }

    fragColor.a = 1.0;
}
