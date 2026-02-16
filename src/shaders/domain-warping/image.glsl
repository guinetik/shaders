/**
 * Domain Warping Study
 * @author guinetik
 * @date 2026-01-27
 *
 * Multi-layer domain warping with recursive coordinate distortion.
 * Uses Inigo Quilez's classic domain warping approach: f(p + f(p + f(p))).
 *
 * Domain Warping Techniques:
 * - Multi-layer FBM noise for base pattern
 * - Recursive domain warping (warping the warped coordinates)
 * - Rotating domain warp for dynamic motion
 * - Mouse-reactive warping (interactive domain distortion)
 * - Time-based warping for animation
 *
 * Color Palette:
 * - Terminal green base (col2-col4) for the "hacker aesthetic"
 * - Orange/pink/purple accents (col5-col7) mapped to warp layers q, r, f2
 *   so each color appears in different warping regimes
 * - Black vortex centers (col1) create contrast against bright folds
 *
 * Visual Features:
 * - Dark vortex areas for contrast
 * - Cyan mouse interactions for visibility
 * - Pulsing rings from warped coordinates
 *
 * Noise: Uses noise-value.glsl commons (sin-hash family, fbmValue2D).
 */

// --- FBM Warp Parameters ---
#define FBM_OCTAVES 6           // Noise detail — more octaves = finer detail, higher cost.
                                // 4: fast/smooth. 6: good detail. 8: expensive/sharp.
#define FBM_LACUNARITY 2.0      // Frequency multiplier per octave — 2.0 is standard doubling.
#define FBM_GAIN 0.5            // Amplitude decay per octave — 0.5 = each octave half as strong.
#define WARP_FREQ 2.0           // Base frequency for FBM warp sampling — higher = tighter patterns.
#define WARP_Q_SCALE 2.5        // How strongly layer-1 warp (q) feeds into layer-2 (r).
                                // Below 1.0: subtle. Above 3.0: chaotic folding.
#define WARP_R_SCALE 1.2        // How strongly recursive warp (r) feeds into final pattern.
#define WARP_F2_FREQ 1.5        // Frequency for secondary pattern (f2) — offset from main for variety.
#define WARP_F2_R_SCALE 1.8     // How strongly r feeds into f2 — higher = more recursion visible.

// --- Time Multipliers ---
#define TIME_SCALE 0.3          // Global time scale — controls overall animation speed.
#define TIME_Q_X 0.3            // Time offset speed for q.x FBM sampling.
#define TIME_Q_Y 0.35           // Time offset speed for q.y FBM sampling.
#define TIME_R_X 0.4            // Time offset speed for r.x FBM sampling.
#define TIME_R_Y 0.38           // Time offset speed for r.y FBM sampling.
#define TIME_F2 0.25            // Time offset speed for f2 pattern.
#define TIME_ROTATE 0.1         // Rotation speed — full revolution ~63 seconds at 0.1.

// --- FBM Offset Vectors ---
// TECHNIQUE: Spatial offsets decorrelate FBM channels
// Without offsets, q.x and q.y would sample the same noise field,
// producing identical warping in both axes (boring). These magic offsets
// come from Inigo Quilez's original domain warping article.
#define Q_Y_OFFSET vec2(5.2, 1.3)   // Offset for q.y — separates it from q.x.
#define R_X_OFFSET vec2(1.7, 9.2)   // Offset for r.x — decorrelates from q.
#define R_Y_OFFSET vec2(8.3, 2.8)   // Offset for r.y — decorrelates from r.x.

// --- Mouse Interaction ---
#define MOUSE_RADIUS 1.2        // Influence falloff radius — larger = wider effect area.
                                // Below 0.5: very localized. Above 2.0: covers most of screen.
#define MOUSE_WARP_DOMAIN 0.4   // Domain distortion strength from mouse proximity.
#define MOUSE_WARP_R 2.5        // How strongly mouse warps the r layer.
#define MOUSE_WARP_RIPPLE 0.4   // Amplitude of mouse ripple sinusoidal distortion.
#define MOUSE_GLOW_STRENGTH 1.8 // Brightness of the cyan mouse glow halo.

// --- Ring Effect ---
#define RING1_FREQ 8.0          // Spatial frequency of inner ring pattern.
#define RING1_SPEED 4.0         // Animation speed of inner rings.
#define RING2_FREQ 12.0         // Spatial frequency of outer ring pattern — higher = tighter.
#define RING2_SPEED 6.0         // Animation speed of outer rings.
#define RING_FADE_OUTER 0.8     // Rings fade beyond this radius from center.
#define RING_FADE_INNER 0.3     // Rings fade within this radius (prevents center blob).

// --- Pulse & Warp Boost ---
#define PULSE_SPEED 2.0         // Pulsing oscillation rate — higher = faster throb.
#define PULSE_WARP_SCALE 10.0   // How much warpIntensity modulates pulse phase.
#define WARP_BOOST_FREQ 3.0     // Sinusoidal warp boost frequency.
#define WARP_BOOST_SPATIAL 5.0  // Spatial modulation of warp boost by distance from center.
#define WARP_BOOST_AMP 0.3      // Amplitude of time-based warp boost.

// --- Mouse Ripple ---
#define RIPPLE_SPATIAL_FREQ 20.0  // Spatial frequency of mouse ripple rings — higher = tighter.
#define RIPPLE_SPEED 10.0         // Animation speed of ripple expansion.
#define RIPPLE_BRIGHTNESS 0.9     // Brightness of cyan ripple rings.
#define RIPPLE_DARK_GAP 0.2       // Darkness of gaps between ripple rings.

// --- Vignette ---
#define VIGNETTE_STRENGTH 0.4   // Edge darkening intensity — 0.0 = none, 1.0 = heavy.
                                // 0.4 gives subtle framing without crushing edges.

// Rotate 2D
vec2 rotate(vec2 p, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;

    // Centered coordinates
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;

    float t = iTime * TIME_SCALE;

    // Mouse influence (Shadertoy uses iMouse.xy / iResolution.xy)
    // In Shadertoy: fragCoord.y=0 at top, iMouse.y=0 at top
    // p.y = (uv.y - 0.5) * 2.0, so p.y = -1 at top, +1 at bottom
    // We need mouse.y to match: mouse.y = -1 at top, +1 at bottom
    vec2 mouse = (iMouse.xy / iResolution.xy) * 2.0 - 1.0;
    mouse.x *= aspect;
    // No Y flip needed - both use same coordinate system

    float mouseDist = length(p - mouse);
    float mouseActive = (iMouse.z > 0.0) ? 1.0 : 0.0;
    float mouseInf = smoothstep(MOUSE_RADIUS, 0.0, mouseDist) * mouseActive;

    // Warping intensity (can animate or set to 1.0)
    float warpIntensity = 1.0;

    // Pulsing effect from warped coordinates - creates expanding rings
    float pulse = sin(t * PULSE_SPEED + warpIntensity * PULSE_WARP_SCALE) * 0.5 + 0.5;
    float centerDist = length(p);
    float ring1 = sin(centerDist * RING1_FREQ - t * RING1_SPEED) * 0.5 + 0.5;
    float ring2 = sin(centerDist * RING2_FREQ - t * RING2_SPEED + 1.0) * 0.5 + 0.5;
    float rings = (ring1 + ring2) * 0.5;
    rings *= smoothstep(RING_FADE_OUTER, 0.0, centerDist) * smoothstep(0.0, RING_FADE_INNER, centerDist);

    // === DOMAIN WARPING LAYERS ===
    // Start with base coordinates
    vec2 pp = p;

    // Layer 0: Mouse-reactive domain distortion
    // Warp coordinates based on mouse position for interactive effect
    pp -= mouse * mouseInf * MOUSE_WARP_DOMAIN;

    // Layer 1: Rotating domain warp
    // Rotate the coordinate space for dynamic motion
    pp = rotate(pp, t * TIME_ROTATE);

    // Layer 2: First FBM warp layer
    // Sample FBM noise at different offsets to create warping vectors
    // TECHNIQUE: Domain warping via Inigo Quilez's f(p + f(p + f(p)))
    // Each layer samples FBM at offset coordinates, producing organic folding.
    vec2 q = vec2(
        fbmValue2D(pp * WARP_FREQ + t * TIME_Q_X, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN),
        fbmValue2D(pp * WARP_FREQ + Q_Y_OFFSET + t * TIME_Q_Y, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN)
    );

    // Layer 3: Recursive domain warping
    // Warp the already-warped coordinates (q) for complex patterns
    vec2 r = vec2(
        fbmValue2D(pp + q * WARP_Q_SCALE + R_X_OFFSET + t * TIME_R_X, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN),
        fbmValue2D(pp + q * WARP_Q_SCALE + R_Y_OFFSET + t * TIME_R_Y, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN)
    );

    // Additional warping: Time-based sinusoidal distortion
    // Adds pulsing energy to the warp pattern
    float warpBoost = pulse * warpIntensity;
    r += warpBoost * vec2(
        sin(t * WARP_BOOST_FREQ + centerDist * WARP_BOOST_SPATIAL),
        cos(t * WARP_BOOST_FREQ + centerDist * WARP_BOOST_SPATIAL)
    ) * WARP_BOOST_AMP;

    // Additional warping: Mouse-reactive distortion
    // Interactive domain warping based on mouse proximity
    float mouseWarp = mouseInf * MOUSE_WARP_R;
    r += mouseWarp * vec2(
        sin(t * 6.0 + mouseDist * RIPPLE_SPATIAL_FREQ * 0.5),
        cos(t * 6.0 + mouseDist * RIPPLE_SPATIAL_FREQ * 0.5)
    ) * MOUSE_WARP_RIPPLE;

    // Final pattern: Sample FBM using the heavily warped coordinates
    // The multiple layers of warping create complex, organic patterns
    float f = fbmValue2D(pp + q + r * WARP_R_SCALE, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN);
    float f2 = fbmValue2D(pp * WARP_F2_FREQ + r * WARP_F2_R_SCALE + t * TIME_F2, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN);

    // === COLOR MAPPING ===
    // Terminal green base with celebration accents; each accent is driven
    // by a different warp layer (q, r, f2) so colors separate spatially
    vec3 col1 = vec3(0.0, 0.0, 0.0);        // Black — vortex centers
    vec3 col2 = vec3(0.0, 0.2, 0.05);       // Very dark green — shadow regions
    vec3 col3 = vec3(0.0, 0.6, 0.15);       // Medium green — mid-warp zones
    vec3 col4 = vec3(0.0, 0.9, 0.3);        // Bright green — terminal highlights
    vec3 col5 = vec3(1.0, 0.4, 0.0);        // Orange — mapped to q.x (1st warp)
    vec3 col6 = vec3(1.0, 0.0, 0.4);        // Pink — mapped to r.y (2nd warp)
    vec3 col7 = vec3(0.4, 0.0, 0.9);        // Purple — mapped to f2 (recursive warp)

    // Color mixing - green base with celebration colors and dark areas
    vec3 color = col1;

    // Dark areas first for contrast
    float darkMask = smoothstep(0.0, 0.2, f);
    color = mix(color, col2, darkMask * 0.8);

    // Medium green
    color = mix(color, col3, smoothstep(0.2, 0.5, f));

    // Bright green with warp intensity boost
    color = mix(color, col4, smoothstep(0.4, 0.7, f) * (0.6 + warpBoost * 0.4));

    // Accent colors mapped to warped coordinate layers
    color = mix(color, col5, smoothstep(0.5, 0.85, q.x) * pulse * 0.8);
    color = mix(color, col6, smoothstep(0.45, 0.75, r.y) * pulse * 0.7);
    color = mix(color, col7, smoothstep(0.65, 0.95, f2) * pulse * 0.6);

    // Dark vortex areas - add dark spots for contrast
    float darkVortex = smoothstep(0.7, 0.5, f) * smoothstep(0.3, 0.5, f);
    color = mix(color, col1, darkVortex * 0.4);

    // Bright streaks from warped pattern - cyan-green with dark contrast
    float streak = smoothstep(0.6, 0.65, f) * smoothstep(0.7, 0.65, f);
    color += vec3(0.0, 0.8, 0.6) * streak * 2.0 * pulse;

    // Pulsing rings from warped coordinates - brighter green with dark gaps
    color += vec3(0.0, 0.9, 0.25) * rings * 0.9 * pulse;

    // Mouse glow - CYAN with dark core for contrast
    vec3 glowCol = vec3(0.0, 0.85, 1.0);  // Bright cyan
    float glowIntensity = mouseInf * MOUSE_GLOW_STRENGTH;
    // Add dark core in center of mouse glow
    float darkCore = smoothstep(0.15, 0.0, mouseDist) * mouseInf;
    color = mix(color, col1, darkCore * 0.3);
    color += glowCol * glowIntensity;

    // Mouse ripple rings - cyan with dark gaps
    float ripple = sin(mouseDist * RIPPLE_SPATIAL_FREQ - t * RIPPLE_SPEED) * 0.5 + 0.5;
    ripple *= mouseInf * smoothstep(0.0, 1.0, mouseDist);
    // Add dark gaps between ripples
    float darkRipple = smoothstep(0.05, 0.0, abs(sin(mouseDist * RIPPLE_SPATIAL_FREQ - t * RIPPLE_SPEED))) * mouseInf;
    color = mix(color, col1, darkRipple * RIPPLE_DARK_GAP);
    color += vec3(0.0, 0.7, 1.0) * ripple * RIPPLE_BRIGHTNESS;

    // Overall brightness - modulated by warp intensity
    color *= 1.0 + warpBoost * 0.5;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
