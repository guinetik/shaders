/**
 * Perlin Ripples Study
 *
 * @author guinetik
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 *
 * Perlin Ripple Techniques:
 * - 3D gradient noise for smooth animation
 * - Chaotic multi-source ripple interference
 * - Turbulent displacement layers
 *
 * Visual Features:
 * - Unpredictable liquid surface
 * - Wandering ripple sources
 * - Colors sampled from displaced texture
 */

#define PI 3.14159265359

/**
 * 3D Hash for gradient noise
 */
vec3 hash3(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 213.6)),
        dot(p, vec3(327.1, 211.7, 113.6)),
        dot(p, vec3(269.5, 183.3, 351.1))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

/**
 * Simple hash for randomness
 */
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

/**
 * 3D Gradient Noise (Perlin-style)
 */
float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(
            mix(dot(hash3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                dot(hash3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
            mix(dot(hash3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                dot(hash3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),
            u.y),
        mix(
            mix(dot(hash3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                dot(hash3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
            mix(dot(hash3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                dot(hash3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),
            u.y),
        u.z);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    vec2 p = uv - 0.5;
    p.x *= aspect;

    // === CHAOTIC RIPPLE SOURCES ===
    // Multiple wandering points that emit ripples
    float totalRipple = 0.0;
    vec2 totalDisplace = vec2(0.0);

    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float seed = fi * 73.156;

        // Each source wanders unpredictably using noise
        vec2 sourcePos = vec2(
            noise3D(vec3(time * 0.3 + seed, fi * 1.7, 0.0)),
            noise3D(vec3(fi * 2.3, time * 0.25 + seed, 1.0))
        ) * 0.8;

        // Distance to this source
        float dist = length(p - sourcePos);

        // Ripple with unique frequency, speed, and phase
        float freq = 15.0 + hash(fi * 5.1) * 20.0;
        float speed = 2.0 + hash(fi * 7.3) * 3.0;
        float phase = hash(fi * 11.7) * 6.28;

        float ripple = sin(dist * freq - time * speed + phase);

        // Irregular decay - not smooth falloff
        float decay = 1.0 / (1.0 + dist * (3.0 + hash(fi * 3.3) * 4.0));
        decay *= 0.5 + 0.5 * sin(time * (0.5 + hash(fi * 9.1)) + fi);

        ripple *= decay;
        totalRipple += ripple;

        // Displacement toward/away from source
        vec2 dir = normalize(p - sourcePos + 0.001);
        totalDisplace += dir * ripple * 0.015;
    }

    // === TURBULENT NOISE LAYER ===
    // Add chaotic 3D noise displacement
    vec3 noisePos = vec3(p * 4.0, time * 0.4);
    float turb1 = noise3D(noisePos);
    float turb2 = noise3D(noisePos * 2.3 + 100.0);

    totalDisplace += vec2(turb1, turb2) * 0.03;

    // === SUDDEN BURSTS ===
    // Occasional random strong ripples
    float burstPhase = floor(time * 0.5);
    float burstT = fract(time * 0.5);
    vec2 burstPos = vec2(
        hash(burstPhase * 17.1) - 0.5,
        hash(burstPhase * 23.7) - 0.5
    ) * 0.6;
    float burstDist = length(p - burstPos);
    float burst = sin(burstDist * 25.0 - burstT * 15.0);
    burst *= smoothstep(0.5, 0.0, burstT);
    burst *= smoothstep(0.6, 0.0, burstDist);
    totalDisplace += normalize(p - burstPos + 0.001) * burst * 0.025;

    // === SAMPLE TEXTURE ===
    vec2 displacedUV = uv + totalDisplace;
    displacedUV = clamp(displacedUV, 0.001, 0.999);

    vec3 color = texture(iChannel0, displacedUV).rgb;

    // Fallback if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        // Chaotic liquid visualization
        float pattern = totalRipple * 0.3 + 0.5;
        pattern += turb1 * 0.2 + turb2 * 0.15;

        // Shifting color palette
        float hue = pattern * 0.5 + time * 0.05;
        vec3 col1 = vec3(0.1, 0.1, 0.2);
        vec3 col2 = 0.5 + 0.5 * cos(6.28 * (hue + vec3(0.0, 0.33, 0.67)));

        color = mix(col1, col2, smoothstep(0.2, 0.8, pattern));

        // Bright interference lines
        float interference = abs(fract(totalRipple * 2.0) - 0.5) * 2.0;
        interference = pow(interference, 8.0);
        color += vec3(0.8, 0.9, 1.0) * interference * 0.5;
    }

    // === REFRACTION BRIGHTNESS ===
    float refract = length(totalDisplace) * 20.0;
    color *= 1.0 + refract * 0.5;

    // === SPECULAR FLASHES ===
    float spec = pow(max(0.0, totalRipple), 6.0) * 0.4;
    color += vec3(1.0) * spec;

    // === POST ===
    float vig = 1.0 - length(uv - 0.5) * 0.4;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
