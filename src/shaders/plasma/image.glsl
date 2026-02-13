/**
 * Perlin Plasma Study
 *
 * @author guinetik
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 *
 * Plasma Techniques:
 * - True 3D Perlin gradient noise
 * - Classic demoscene sine plasma
 * - Noise-warped interference patterns
 *
 * Visual Features:
 * - Organic flowing color fields
 * - Smoother gradients than value noise
 * - Blends with input texture
 */

#define PI 3.14159265359
#define TAU 6.28318530718

/**
 * 3D Hash for gradient vectors
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
 * True 3D Perlin Gradient Noise
 * Interpolates gradient dot products for smoother results
 */
float perlin3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    // Quintic interpolation for C2 continuity (smoother than cubic)
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

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

/**
 * Perlin FBM - layered gradient noise
 */
float perlinFBM(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
        v += a * perlin3D(p);
        p *= 2.0;
        a *= 0.5;
    }
    return v;
}

/**
 * Classic plasma + Perlin turbulence
 */
float plasma(vec2 p, float time) {
    float v = 0.0;

    // Classic sine waves
    v += sin(p.x * 3.0 + time);
    v += sin(p.y * 2.7 + time * 1.3);
    v += sin((p.x + p.y) * 2.5 + time * 0.7);
    v += sin(length(p) * 4.0 - time * 1.5);

    // Moving center ripple
    vec2 center = vec2(sin(time * 0.5), cos(time * 0.7)) * 0.5;
    v += sin(length(p - center) * 5.0 + time);

    // ADD PERLIN: 3D noise traveling through time
    vec3 noiseCoord = vec3(p * 1.5, time * 0.4);
    v += perlin3D(noiseCoord) * 2.0;

    // ADD PERLIN: Turbulent FBM layer
    v += perlinFBM(vec3(p * 0.8, time * 0.3)) * 1.5;

    return v / 7.0;
}

/**
 * Perlin-warped coordinates
 * Distorts the plasma field organically
 */
vec2 perlinWarp(vec2 p, float time) {
    vec3 np = vec3(p * 2.0, time * 0.25);

    return p + vec2(
        perlin3D(np),
        perlin3D(np + vec3(5.2, 1.3, 2.7))
    ) * 0.3;
}

/**
 * Psychedelic rainbow palette
 */
vec3 plasmaColor(float v, float time) {
    return vec3(
        sin(v * PI + time * 0.5),
        sin(v * PI + time * 0.5 + TAU / 3.0),
        sin(v * PI + time * 0.5 + TAU * 2.0 / 3.0)
    ) * 0.5 + 0.5;
}

/**
 * Hot plasma palette
 */
vec3 hotPlasma(float v) {
    v = v * 0.5 + 0.5;
    vec3 color = mix(vec3(0.0, 0.0, 0.2), vec3(0.5, 0.0, 0.5), smoothstep(0.0, 0.25, v));
    color = mix(color, vec3(1.0, 0.2, 0.0), smoothstep(0.25, 0.5, v));
    color = mix(color, vec3(1.0, 0.8, 0.0), smoothstep(0.5, 0.75, v));
    color = mix(color, vec3(1.0, 1.0, 0.9), smoothstep(0.75, 1.0, v));
    return color;
}

/**
 * Electric palette
 */
vec3 electricPlasma(float v, float time) {
    v = v * 0.5 + 0.5;
    vec3 c1 = vec3(0.0, 0.1, 0.2);
    vec3 c2 = vec3(0.0, 0.5, 0.8);
    vec3 c3 = vec3(0.8, 0.2, 0.8);
    vec3 c4 = vec3(1.0, 1.0, 1.0);

    vec3 color = mix(c1, c2, smoothstep(0.0, 0.33, v));
    color = mix(color, c3, smoothstep(0.33, 0.66, v));
    color = mix(color, c4, smoothstep(0.66, 1.0, v));
    color *= 0.8 + 0.2 * sin(v * 10.0 + time * 2.0);
    return color;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    // Centered aspect-corrected
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;

    // === PERLIN WARP THE COORDINATES ===
    vec2 warped = perlinWarp(p, time);

    // === GENERATE PLASMA ===
    float v1 = plasma(warped, time);
    float v2 = plasma(warped * 0.7 + 10.0, time * 0.8);
    float combined = v1 * 0.6 + v2 * 0.4;

    // === EXTRA PERLIN DETAIL ===
    // High-frequency Perlin adds fine organic texture
    float detail = perlin3D(vec3(warped * 4.0, time * 0.6)) * 0.15;
    combined += detail;

    // === COLOR ===
    float paletteTime = mod(time * 0.1, 3.0);
    vec3 plasmaCol;

    if (paletteTime < 1.0) {
        plasmaCol = plasmaColor(combined, time);
    } else if (paletteTime < 2.0) {
        plasmaCol = hotPlasma(combined);
    } else {
        plasmaCol = electricPlasma(combined, time);
    }

    // === BLEND WITH TEXTURE ===
    vec3 texColor = texture(iChannel0, uv).rgb;
    vec3 color;

    if (length(texColor) > 0.01) {
        vec3 overlay = mix(
            2.0 * texColor * plasmaCol,
            1.0 - 2.0 * (1.0 - texColor) * (1.0 - plasmaCol),
            step(0.5, texColor)
        );
        color = mix(texColor, overlay, 0.6);
    } else {
        color = plasmaCol;
    }

    // === SCANLINES ===
    float scanline = sin(uv.y * 400.0) * 0.03;
    color -= scanline;

    // === POST ===
    color += plasmaCol * 0.1;
    float vig = 1.0 - length(uv - 0.5) * 0.5;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
