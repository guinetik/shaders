/**
 * Jupiter
 *
 * Jupiter with alternating tan zones and brown belts, turbulent
 * eddies at band boundaries, and the Great Red Spot.
 * Fully procedural with no texture dependencies.
 *
 * Based on the gas giant template by guinetik.
 *
 * @author guinetik
 */

const float tau = 6.283185;

// Jupiter color palette
#define ZONE_COLOR vec3(0.95, 0.75, 0.45)
#define BELT_LIGHT vec3(0.82, 0.48, 0.20)
#define BELT_DARK vec3(0.60, 0.28, 0.10)
#define POLAR_COLOR vec3(0.50, 0.38, 0.28)
#define GRS_COLOR vec3(0.78, 0.25, 0.10)

// Atmosphere
#define ATMOS_COLOR vec3(0.90, 0.60, 0.30)

// Band structure
#define BAND_COUNT 7.0
#define BAND_TURBULENCE 0.06
#define EDGE_TURBULENCE 0.15

// Great Red Spot — latitude ~-22 degrees, so Y ~ -0.37 on unit sphere
#define GRS_LAT -0.37
#define GRS_LON 0.0
#define GRS_WIDTH 0.28
#define GRS_HEIGHT 0.14

// Lighting
#define LIGHT_DIR normalize(vec3(0.5, 1.0, 1.0))

// Rotation
#define ROTATION_SPEED -0.1

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

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// =============================================================================
// JUPITER BANDS
// =============================================================================

/**
 * Jupiter band color from latitude.
 * Alternating light zones and dark belts with smooth transitions.
 * Poles are darker and less saturated.
 */
vec3 bandColor(float lat, float lon) {
    // Polar darkening
    float polar = smoothstep(0.85, 1.0, abs(lat));

    // Alternating zones and belts
    float bandPos = lat * BAND_COUNT;
    float band = sin(bandPos * tau * 0.5);

    // Zone (light) vs belt (dark)
    vec3 zone = ZONE_COLOR;
    vec3 belt = mix(BELT_LIGHT, BELT_DARK, 0.5 + 0.5 * sin(bandPos * 1.7 + 2.0));
    vec3 col = mix(belt, zone, 0.5 + 0.5 * band);

    // Darken toward poles
    col = mix(col, POLAR_COLOR, polar);

    return col;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Map window to -1..1, planet has r=1
    vec2 uv = 1.1 * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = ROTATION_SPEED * iTime;
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Latitude (-1 at pole, 0 equator, 1 at pole)
        float lat = noisePos.y;
        float lon = atan(noisePos.x, noisePos.z);

        // Turbulence displaces latitude for wavy band edges
        vec3 p = noisePos;
        vec3 turb = fbm3(12.0 * p);
        float latDisplaced = lat + turb.x * BAND_TURBULENCE;

        // Extra turbulence at band boundaries (where derivative is high)
        float bandEdge = abs(cos(lat * BAND_COUNT * tau * 0.5));
        bandEdge = smoothstep(0.85, 1.0, bandEdge);
        latDisplaced += turb.y * EDGE_TURBULENCE * bandEdge;

        // Base band color
        vec3 color = bandColor(latDisplaced, lon);

        // Small-scale color variation from noise
        vec3 detail = fbm3(25.0 * vec3(0.3, 1.0, 0.3) * p);
        color += detail * 0.06;

        // ── Great Red Spot ──────────────────────────────────
        float grsLat = (lat - GRS_LAT) / GRS_HEIGHT;
        float grsLon = (lon - GRS_LON) / GRS_WIDTH;
        float grsDist = grsLat * grsLat + grsLon * grsLon;
        float grsMask = smoothstep(1.0, 0.3, grsDist);

        // Swirling inside the spot
        float grsSwirl = atan(grsLat, grsLon) + sqrt(max(grsDist, 0.0)) * 4.0;
        float grsTexture = 0.5 + 0.5 * sin(grsSwirl * 3.0 + iTime * 0.3);
        vec3 grsCol = mix(GRS_COLOR, GRS_COLOR * 1.4, grsTexture * 0.3);

        color = mix(color, grsCol, grsMask);

        // ── Storm features ──────────────────────────────────
        float stormNoise = fbm1(10.0 * lat + 5.0);
        float storm = smoothstep(0.65, 0.85, stormNoise) * 0.15;
        color = mix(color, color * 1.3 + vec3(0.05, 0.03, 0.0), storm);

        // ── Lighting ────────────────────────────────────────
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0));
        float specular = 0.1 * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 30.0);
        fragColor.rgb = diffuse * color * 2.0 + ATMOS_COLOR * specular;

        // Atmosphere limb
        vec3 atmosCol = ATMOS_COLOR * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.5 * atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += pow(1.0 - pos.z, 1.5) * atmosCol * 0.5;
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = ATMOS_COLOR * halo * lightFacing * 0.3;
    }

    // Gamma correction
    fragColor.rgb = pow(max(fragColor.rgb, vec3(0.0)), vec3(0.45));
    fragColor.a = 1.0;
}
