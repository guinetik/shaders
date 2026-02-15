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
 * Noise: Hash-based 3D noise with a decorrelation matrix (const mat3 m) applied
 * between FBM octaves. The matrix rotates and scales the domain to eliminate
 * axis-aligned artifacts that would otherwise create visible grid lines on
 * the planetary bands. 5-octave FBM provides detail from broad belt structure
 * down to fine turbulent wisps.
 */

const float tau = 6.283185;  // 2*PI — full circle in radians

// =============================================================================
// HASH & NOISE
// =============================================================================
// Noise: Hash-based value noise using PCG-style integer hashing (fract of
// polynomial). Produces uniform distribution without the precision issues of
// sin-based hashing on some GPUs.

float hash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

vec3 hash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

vec4 hash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

float noise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(hash1(i), hash1(i + 1.0), u);
}

vec3 noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(hash3(i + vec3(0.0, 0.0, 0.0)),
                hash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 0.0)),
                hash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)),
                hash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 1.0)),
                hash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

float fbm1(float p) {
    float f = noise1(p); p = 2.0 * p;
    f += 0.5 * noise1(p); p = 2.0 * p;
    f += 0.25 * noise1(p); p = 2.0 * p;
    f += 0.125 * noise1(p); p = 2.0 * p;
    f += 0.0625 * noise1(p);
    return f / 1.9375;
}

// Decorrelation matrix for 3D FBM — rotates and scales domain between octaves
// to eliminate axis-aligned artifacts. The non-orthogonal entries create
// a pseudo-random rotation that prevents visible grid lines in the bands.
const mat3 m = mat3(0.51162, -1.54702, 1.15972,
                    -1.70666, -0.92510, -0.48114,
                     0.90858, -0.86654, -1.55678);

vec3 fbm3(vec3 p) {
    vec3 f = noise3(p); p = m * p;
    f += 0.5 * noise3(p); p = m * p;
    f += 0.25 * noise3(p); p = m * p;
    f += 0.125 * noise3(p); p = m * p;
    f += 0.0625 * noise3(p);
    return f / 1.9375;
}

vec3 hsv(float hue, float sat, float val) {
    return val * (vec3(1.0 - sat) + sat * (0.5 + 0.5 * cos(6.2831853 * (vec3(hue) + vec3(0.0, 0.33, 0.67)))));
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
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
    vec4 planetHash = hash4(seed + 0.3);
    vec3 planetColor = hsv(planetHash.x, 0.5, 0.5 + 0.2 * planetHash.y);          // Base band color
    vec3 planetMinorX = hsv(planetHash.x, 0.3, 0.5 + 0.2 * planetHash.y + 0.3 * planetHash.w) - planetColor;  // Band variation axis X
    vec3 planetMinorY = hsv(planetHash.x + 0.4 * planetHash.z, 0.5, 0.5 + 0.2 * planetHash.y) - planetColor;  // Band variation axis Y
    vec3 planetMinorZ = hsv(planetHash.x + 0.4 * planetHash.z, 0.3, 0.5 + 0.2 * planetHash.y - 0.4 * planetHash.w) - planetColor; // Band variation axis Z

    // Atmospheric glow color — derived from same hue family for consistency
    vec3 atmosColor = hsv(planetHash.x, 0.3, 0.7);

    // Map window to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.08 * iTime;   // Rotation speed — negative = eastward spin
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Use Y (screen vertical) as latitude for horizontal bands
        // Add slight turbulence to break up perfect stripes
        vec3 p = noisePos;
        p += bandTurbulence * fbm3(10.0 * p);  // Turbulence displacement — breaks geometric perfection

        // TECHNIQUE: Anisotropic band scaling — vec3(0.05, 1.0, 0.05) compresses
        // X and Z by 20x, stretching features into horizontal bands while keeping
        // latitudinal variation at full resolution
        vec3 bands = fbm3(bandScale * vec3(0.05, 1.0, 0.05) * p + seed);
        vec3 color = planetColor;
        color += planetMinorX * bands.x;
        color += planetMinorY * bands.y;
        color += planetMinorZ * bands.z;

        // Storm features — large oval spots at certain latitudes
        float stormNoise = fbm1(8.0 * p.y + seed);
        float storm = smoothstep(0.6, 0.8, stormNoise) * 0.3;
        color = mix(color, color * 1.5 + vec3(0.1), storm);

        // Lighting — Blinn-Phong with atmosphere-tinted specular
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);  // 0.05 ambient floor
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0)); // Half-vector (view is +Z)
        float specular = 0.15 * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 20.0); // Exponent 20 = mild gloss
        fragColor.rgb = diffuse * color * 2.0 + atmosColor * specular;   // 2x color boost for HDR vibrancy

        // TECHNIQUE: Fresnel-like atmospheric rim — intensifies at limb where
        // optical path through the atmosphere is longest
        vec3 atmosCol = atmosColor * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv))); // Edge antialias
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol * 0.8;  // Rim glow — exponent 1.2, 80% intensity
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = atmosColor * halo * lightFacing * 0.5;
    }

    fragColor.a = 1.0;
}
