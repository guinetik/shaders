/**
 * Stargate Study
 * @author guinetik
 * @date 2026-02-02
 *
 * A corridor effect inspired by the 2001: A Space Odyssey Stargate sequence,
 * recreating Kubrick/Trumbull's slit-scan false-color aesthetic.
 *
 * Techniques:
 * - Analytical ray-plane corridor intersection — walls are flat planes at
 *   x=±1 or y=±1, solved with a single division per wall (no raymarching).
 * - Kubrick false-color grading: per-channel contrast stretch → HSV remap
 *   with cycling hue and forced saturation. Emulates slit-scan photography
 *   of aerial footage through rotating color gels on high-contrast film.
 * - Alternating horizontal/vertical slit-scan orientation every few seconds.
 * - Feathered black seam along the corridor center hides wall convergence.
 *
 * Commons: noise-value (valueNoise2D), color (rgb2hsv, hsv2rgb)
 *
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 */

// --- Camera ---
#define FOV_ZOOM 0.4               // Field-of-view width — smaller = wider FOV, larger = more telephoto.
#define CAM_OSCILLATION_BASE 0.1   // Camera drift amplitude — subtle organic sway. Above 0.3: very shaky.
#define CAM_OSCILLATION_FREQ1 1.137 // Primary drift frequency — irrational to avoid looping.
#define CAM_OSCILLATION_FREQ2 0.37  // Secondary drift modulation frequency.
#define CAM_OSCILLATION_FREQ3 17.39 // High-frequency vertical jitter — simulates handheld camera.
#define CAM_FORWARD_MIX 0.6        // How much the camera looks forward vs. back at origin. 1.0 = pure forward.

// --- Ray-plane intersection ---
// No raymarching needed — corridor walls are flat planes, solved analytically.

// --- Wall UVs ---
#define WALL_UV_TILE_SCALE  0.35   // How much of the texture each wall tile shows — higher = smaller tiles, lower = more recognizable.
#define WALL_UV_TIME_SCROLL 2.0    // Speed of horizontal UV scrolling on walls — creates the rushing-forward effect.
#define WALL_UV_VERT_SCROLL 0.05   // Speed of vertical UV offset — slow vertical drift.
#define NOISE_WARP_SCALE 1.5       // Frequency of noise used to distort wall UVs. Higher = more chaotic detail.
#define NOISE_WARP_AMOUNT 0.06     // Strength of UV distortion from noise. Above 0.3: very warped.

// --- Kubrick false-color grading ---
// TECHNIQUE: Per-channel contrast + HSV remap (slit-scan emulation)
// Kubrick/Trumbull's slit-scan shot aerial footage through rotating color gels
// on high-contrast film. We emulate this by:
//   (1) Per-channel contrast stretch — normalize R, G, B independently
//   (2) Convert to HSV, rotate hue over time, force full saturation
//   (3) Boost brightness while preserving texture detail
#define CONTRAST_BOOST 1.8         // Power curve on luminance. Higher = more separation between darks and lights. 1.0 = linear.
#define GRADIENT_SPEED 0.06        // How fast the gradient palette rotates over time. 0.0 = static.
// --- Mix / blend ---
#define MIX_BASE 0.6               // Base mix factor for wall color blending. Higher = more noise texture.
#define MIX_AMPLITUDE 0.35         // Amplitude of sinusoidal mix variation over time.
#define MIX_FREQUENCY 0.253        // Frequency of mix oscillation — irrational to avoid repetitive patterns.

// --- Orientation ---
#define ORIENT_SWITCH_INTERVAL 4.0 // Seconds between horizontal/vertical tunnel orientation switches.

// --- Post-processing ---
#define VIGNETTE_STRENGTH 0.4      // Vignette darkening factor — 0.0 = none, 1.0 = heavy edge darkening.

// ---------------------------------------------------------------------------
// Kubrick false-color grading
// ---------------------------------------------------------------------------

// TECHNIQUE: Duotone gradient map (slit-scan emulation)
// The original 2001 Stargate was shot by Douglas Trumbull using slit-scan
// photography of aerial landscape footage through rotating color gels on
// high-contrast film. The result: fully detailed landscapes with luminance
// remapped through a bold 2-3 color gradient — deep saturated shadows,
// vivid midtones, bright contrasting highlights. All original texture
// and edge detail is preserved; only the color mapping changes.

/** Apply Kubrick-style false-color grading to a video sample. */
vec3 kubrickGrade(vec3 texColor, float time) {
    // TECHNIQUE: Per-channel contrast + HSV remap
    // Luminance-only grading fails on dark/uniform footage because all pixels
    // land in one brightness zone. Instead we boost per-channel contrast first
    // (so R, G, B separate even in dark scenes), then convert to HSV and
    // rotate/saturate. This preserves the original texture edges while
    // remapping to bold cycling colors — the Kubrick slit-scan look.

    // Per-channel contrast stretch — normalize each channel independently
    // so even dark footage uses the full 0-1 range
    vec3 stretched = clamp((texColor - 0.05) / 0.55, 0.0, 1.0);
    stretched = pow(stretched, vec3(CONTRAST_BOOST));

    // Convert to HSV — the hue now comes from the actual video color differences
    vec3 hsv = rgb2hsv(stretched);

    // Rotate hue over time — cycling psychedelic palette
    hsv.x = fract(hsv.x + time * GRADIENT_SPEED);

    // Force full saturation — even near-gray pixels become vivid
    hsv.y = 1.0;

    // Boost brightness — keep texture detail but lift everything
    hsv.z = 0.4 + 0.6 * hsv.z;

    return hsv2rgb(hsv);
}

// ---------------------------------------------------------------------------
// Tunnel tracer
// ---------------------------------------------------------------------------

// TECHNIQUE: Analytical ray-plane corridor intersection
// The corridor walls are flat planes at x=±1 or y=±1. Instead of
// raymarching (250 steps!) to find the hit, we compute the exact
// intersection with a single division per wall. This is faster,
// more accurate at the horizon, and eliminates step-count artifacts.

/**
 * Trace an infinite corridor and sample the false-color-graded texture on walls.
 * @param isVertical 0.0 = horizontal walls (x=±1), 1.0 = vertical walls (y=±1)
 */
vec3 traceTunnel(vec2 uv, float time, sampler2D videoTex, float isVertical) {
    // Camera oscillation — subtle drift for organic camera movement
    float oscillation = CAM_OSCILLATION_BASE * sin(time * CAM_OSCILLATION_FREQ1)
                        * (1.0 + CAM_OSCILLATION_BASE * cos(time * CAM_OSCILLATION_FREQ2));

    // Camera setup — slightly off-center, looking mostly down the corridor
    vec3 camPos = vec3(oscillation, sin(time * CAM_OSCILLATION_FREQ3) * oscillation * oscillation, -1.0);
    vec3 forward = normalize(mix(-camPos, vec3(0.0, 0.0, 1.0), CAM_FORWARD_MIX));
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = cross(forward, up);

    // Ray direction — project screen pixel through camera basis
    vec3 screenPoint = camPos + forward * FOV_ZOOM + uv.x * right + uv.y * up;
    vec3 rayDir = normalize(screenPoint - camPos);

    // Analytical ray-plane intersection for corridor walls
    float rd = mix(rayDir.x, rayDir.y, isVertical);
    float ro = mix(camPos.x, camPos.y, isVertical);

    float t1 = ( 1.0 - ro) / rd;  // +1 wall
    float t2 = (-1.0 - ro) / rd;  // -1 wall

    float rayLength = (t1 > 0.0 && t2 > 0.0) ? min(t1, t2)
                    : max(t1, t2);

    vec3 rayPos = camPos + rayDir * max(rayLength, 0.0);
    bool hitWall = rayLength > 0.0;

    // Start with graded video — visible through the corridor center
    vec2 fillUV = uv * 0.25 + 0.5;  // Map centered coords back to [0,1] range
    vec3 col = kubrickGrade(texture(videoTex, fract(fillUV + time * 0.03)).rgb, time);

    if (hitWall) {
        // Compute wall UVs
        vec2 wallUV_horiz = vec2(rayPos.z, rayPos.y + step(rayPos.x, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);
        vec2 wallUV_vert = vec2(rayPos.z, rayPos.x + step(rayPos.y, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);
        vec2 wallUV = mix(wallUV_horiz, wallUV_vert, isVertical);
        wallUV.x += time * WALL_UV_TIME_SCROLL;

        // Sample video texture
        vec2 sampleUV = fract(wallUV * WALL_UV_TILE_SCALE);
        vec3 wallColor = texture(videoTex, sampleUV).rgb;

        // Noise variation for organic distortion
        float noiseVal = valueNoise2D(wallUV * NOISE_WARP_SCALE) * 2.0 - 1.0;
        vec3 noiseColor = texture(videoTex, fract(sampleUV + noiseVal * NOISE_WARP_AMOUNT)).rgb;

        // Animated mix between clean and noise-warped sample
        float mixFactor = MIX_BASE + MIX_AMPLITUDE * sin(MIX_FREQUENCY * time);
        wallColor = mix(noiseColor, wallColor, mixFactor);

        // Apply Kubrick false-color grading — this IS the color, no further hue shift needed
        wallColor = kubrickGrade(wallColor, time);

        col = wallColor;
    }

    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    // === KUBRICK-GRADED BASE VIDEO ===
    vec3 baseColor = texture(iChannel0, uv).rgb;

    // Fallback gradient if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        baseColor = vec3(0.1, 0.1, 0.15);
        baseColor += vec3(0.05, 0.1, 0.15) * (1.0 - length(uv - 0.5));
    }

    // Apply false-color to the base video too — full-screen Kubrick look
    vec3 gradedBase = kubrickGrade(baseColor, time);

    // === TUNNEL ===
    float tunnelOrientation = mod(floor(time / ORIENT_SWITCH_INTERVAL), 2.0);

    vec2 tunnelUV = (uv - 0.5) * 2.0;
    tunnelUV.x *= aspect;

    // Trace tunnel — walls already use kubrickGrade internally
    vec3 tunnelColor = traceTunnel(tunnelUV, time, iChannel0, tunnelOrientation);

    // === COMPOSITING ===
    vec3 color = tunnelColor;

    // === SEAM FADE ===
    // Feathered black stripe along the corridor center where walls converge.
    // isVertical=0 (walls at x=±1): seam is vertical (fade on x distance)
    // isVertical=1 (walls at y=±1): seam is horizontal (fade on y distance)
    float seamDist = mix(abs(uv.x - 0.5), abs(uv.y - 0.5), tunnelOrientation);
    float seamFade = smoothstep(0.0, 0.12, seamDist);  // Fades from black at seam to full color ~12% out
    color *= seamFade;

    // === POST ===
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    // === DEBUG: PiP video monitor (bottom-right corner) ===
    vec2 pipSize = vec2(0.25, 0.25);  // 25% of screen
    vec2 pipOrigin = vec2(1.0 - pipSize.x, 0.0);  // bottom-right
    if (uv.x > pipOrigin.x && uv.y < pipSize.y) {
        vec2 pipUV = (uv - pipOrigin) / pipSize;
        vec3 raw = texture(iChannel0, pipUV).rgb;
        // Left half: raw video, Right half: graded
        if (pipUV.x < 0.5) {
            color = raw;
        } else {
            color = kubrickGrade(raw, time);
        }
        // Border
        if (abs(uv.x - pipOrigin.x) < 0.002 || abs(uv.y - pipSize.y) < 0.002 ||
            abs(pipUV.x - 0.5) < 0.005) {
            color = vec3(1.0);
        }
    }

    fragColor = vec4(color, 1.0);
}
