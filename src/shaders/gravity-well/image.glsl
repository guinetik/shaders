/**
 * Gravity Well Study
 *
 * @author guinetik
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 *
 * Gravity Well Techniques:
 * - Inverse-square gravitational lensing
 * - Multi-well interference warping
 * - Image-based color sampling
 *
 * Visual Features:
 * - Orbiting gravity wells warp the image
 * - Colors sampled from warped texture
 * - Glowing wells with dark cores
 */

#define PI 3.14159265359
#define TAU 6.28318530718

/**
 * Warp UV toward a gravity point
 */
vec2 gravityWarp(vec2 uv, vec2 center, float mass, float softness) {
    vec2 delta = uv - center;
    float dist = length(delta);
    float pull = mass / (dist * dist + softness);
    return uv - normalize(delta) * pull;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;

    // Centered aspect-corrected coords
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float time = iTime;

    // === GRAVITY WELLS ===
    vec2 warped = p;

    // Central pulsing well
    vec2 center = vec2(
        sin(time * 0.7) * 0.15,
        cos(time * 0.5) * 0.15
    );
    float centerMass = 0.06 + sin(time * 2.0) * 0.02;
    warped = gravityWarp(warped, center, centerMass, 0.01);

    // Orbiting wells
    vec2 wellPositions[4];
    for (int i = 0; i < 4; i++) {
        float fi = float(i);
        float angle = time * (0.4 + fi * 0.15) + fi * TAU / 4.0;
        float radius = 0.35 + sin(time * 0.3 + fi) * 0.1;
        wellPositions[i] = vec2(cos(angle), sin(angle)) * radius;

        float mass = 0.025 * (1.0 + sin(time * 1.5 + fi * 2.0) * 0.5);
        warped = gravityWarp(warped, wellPositions[i], mass, 0.015);
    }

    // Convert warped coords back to UV space
    vec2 warpedUV = warped / vec2(aspect, 1.0) + 0.5;

    // === SAMPLE TEXTURE ===
    vec3 color = vec3(0.0);

    if (warpedUV.x > 0.0 && warpedUV.x < 1.0 && warpedUV.y > 0.0 && warpedUV.y < 1.0) {
        color = texture(iChannel0, warpedUV).rgb;
    }

    // Fallback pattern if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        // Procedural fallback - gradient
        color = vec3(warpedUV.x, warpedUV.y, 0.5 + 0.5 * sin(time));
    }

    // === WELL GLOWS (sample color from texture near each well) ===
    float totalGlow = 0.0;
    vec3 glowColor = vec3(0.0);

    // Center well glow
    float centerDist = length(p - center);
    float centerGlow = smoothstep(0.25, 0.0, centerDist);
    vec2 centerSampleUV = center / vec2(aspect, 1.0) + 0.5;
    vec3 centerColor = texture(iChannel0, clamp(centerSampleUV, 0.0, 1.0)).rgb;
    // Boost brightness for glow
    centerColor = centerColor * 1.5 + 0.3;
    glowColor += centerColor * centerGlow;
    totalGlow += centerGlow;

    // Orbiting well glows
    for (int i = 0; i < 4; i++) {
        float dist = length(p - wellPositions[i]);
        float glow = smoothstep(0.15, 0.0, dist);

        // Sample texture color at well position
        vec2 sampleUV = wellPositions[i] / vec2(aspect, 1.0) + 0.5;
        vec3 wellColor = texture(iChannel0, clamp(sampleUV, 0.0, 1.0)).rgb;
        wellColor = wellColor * 1.5 + 0.3;

        glowColor += wellColor * glow;
        totalGlow += glow;
    }

    // Apply glow
    color += glowColor * 0.6;

    // === DARK CORES ===
    float core = smoothstep(0.06, 0.02, length(p - center));
    color *= 1.0 - core * 0.9;

    for (int i = 0; i < 4; i++) {
        float coreDist = length(p - wellPositions[i]);
        float coreAlpha = smoothstep(0.04, 0.015, coreDist);
        color *= 1.0 - coreAlpha * 0.85;
    }

    // === POST ===
    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.5;
    color *= vig;

    // Slight contrast boost
    color = pow(color, vec3(0.95));

    fragColor = vec4(color, 1.0);
}
