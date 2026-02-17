/**
 * Blue Giant Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A massive blue giant with a smooth, intensely luminous surface and powerful
 * corona glow. Temperature at ~20000K with low but steady stellar activity.
 * Smoother, larger-scale features than cooler stars.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with cool blue tint
 *   2. Glow            — inverse-square radial falloff, wider reach than Sun
 *   3. Corona          — FBM flame tendrils + 2 subtle prominences, rotating with star
 *   4. Star surface    — self-emissive granulation (1-abs pattern), cycling spots
 *   5. Tone mapping    — Reinhard at 2.0x exposure (highest of the three stars)
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera. Same architecture as
 * the red dwarf and sun shaders but with the slowest orbital and self-rotation
 * speeds, emphasizing the massive scale of a blue giant.
 *
 * TECHNIQUE: Granulation via 1-abs(noise) creates cell-like patterns — bright
 * broad centers with thin dark boundaries, mimicking convection. Blue giant uses
 * the lowest frequencies (3/7/14) for the smoothest, largest-scale cells.
 *
 * TECHNIQUE: Pure self-emission rendering — no directional lighting. All visual
 * detail comes from heat-to-color mapping through the hand-tuned starRamp palette.
 * Contrast curve (smoothstep 0.2-0.85) is gentler than sun/red dwarf for a
 * smoother, more uniform appearance.
 *
 * TECHNIQUE: Dual-layer cycling starspots — two noise layers at different speeds
 * create spots that form, dissolve, and reappear as layers phase in/out of
 * alignment. Blue giant has the fewest, most subtle spots of all star types.
 *
 * TECHNIQUE: Corona rotation — screen-space angle offset by star's axial rotation
 * so corona tendrils rotate with the surface, maintaining visual coherence.
 *
 * TECHNIQUE: Wider corona (extends to r=2.5 vs r=2.0 for other stars) with
 * slower exponential decay (exp(-rimFactor * 3.0) vs 4.0-4.5), reflecting the
 * powerful radiation pressure of a luminous blue giant.
 *
 * Physics: Color palette approximates ~20000K blackbody radiation — dominated
 * by blue-white emission. Wien's displacement law places peak emission in the
 * UV, so visible light appears strongly blue-shifted. Planck's law can't produce
 * blue colors at any temperature, so the palette is hand-tuned (starRamp).
 *
 * Noise: 3D simplex noise (Ashima Arts implementation). Lower frequency
 * multipliers and fewer FBM octaves than cooler stars produce the smoother,
 * larger-scale convection patterns characteristic of massive stellar envelopes.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Called with fewer octaves (3-4) than the other stars to produce the
// smoother surface characteristic of a massive blue giant.
// NOTE: Kept inline because the domain shift differs from fbmSimplex3D.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise3D(p * f);
        f *= 2.0;         // Double frequency each octave
        a *= 0.5;         // Halve amplitude each octave
        p += vec3(100.0); // Domain shift to decorrelate
    }
    return v;
}

// =============================================================================
// BLUE GIANT PALETTE — blue-white, intensely luminous
// =============================================================================
// Physics: ~20000K blackbody color ramp. Wien's displacement law places peak
// emission at ~145nm (deep UV), so visible light is dominated by the blue tail
// of the Planck distribution. The narrow color range (blue -> near-white)
// reflects the compressed visible portion of such a hot spectrum.

vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.15, 0.2, 0.4);      // Dark blue spot — still blue even when cool
    const vec3 COOL     = vec3(0.5, 0.6, 0.9);       // Cooler blue surface — rare on such a hot star
    const vec3 WARM     = vec3(0.7, 0.8, 1.0);       // Warm blue-white — typical photosphere
    const vec3 HOT      = vec3(0.85, 0.9, 1.0);      // Hot near-white — convective peak
    const vec3 BRIGHT   = vec3(0.95, 0.97, 1.0);     // Intense white-blue — maximum emission

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE — low activity, smooth large-scale features
// =============================================================================
// TECHNIQUE: Granulation via 1-abs(noise) creates cell-like shapes — bright
// convective cell centers with thin dark intergranular lanes.
// All frequencies are the lowest of the three star types (3/7/14 vs Sun's
// 5/10/20 vs red dwarf's 6/14/28). The large cells weigh more (0.55) and
// fine detail weighs less (0.15), producing the smooth appearance of a massive
// stellar envelope where convection operates on much larger spatial scales.

float granulation(vec3 p, float time) {
    // Large cells — primary granulation (lowest frequency of all star types)
    float g1 = 1.0 - abs(snoise3D(p * 3.0 + vec3(0.0, time * 0.05, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 7.0 + vec3(time * 0.04, 0.0, time * 0.03)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 14.0 + vec3(0.0, time * 0.06, time * 0.05)) * 0.5 + 0.5;
    return g1 * 0.55 + g2 * 0.3 + g3 * 0.15;
}

// Starspots — dual-layer cycling. Two noise layers at different speeds create
// spots that form, dissolve, and reappear as layers phase in/out of alignment.
// Blue giant has the fewest, most subtle spots: lowest frequency (2.0/3.0),
// highest threshold (0.55), and slowest drift of all star types.
float starSpots(vec3 p, float time) {
    // Primary spots — slow drift
    float spots1 = snoise3D(p * 2.0 + vec3(0.0, time * 0.03, time * 0.02));
    // Secondary cycle — different frequency creates interference pattern
    float spots2 = snoise3D(p * 3.0 + vec3(time * 0.04, 0.0, time * 0.02) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.55, 0.85, spots);
}

// Plasma flow — lowest frequencies and fewest FBM octaves of any star type.
// Scales 2.5/3.0 (vs red dwarf 3.5/4.5), octaves 4/3 (vs 5/4).
float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 2.5;    // Lowest base frequency — largest flow patterns
    q += vec3(sin(time * 0.06) * 0.2, cos(time * 0.08) * 0.2, time * 0.03); // Slowest drift
    float n1 = fbm(q, 4) * 0.5 + 0.5;   // 4 octaves (vs 5 for red dwarf)

    vec3 r = p * 3.0 + vec3(50.0);       // Secondary flow layer
    r += vec3(cos(time * 0.05) * 0.25, sin(time * 0.07) * 0.2, time * 0.04);
    float n2 = fbm(r, 3) * 0.5 + 0.5;   // Only 3 octaves — smoothest of all

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — pure self-emission, no directional lighting.
// The most stable and luminous of the three star types.
// All visual detail comes from heat-to-color mapping through starRamp.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Very subtle pulsing — +/-5% (vs +/-10% Sun, +/-15% red dwarf)
    float pulse = 0.95 + 0.05 * sin(time * 0.3 + snoise3D(spherePos * 1.5) * 2.0);

    // Heat map — equal blend for smooth look
    float heat = cells * 0.5 + plasma * 0.5;
    heat *= pulse;
    heat *= 1.0 - spots * 0.35;   // 35% spot darkening — mildest of all

    // Contrast curve — gentler than sun/red dwarf for smoother look
    heat = smoothstep(0.2, 0.85, heat);

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.5), strongest of the three
    // star types. Hot blue giants have steep photospheric temperature gradients.
    float limb = pow(viewAngle, 0.5);
    heat *= 0.6 + limb * 0.4;

    // Minimal edge flares — blue giants are more stable due to their
    // radiation-dominated envelopes (less convective turbulence at surface)
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 3.0) * fbm(spherePos * 6.0 + vec3(time * 0.1), 3);
    heat += edgeFlare * 0.12;     // Lowest flare contribution (vs 0.2 Sun, 0.3 red dwarf)

    heat = clamp(heat, 0.0, 1.0);

    // Uses starRamp (not firePalette) — Planck's law can't produce blue colors
    // at any temperature, so the palette is hand-tuned for ~20000K appearance.
    vec3 color = starRamp(heat) * (1.5 + heat * 2.0);
    // Quadratic emissive boost — hottest regions blaze white-blue
    color += starRamp(1.0) * heat * heat * 0.8;

    return color;
}

// =============================================================================
// GLOW AND CORONA — intense blue-white, wider glow
// =============================================================================

// Radial glow — widest and brightest of all three star types.
// Extends to 5x/7x radius (vs 4x/6x), lower falloff factor (1.2 vs 1.5),
// and highest intensity (0.18 vs 0.12-0.15) — models extreme luminosity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    // Stronger glow — gentler falloff factor (1.2 vs 1.5) and wider reach (5x vs 4x)
    float glow = 1.0 / (r * r * 1.2 + 0.01);
    glow *= smoothstep(5.0, 1.0, r);                        // Extends to 5x radius
    vec3 glowColor = vec3(0.6, 0.75, 1.0) * glow * 0.18;   // Blue-white, 0.18 intensity (highest)

    float haze = 1.0 / (r * r * 4.0 + 0.1);                // Outer haze — gentler falloff (4.0 vs 5.0)
    haze *= smoothstep(7.0, 1.5, r);                        // Extends to 7x radius (widest)
    glowColor += vec3(0.4, 0.5, 0.9) * haze * 0.1;         // Deep blue outer haze

    return glowColor;
}

// Corona — widest extent (2.5x vs 2.0x for other stars) but with calmer,
// smoother flame patterns. Fewer prominences (2) reflect the more stable
// magnetic environment of a massive blue giant.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.5) return vec3(0.0);  // Widest corona range — 2.5x (vs 2.0x)

    float rimFactor = (r - 1.0);
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.09;
    float angle = atan(p.y, p.x) - starRot;

    // Smoother corona — lower angular frequencies (1.5/3.0 vs 2.0/4.0) and
    // only 3 FBM octaves per layer (vs 4/3 for red dwarf)
    float flame1 = fbm(vec3(angle * 1.5, rimFactor * 4.0, time * 0.2), 3);
    float flame2 = fbm(vec3(angle * 3.0 + 10.0, rimFactor * 2.5, time * 0.15), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    // Slowest exponential decay — wider corona powered by extreme radiation pressure
    float fade = exp(-rimFactor * 3.0);       // Gentlest decay (3.0 vs 4.0-4.5)
    float intensity = flames * fade * 0.6;     // Lowest base intensity (0.6 vs 0.7-0.9)

    // Only 2 prominences — fewest of any star type
    // Tightest angular mask (12.0) and slowest lifecycle (0.15)
    for (int i = 0; i < 2; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.5) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 12.0);  // Tightest mask
        float lifecycle = max(sin(time * 0.15 * (1.0 + fi * 0.4) + fi * 3.0), 0.0); // Slowest cycle
        intensity += promMask * lifecycle * fade * 0.8;        // 0.8x brightness (lowest)
    }

    vec3 coronaColor = mix(vec3(0.7, 0.8, 1.0), vec3(0.5, 0.6, 1.0), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;   // World-space star radius
    float focalLength = 1.5;  // Camera focal length

    // Slowest rotation of all three star types — emphasizes massive scale
    float rotX = time * 0.3;               // Horizontal orbit (slowest: 0.3 vs 0.36 vs 0.45)
    float rotY = sin(time * 0.12) * 0.2;   // Vertical bob — gentlest (+/-0.2 vs 0.25 vs 0.3)

    float camDist = 3.5;  // Camera distance
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    // Project world-space radius to screen space
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);  // Near-black background with cool blue tint

    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // Ray-sphere intersection (quadratic formula)
    vec3 oc = camPos;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - starRadius * starRadius;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 hitPos = camPos + rd * t;
            vec3 normal = normalize(hitPos);
            vec3 spherePos = normal;

            // Slowest axial rotation — 0.03 rad/s (vs 0.04 Sun, 0.05 red dwarf)
            float starRot = time * 0.09;
            float cs = cos(starRot), sn = sin(starRot);
            spherePos = vec3(
                spherePos.x * cs + spherePos.z * sn,
                spherePos.y,
                -spherePos.x * sn + spherePos.z * cs
            );

            float viewAngle = max(dot(normal, normalize(camPos - hitPos)), 0.0);
            color = renderSurface(spherePos, viewAngle, time);
        }
    }

    // Tone mapping — Reinhard with highest exposure (2.0x vs 1.8x for others)
    // The higher exposure reflects the extreme luminosity of blue giants
    color *= 2.0;
    color = color / (color + vec3(1.0));

    // Cool blue tint to blacks — opposite of the warm tint used for red/yellow stars
    color += vec3(0.003, 0.004, 0.01);

    // Gamma — same 0.85 exponent as other stars
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
