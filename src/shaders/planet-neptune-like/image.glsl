/**
 * Gas Giant
 *
 * A massive gas giant planet with colorful banded atmosphere and turbulent
 * storms. Fully procedural with no texture dependencies.
 *
 * Based on the exoplanets study shader by guinetik.
 * Stripped down to a single planet — no star, moons, or rings.
 *
 * @author guinetik
 */

const float tau = 6.283185;

// =============================================================================
// HASH & NOISE
// =============================================================================

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

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0));

    // Fixed seed for consistent gas giant look
    const float seed = 3.7;

    // Planet visual properties
    float bandScale = 4.5;
    float bandTurbulence = 0.04;

    vec4 planetHash = hash4(seed + 0.3);
    vec3 planetColor = hsv(planetHash.x, 0.5, 0.5 + 0.2 * planetHash.y);
    vec3 planetMinorX = hsv(planetHash.x, 0.3, 0.5 + 0.2 * planetHash.y + 0.3 * planetHash.w) - planetColor;
    vec3 planetMinorY = hsv(planetHash.x + 0.4 * planetHash.z, 0.5, 0.5 + 0.2 * planetHash.y) - planetColor;
    vec3 planetMinorZ = hsv(planetHash.x + 0.4 * planetHash.z, 0.3, 0.5 + 0.2 * planetHash.y - 0.4 * planetHash.w) - planetColor;

    // Atmospheric glow color
    vec3 atmosColor = hsv(planetHash.x, 0.3, 0.7);

    // Map window to -1..1, planet has r=1
    vec2 uv = 1.1 * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.08 * iTime;
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Use Y (screen vertical) as latitude for horizontal bands
        // Add slight turbulence to break up perfect stripes
        vec3 p = noisePos;
        p += bandTurbulence * fbm3(10.0 * p);

        // Banded atmosphere — bands vary along Y (latitude), stretched along X/Z
        vec3 bands = fbm3(bandScale * vec3(0.05, 1.0, 0.05) * p + seed);
        vec3 color = planetColor;
        color += planetMinorX * bands.x;
        color += planetMinorY * bands.y;
        color += planetMinorZ * bands.z;

        // Storm features — large oval spots at certain latitudes
        float stormNoise = fbm1(8.0 * p.y + seed);
        float storm = smoothstep(0.6, 0.8, stormNoise) * 0.3;
        color = mix(color, color * 1.5 + vec3(0.1), storm);

        // Lighting
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0));
        float specular = 0.15 * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 20.0);
        fragColor.rgb = diffuse * color * 2.0 + atmosColor * specular;

        // Atmosphere edge
        vec3 atmosCol = atmosColor * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol * 0.8;
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
