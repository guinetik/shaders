/**
 * Gravity Well Study
 *
 * @author guinetik
 * @date 2026-01-29
 * @project Genuary 2026
 * @see https://genuary2026.guinetik.com
 *
 * Gravitational lensing effect that warps input images through orbiting
 * singularities. Wells sample and boost colors from the texture beneath
 * them for glowing halos, while dark cores create the event horizon effect.
 *
 * Techniques:
 * - Inverse-square gravitational lensing via gravityWarp()
 * - Multi-well interference warping (1 central + 4 orbiting)
 * - Image-based color sampling at well positions for glow tinting
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// --- Well parameters ---
#define WELL_COUNT 4                // Number of orbiting wells around the central well.
#define CENTER_OSCILLATION 0.15     // Amplitude of central well's wander — higher sends the center further from origin.
                                    // Below 0.05: nearly stationary. Above 0.3: center drifts off-screen.
#define CENTER_MASS_BASE 0.06       // Baseline pull strength of the central well.
                                    // Below 0.03: barely visible warp. Above 0.12: extreme singularity.
#define CENTER_MASS_AMP 0.02        // How much the central mass pulses over time.
                                    // 0.0: steady pull. Above 0.04: dramatic breathing effect.
#define CENTER_SOFTNESS 0.01        // Singularity softening for center — prevents division-by-zero warp.
                                    // Lower (0.001): sharper, more singular. Higher (0.05): broad gentle lens.

// --- Orbit parameters ---
#define ORBIT_RADIUS_BASE 0.35      // Mean orbital distance of the 4 wells from center.
                                    // Below 0.2: clustered tightly. Above 0.5: near screen edges.
#define ORBIT_RADIUS_AMP 0.1        // Radial oscillation per orbiting well — adds elliptical variation.
                                    // 0.0: perfect circles. Above 0.2: highly eccentric orbits.
#define ORBIT_MASS_BASE 0.025       // Baseline pull strength of each orbiting well.
                                    // Below 0.01: subtle ripple. Above 0.05: strong secondary lensing.
#define ORBIT_SOFTNESS 0.015        // Singularity softening for orbiters — slightly gentler than center.
                                    // Lower: tighter warp rings. Higher: diffuse lensing.

// --- Glow parameters ---
#define GLOW_RADIUS_CENTER 0.25     // Smoothstep outer edge for center glow halo.
                                    // Smaller: tighter hotspot. Larger: wide diffuse aura.
#define GLOW_RADIUS_ORBIT 0.15      // Smoothstep outer edge for orbiter glow halos.
                                    // Smaller: pinpoint gleam. Larger: broad haze.
#define GLOW_BRIGHTNESS_MULT 1.5    // Color multiplier for sampled glow tint — boosts the texture color.
                                    // 1.0: natural. Above 2.0: blown-out neon.
#define GLOW_BRIGHTNESS_ADD 0.3     // Additive floor ensuring glow is visible even on dark textures.
                                    // 0.0: dark areas stay dark. Above 0.5: washed-out whites.
#define GLOW_BLEND 0.6              // How strongly the accumulated glow mixes into the final image.
                                    // 0.0: no glow. 1.0: intense halation.

// --- Core parameters (event horizon) ---
#define CORE_OUTER_CENTER 0.06      // Outer smoothstep edge for center's dark core.
                                    // Larger: wider dark zone. Smaller: pinpoint black hole.
#define CORE_INNER_CENTER 0.02      // Inner smoothstep edge — fully dark inside this radius.
#define CORE_ALPHA_CENTER 0.9       // Opacity of center core darkening (0–1). 1.0 = pure black.
#define CORE_OUTER_ORBIT 0.04       // Outer smoothstep edge for orbiter dark cores.
#define CORE_INNER_ORBIT 0.015      // Inner smoothstep edge for orbiter dark cores.
#define CORE_ALPHA_ORBIT 0.85       // Opacity of orbiter core darkening.

// --- Post-processing ---
#define VIGNETTE_STRENGTH 0.5       // How aggressively edges darken — higher = stronger vignette.
                                    // 0.0: no vignette. Above 0.8: heavy darkening at corners.
#define CONTRAST_POWER 0.95         // Gamma-like contrast tweak applied before final output.
                                    // Below 1.0: slight lift in darks. Above 1.0: crushed shadows.

/**
 * Warp UV toward a gravity point.
 *
 * // TECHNIQUE: Inverse-square gravitational lensing
 * // Models Newtonian gravity: pull = mass / (dist^2 + softness).
 * // The UV is displaced toward `center` by an amount proportional to
 * // 1/r^2, mimicking how light bends around a massive body.
 * // The `softness` parameter acts as a regularization term that prevents
 * // the singularity at dist=0 by adding a floor to the denominator.
 * // Lower softness = sharper warp near the center; higher = gentler falloff.
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
        sin(time * 0.7) * CENTER_OSCILLATION,
        cos(time * 0.5) * CENTER_OSCILLATION
    );
    float centerMass = CENTER_MASS_BASE + sin(time * 2.0) * CENTER_MASS_AMP;
    warped = gravityWarp(warped, center, centerMass, CENTER_SOFTNESS);

    // Orbiting wells
    vec2 wellPositions[WELL_COUNT];
    for (int i = 0; i < WELL_COUNT; i++) {
        float fi = float(i);
        float angle = time * (0.4 + fi * 0.15) + fi * TAU / 4.0;
        float radius = ORBIT_RADIUS_BASE + sin(time * 0.3 + fi) * ORBIT_RADIUS_AMP;
        wellPositions[i] = vec2(cos(angle), sin(angle)) * radius;

        float mass = ORBIT_MASS_BASE * (1.0 + sin(time * 1.5 + fi * 2.0) * 0.5);
        warped = gravityWarp(warped, wellPositions[i], mass, ORBIT_SOFTNESS);
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
    float centerGlow = smoothstep(GLOW_RADIUS_CENTER, 0.0, centerDist);
    vec2 centerSampleUV = center / vec2(aspect, 1.0) + 0.5;
    vec3 centerColor = texture(iChannel0, clamp(centerSampleUV, 0.0, 1.0)).rgb;
    // Boost brightness for glow
    centerColor = centerColor * GLOW_BRIGHTNESS_MULT + GLOW_BRIGHTNESS_ADD;
    glowColor += centerColor * centerGlow;
    totalGlow += centerGlow;

    // Orbiting well glows
    for (int i = 0; i < WELL_COUNT; i++) {
        float dist = length(p - wellPositions[i]);
        float glow = smoothstep(GLOW_RADIUS_ORBIT, 0.0, dist);

        // Sample texture color at well position
        vec2 sampleUV = wellPositions[i] / vec2(aspect, 1.0) + 0.5;
        vec3 wellColor = texture(iChannel0, clamp(sampleUV, 0.0, 1.0)).rgb;
        wellColor = wellColor * GLOW_BRIGHTNESS_MULT + GLOW_BRIGHTNESS_ADD;

        glowColor += wellColor * glow;
        totalGlow += glow;
    }

    // Apply glow
    color += glowColor * GLOW_BLEND;

    // === DARK CORES ===
    float core = smoothstep(CORE_OUTER_CENTER, CORE_INNER_CENTER, length(p - center));
    color *= 1.0 - core * CORE_ALPHA_CENTER;

    for (int i = 0; i < WELL_COUNT; i++) {
        float coreDist = length(p - wellPositions[i]);
        float coreAlpha = smoothstep(CORE_OUTER_ORBIT, CORE_INNER_ORBIT, coreDist);
        color *= 1.0 - coreAlpha * CORE_ALPHA_ORBIT;
    }

    // === POST ===
    // Vignette
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    // Slight contrast boost
    color = pow(max(color, vec3(0.0)), vec3(CONTRAST_POWER));

    fragColor = vec4(color, 1.0);
}
