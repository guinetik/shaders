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
 */

// Hash function
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// 2D Noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// FBM (Fractal Brownian Motion)
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
    }
    return v;
}

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

    float t = iTime * 0.3;

    // Mouse influence (Shadertoy uses iMouse.xy / iResolution.xy)
    // In Shadertoy: fragCoord.y=0 at top, iMouse.y=0 at top
    // p.y = (uv.y - 0.5) * 2.0, so p.y = -1 at top, +1 at bottom
    // We need mouse.y to match: mouse.y = -1 at top, +1 at bottom
    vec2 mouse = (iMouse.xy / iResolution.xy) * 2.0 - 1.0;
    mouse.x *= aspect;
    // No Y flip needed - both use same coordinate system

    float mouseDist = length(p - mouse);
    float mouseActive = (iMouse.z > 0.0) ? 1.0 : 0.0;
    float mouseInf = smoothstep(1.2, 0.0, mouseDist) * mouseActive;

    // Warping intensity (can animate or set to 1.0)
    float warpIntensity = 1.0;

    // Pulsing effect from warped coordinates - creates expanding rings
    float pulse = sin(t * 2.0 + warpIntensity * 10.0) * 0.5 + 0.5;
    float centerDist = length(p);
    float ring1 = sin(centerDist * 8.0 - t * 4.0) * 0.5 + 0.5;
    float ring2 = sin(centerDist * 12.0 - t * 6.0 + 1.0) * 0.5 + 0.5;
    float rings = (ring1 + ring2) * 0.5;
    rings *= smoothstep(0.8, 0.0, centerDist) * smoothstep(0.0, 0.3, centerDist);

    // === DOMAIN WARPING LAYERS ===
    // Start with base coordinates
    vec2 pp = p;

    // Layer 0: Mouse-reactive domain distortion
    // Warp coordinates based on mouse position for interactive effect
    pp -= mouse * mouseInf * 0.4;

    // Layer 1: Rotating domain warp
    // Rotate the coordinate space for dynamic motion
    pp = rotate(pp, t * 0.1);

    // Layer 2: First FBM warp layer
    // Sample FBM noise at different offsets to create warping vectors
    vec2 q = vec2(
        fbm(pp * 2.0 + t * 0.3),
        fbm(pp * 2.0 + vec2(5.2, 1.3) + t * 0.35)
    );

    // Layer 3: Recursive domain warping
    // Warp the already-warped coordinates (q) for complex patterns
    vec2 r = vec2(
        fbm(pp + q * 2.5 + vec2(1.7, 9.2) + t * 0.4),
        fbm(pp + q * 2.5 + vec2(8.3, 2.8) + t * 0.38)
    );

    // Additional warping: Time-based sinusoidal distortion
    // Adds pulsing energy to the warp pattern
    float warpBoost = pulse * warpIntensity;
    r += warpBoost * vec2(
        sin(t * 3.0 + centerDist * 5.0),
        cos(t * 3.0 + centerDist * 5.0)
    ) * 0.3;

    // Additional warping: Mouse-reactive distortion
    // Interactive domain warping based on mouse proximity
    float mouseWarp = mouseInf * 2.5;
    r += mouseWarp * vec2(
        sin(t * 6.0 + mouseDist * 10.0),
        cos(t * 6.0 + mouseDist * 10.0)
    ) * 0.4;

    // Final pattern: Sample FBM using the heavily warped coordinates
    // The multiple layers of warping create complex, organic patterns
    float f = fbm(pp + q + r * 1.2);
    float f2 = fbm(pp * 1.5 + r * 1.8 + t * 0.25);

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
    float glowIntensity = mouseInf * 1.8;
    // Add dark core in center of mouse glow
    float darkCore = smoothstep(0.15, 0.0, mouseDist) * mouseInf;
    color = mix(color, col1, darkCore * 0.3);
    color += glowCol * glowIntensity;

    // Mouse ripple rings - cyan with dark gaps
    float ripple = sin(mouseDist * 20.0 - t * 10.0) * 0.5 + 0.5;
    ripple *= mouseInf * smoothstep(0.0, 1.0, mouseDist);
    // Add dark gaps between ripples
    float darkRipple = smoothstep(0.05, 0.0, abs(sin(mouseDist * 20.0 - t * 10.0))) * mouseInf;
    color = mix(color, col1, darkRipple * 0.2);
    color += vec3(0.0, 0.7, 1.0) * ripple * 0.9;

    // Overall brightness - modulated by warp intensity
    color *= 1.0 + warpBoost * 0.5;

    // Vignette
    float vig = 1.0 - length(uv - 0.5) * 0.4;
    color *= vig;

    // Clamp
    color = clamp(color, 0.0, 1.0);

    fragColor = vec4(color, 1.0);
}
