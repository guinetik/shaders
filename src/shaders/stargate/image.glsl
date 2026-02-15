/**
 * Stargate Study
 * @author guinetik
 * @date 2026-02-02
 *
 * A raymarched infinite corridor effect inspired by the 2001: A Space Odyssey
 * Stargate sequence. Sphere-traces through a box corridor, mapping the input
 * image onto walls with noise-based distortion and cycling hue shifts.
 *
 * Techniques:
 * - Raymarched box corridor with wall-distance SDF
 * - Input texture mapped to walls with noise-warped UVs
 * - HSV hue cycling over time and depth for psychedelic color
 * - Screen blend compositing (additive light model)
 * - Alternating horizontal/vertical tunnel orientation every 4 seconds
 *
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 */

#define PI 3.14159265359

// ---------------------------------------------------------------------------
// Noise utilities
// ---------------------------------------------------------------------------

/** Pseudo-random hash — returns [-1, 1] range for signed noise. */
float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

/** 2D value noise with Hermite smoothing — returns [-1, 1]. */
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y);
}

// ---------------------------------------------------------------------------
// Blend modes and color space
// ---------------------------------------------------------------------------

/** Screen blend mode — 1-(1-a)*(1-b). Adds light without blowing out to white. */
vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

/** RGB to HSV conversion — used for hue-shifting wall textures. */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/** HSV to RGB conversion. */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// ---------------------------------------------------------------------------
// Raymarch tunnel
// ---------------------------------------------------------------------------

// TECHNIQUE: Raymarched box corridor
// The SDF is simply the minimum distance to the four walls (two horizontal
// or two vertical depending on orientation). The ray marches forward until
// it hits a wall, then the wall is textured with the input image and
// noise-warped UVs for a psychedelic Stargate look.

/**
 * Raymarch an infinite corridor and sample the input texture on the walls.
 * @param isVertical 0.0 = horizontal walls, 1.0 = vertical walls
 */
vec3 raymarchTunnel(vec2 uv, float time, sampler2D videoTex, float isVertical) {
    const float FOV_ZOOM = 0.4;  // Controls field-of-view width — smaller = wider FOV

    // Camera oscillation — subtle drift for organic camera movement
    float oscillation = 0.1 * sin(time * 1.137) * (1.0 + 0.1 * cos(time * 0.37));

    // Camera rotation — snaps between 0 and 90 degrees using smoothstep threshold
    float rot = smoothstep(-0.005, 0.005, sin(0.1 * time + 4.0)) * PI * 0.5;
    float c = cos(rot), s = sin(rot);
    uv = uv * mat2(c, -s, s, c);

    // Camera setup — slightly off-center, looking mostly down the corridor
    vec3 camPos = vec3(oscillation, sin(time * 17.39) * oscillation * oscillation, -1.0);
    vec3 forward = normalize(mix(-camPos, vec3(0.0, 0.0, 1.0), 0.6));
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = cross(forward, up);

    // Ray direction — project screen pixel through camera basis
    vec3 screenPoint = camPos + forward * FOV_ZOOM + uv.x * right + uv.y * up;
    vec3 rayDir = normalize(screenPoint - camPos);

    // Raymarch through the corridor (250 max steps)
    vec3 rayPos;
    float rayLength = 0.0;
    float stepDist = 0.0;

    for (int i = 0; i < 250; i++) {
        rayPos = camPos + rayDir * rayLength;

        // Distance to walls
        float vertStep = min(abs(rayPos.y - 1.0), abs(rayPos.y + 1.0));
        float horizStep = min(abs(rayPos.x - 1.0), abs(rayPos.x + 1.0));
        stepDist = mix(horizStep, vertStep, isVertical);

        if (stepDist < 0.001) break;
        rayLength += stepDist;
    }

    // Base color - bright white center that feathers out
    float centerDist = length(uv);
    float centerGlow = exp(-centerDist * 2.0);  // Exponential falloff from center
    vec3 col = vec3(1.0) * centerGlow + vec3(0.1) * (1.0 - centerGlow);

    // If hit wall, sample video texture
    if (stepDist < 0.001) {
        // Compute wall UVs
        vec2 wallUV_horiz = vec2(rayPos.z, rayPos.y + step(rayPos.x, 0.0) * 33.1 + time * 0.097);
        vec2 wallUV_vert = vec2(rayPos.z, rayPos.x + step(rayPos.y, 0.0) * 33.1 + time * 0.097);
        vec2 wallUV = mix(wallUV_horiz, wallUV_vert, isVertical);
        wallUV.x += time * 7.0;

        // Sample video texture
        vec2 sampleUV = clamp(fract(wallUV * 0.1) * 0.5 + 0.25, 0.001, 0.999);
        vec3 wallColor = texture(videoTex, sampleUV).rgb;

        // Noise variation
        float noiseVal = noise(wallUV * 2.2);
        vec3 noiseColor = texture(videoTex, clamp(fract(sampleUV + noiseVal * 0.1), 0.001, 0.999)).rgb;

        // Animated mix
        float mixFactor = 0.6 + 0.35 * sin(0.253 * time);
        wallColor = mix(noiseColor, wallColor, mixFactor);

        // TECHNIQUE: HSV hue cycling (2001 Stargate homage)
        // Hue rotates with time and ray depth so distant walls shift color
        // faster, creating the characteristic psychedelic corridor effect.
        vec3 hsv = rgb2hsv(wallColor);
        float hueShift = time * 0.15 + rayLength * 0.1;  // Time + depth based
        hsv.x = fract(hsv.x + hueShift);
        hsv.y = min(hsv.y * 1.3, 1.0);  // Boost saturation
        wallColor = hsv2rgb(hsv);

        // Perspective fade
        float fade = mix(
            min(7.0 * abs(uv.x), 1.0),
            min(7.0 * abs(uv.y), 1.0),
            isVertical
        );
        wallColor *= fade;

        col = mix(col, wallColor, fade);
    }

    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    // === BASE VIDEO ===
    vec3 baseColor = texture(iChannel0, uv).rgb;

    // Fallback gradient if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        baseColor = vec3(0.1, 0.1, 0.15);
        baseColor += vec3(0.05, 0.1, 0.15) * (1.0 - length(uv - 0.5));
    }

    // === TUNNEL ===
    // Alternate orientation every 4 seconds
    float tunnelOrientation = mod(floor(time / 4.0), 2.0);

    // Centered coords for tunnel
    vec2 tunnelUV = (uv - 0.5) * 2.0;
    tunnelUV.x *= aspect;

    // Raymarch the tunnel
    vec3 tunnelColor = raymarchTunnel(tunnelUV, time, iChannel0, tunnelOrientation);

    // === SCREEN BLEND ===
    // Tunnel adds light on top of video
    vec3 blended = blendScreen(baseColor, tunnelColor * 0.8);

    // Mix amount
    float tunnelMix = 0.9;
    vec3 color = mix(baseColor, blended, tunnelMix);

    // === CENTER WHITE GLOW ===
    // Add extra bright white feathered glow at center
    float centerDist = length(uv - 0.5);
    float whiteGlow = exp(-centerDist * 4.0);  // Tight exponential falloff
    color = mix(color, vec3(1.0), whiteGlow * 0.8);

    // === POST ===
    // Vignette (softer to preserve center brightness)
    float vig = 1.0 - length(uv - 0.5) * 0.3;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
