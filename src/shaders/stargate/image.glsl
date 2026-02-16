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
 * - Alternating horizontal/vertical tunnel orientation every few seconds
 *
 * Commons: noise-value (valueNoise2D), color (rgb2hsv, hsv2rgb)
 *
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 */

#define PI 3.14159265359

// --- Camera ---
#define FOV_ZOOM 0.4               // Field-of-view width — smaller = wider FOV, larger = more telephoto.
#define CAM_OSCILLATION_BASE 0.1   // Camera drift amplitude — subtle organic sway. Above 0.3: very shaky.
#define CAM_OSCILLATION_FREQ1 1.137 // Primary drift frequency — irrational to avoid looping.
#define CAM_OSCILLATION_FREQ2 0.37  // Secondary drift modulation frequency.
#define CAM_OSCILLATION_FREQ3 17.39 // High-frequency vertical jitter — simulates handheld camera.
#define CAM_ROT_THRESHOLD_FREQ 0.1  // Smoothstep rotation toggle rate — how often the camera snaps 90 degrees.
#define CAM_ROT_OFFSET 4.0         // Phase offset for rotation smoothstep — shifts when the snap occurs.
#define CAM_FORWARD_MIX 0.6        // How much the camera looks forward vs. back at origin. 1.0 = pure forward.

// --- Raymarching ---
#define MAX_MARCH_STEPS 250        // Maximum ray steps — higher = deeper corridors rendered, more GPU cost.
#define WALL_HIT_THRESHOLD 0.001   // Distance at which a ray is considered hitting the wall surface.

// --- Wall UVs ---
#define WALL_UV_TIME_SCROLL 7.0    // Speed of horizontal UV scrolling on walls — creates the rushing-forward effect.
#define WALL_UV_VERT_SCROLL 0.097  // Speed of vertical UV offset — slow vertical drift.
#define NOISE_WARP_SCALE 2.2       // Frequency of noise used to distort wall UVs. Higher = more chaotic detail.
#define NOISE_WARP_AMOUNT 0.1      // Strength of UV distortion from noise. Above 0.3: very warped.

// --- Color grading ---
#define HUE_SHIFT_TIME_SPEED 0.15  // Rate of hue rotation over time. 0.0 = static, 1.0 = full cycle per second.
#define HUE_SHIFT_DEPTH_FACTOR 0.1 // How much ray depth contributes to hue shift — distant walls shift more.
#define SATURATION_BOOST 1.3       // Multiplier on saturation in HSV space. 1.0 = unchanged, 2.0 = vivid.

// --- Mix / blend ---
#define MIX_BASE 0.6               // Base mix factor for wall color blending. Higher = more noise texture.
#define MIX_AMPLITUDE 0.35         // Amplitude of sinusoidal mix variation over time.
#define MIX_FREQUENCY 0.253        // Frequency of mix oscillation — irrational to avoid repetitive patterns.

// --- Glow / fade ---
#define TUNNEL_CENTER_GLOW_FALLOFF 2.0  // Exponential falloff for tunnel center glow. Higher = tighter glow.
#define MAIN_CENTER_GLOW_FALLOFF 4.0    // Exponential falloff for final center white glow. Higher = tighter.
#define PERSPECTIVE_FADE_MULT 7.0       // Multiplier on wall perspective fade — higher = sharper edge fade.
#define TUNNEL_BLEND_AMOUNT 0.9         // How much tunnel color contributes to final output. 1.0 = full tunnel.
#define WHITE_GLOW_STRENGTH 0.8         // Intensity of center white glow mixed into final color.

// --- Orientation ---
#define ORIENT_SWITCH_INTERVAL 4.0 // Seconds between horizontal/vertical tunnel orientation switches.

// --- Post-processing ---
#define VIGNETTE_STRENGTH 0.3      // Vignette darkening factor — 0.0 = none, 1.0 = heavy edge darkening.

// ---------------------------------------------------------------------------
// Blend modes
// ---------------------------------------------------------------------------

/** Screen blend mode — 1-(1-a)*(1-b). Adds light without blowing out to white. */
vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
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
    // Camera oscillation — subtle drift for organic camera movement
    float oscillation = CAM_OSCILLATION_BASE * sin(time * CAM_OSCILLATION_FREQ1)
                        * (1.0 + CAM_OSCILLATION_BASE * cos(time * CAM_OSCILLATION_FREQ2));

    // Camera rotation — snaps between 0 and 90 degrees using smoothstep threshold
    float rot = smoothstep(-0.005, 0.005, sin(CAM_ROT_THRESHOLD_FREQ * time + CAM_ROT_OFFSET)) * PI * 0.5;
    float c = cos(rot), s = sin(rot);
    uv = uv * mat2(c, -s, s, c);

    // Camera setup — slightly off-center, looking mostly down the corridor
    vec3 camPos = vec3(oscillation, sin(time * CAM_OSCILLATION_FREQ3) * oscillation * oscillation, -1.0);
    vec3 forward = normalize(mix(-camPos, vec3(0.0, 0.0, 1.0), CAM_FORWARD_MIX));
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = cross(forward, up);

    // Ray direction — project screen pixel through camera basis
    vec3 screenPoint = camPos + forward * FOV_ZOOM + uv.x * right + uv.y * up;
    vec3 rayDir = normalize(screenPoint - camPos);

    // Raymarch through the corridor
    vec3 rayPos;
    float rayLength = 0.0;
    float stepDist = 0.0;

    for (int i = 0; i < MAX_MARCH_STEPS; i++) {
        rayPos = camPos + rayDir * rayLength;

        // Distance to walls
        float vertStep = min(abs(rayPos.y - 1.0), abs(rayPos.y + 1.0));
        float horizStep = min(abs(rayPos.x - 1.0), abs(rayPos.x + 1.0));
        stepDist = mix(horizStep, vertStep, isVertical);

        if (stepDist < WALL_HIT_THRESHOLD) break;
        rayLength += stepDist;
    }

    // Base color - bright white center that feathers out
    float centerDist = length(uv);
    float centerGlow = exp(-centerDist * TUNNEL_CENTER_GLOW_FALLOFF);
    vec3 col = vec3(1.0) * centerGlow + vec3(0.1) * (1.0 - centerGlow);

    // If hit wall, sample video texture
    if (stepDist < WALL_HIT_THRESHOLD) {
        // Compute wall UVs
        vec2 wallUV_horiz = vec2(rayPos.z, rayPos.y + step(rayPos.x, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);
        vec2 wallUV_vert = vec2(rayPos.z, rayPos.x + step(rayPos.y, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);
        vec2 wallUV = mix(wallUV_horiz, wallUV_vert, isVertical);
        wallUV.x += time * WALL_UV_TIME_SCROLL;

        // Sample video texture
        vec2 sampleUV = clamp(fract(wallUV * 0.1) * 0.5 + 0.25, 0.001, 0.999);
        vec3 wallColor = texture(videoTex, sampleUV).rgb;

        // Noise variation — signed range needed for bidirectional UV warp
        float noiseVal = valueNoise2D(wallUV * NOISE_WARP_SCALE) * 2.0 - 1.0;
        vec3 noiseColor = texture(videoTex, clamp(fract(sampleUV + noiseVal * NOISE_WARP_AMOUNT), 0.001, 0.999)).rgb;

        // Animated mix
        float mixFactor = MIX_BASE + MIX_AMPLITUDE * sin(MIX_FREQUENCY * time);
        wallColor = mix(noiseColor, wallColor, mixFactor);

        // TECHNIQUE: HSV hue cycling (2001 Stargate homage)
        // Hue rotates with time and ray depth so distant walls shift color
        // faster, creating the characteristic psychedelic corridor effect.
        vec3 hsv = rgb2hsv(wallColor);
        float hueShift = time * HUE_SHIFT_TIME_SPEED + rayLength * HUE_SHIFT_DEPTH_FACTOR;
        hsv.x = fract(hsv.x + hueShift);
        hsv.y = min(hsv.y * SATURATION_BOOST, 1.0);
        wallColor = hsv2rgb(hsv);

        // Perspective fade
        float fade = mix(
            min(PERSPECTIVE_FADE_MULT * abs(uv.x), 1.0),
            min(PERSPECTIVE_FADE_MULT * abs(uv.y), 1.0),
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
    // Alternate orientation every ORIENT_SWITCH_INTERVAL seconds
    float tunnelOrientation = mod(floor(time / ORIENT_SWITCH_INTERVAL), 2.0);

    // Centered coords for tunnel
    vec2 tunnelUV = (uv - 0.5) * 2.0;
    tunnelUV.x *= aspect;

    // Raymarch the tunnel
    vec3 tunnelColor = raymarchTunnel(tunnelUV, time, iChannel0, tunnelOrientation);

    // === SCREEN BLEND ===
    // Tunnel adds light on top of video
    vec3 blended = blendScreen(baseColor, tunnelColor * WHITE_GLOW_STRENGTH);

    // Mix amount
    vec3 color = mix(baseColor, blended, TUNNEL_BLEND_AMOUNT);

    // === CENTER WHITE GLOW ===
    // Add extra bright white feathered glow at center
    float centerDist = length(uv - 0.5);
    float whiteGlow = exp(-centerDist * MAIN_CENTER_GLOW_FALLOFF);
    color = mix(color, vec3(1.0), whiteGlow * WHITE_GLOW_STRENGTH);

    // === POST ===
    // Vignette (softer to preserve center brightness)
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    // Gamma correction — linear to sRGB
    color = pow(max(color, vec3(0.0)), vec3(0.45));

    fragColor = vec4(color, 1.0);
}
