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
 *   3. Corona          — FBM flame tendrils + only 2 subtle prominences
 *   4. Star surface    — large smooth convection cells, minimal starspots
 *   5. Tone mapping    — Reinhard at 2.0x exposure (highest of the three stars)
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera. Same architecture as
 * the red dwarf and sun shaders but with the slowest orbital and self-rotation
 * speeds, emphasizing the massive scale of a blue giant.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.5). The highest exponent of
 * the three star types, producing the strongest center-to-edge contrast. Hot
 * blue giants have steep temperature gradients in their photospheres.
 *
 * TECHNIQUE: Wider corona (extends to r=2.5 vs r=2.0 for other stars) with
 * slower exponential decay (exp(-rimFactor * 3.0) vs 4.0-4.5), reflecting the
 * powerful radiation pressure of a luminous blue giant.
 *
 * Physics: Color palette approximates ~20000K blackbody radiation — dominated
 * by blue-white emission. Wien's displacement law places peak emission in the
 * UV, so visible light appears strongly blue-shifted. The high base brightness
 * multiplier (2.0 + heat * 1.5) models the extreme luminosity — blue giants
 * can be 10,000-100,000x more luminous than the Sun.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation). Lower frequency
 * multipliers and fewer FBM octaves than cooler stars produce the smoother,
 * larger-scale convection patterns characteristic of massive stellar envelopes.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Same simplex noise implementation as the other star shaders. Lower base
// frequencies are used throughout to produce the smoother, larger-scale
// convection patterns characteristic of massive stellar envelopes.

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Called with fewer octaves (3-4) than the other stars to produce the
// smoother surface characteristic of a massive blue giant.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise(p * f);
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
// All frequencies are the lowest of the three star types (3/7/14 vs Sun's
// 4.5/10/20 vs red dwarf's 5/12/25). The large cells weigh more (0.55) and
// fine detail weighs less (0.15), producing the smooth appearance of a massive
// stellar envelope where convection operates on much larger spatial scales.

float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 3.0 + vec3(0.0, time * 0.01, 0.0));     // Large granules — freq 3.0 (lowest)
    float med = snoise(p * 7.0 + vec3(time * 0.008, 0.0, time * 0.006)); // Medium detail — freq 7.0
    float fine = snoise(p * 14.0 + vec3(0.0, time * 0.015, time * 0.01)); // Fine texture — freq 14.0
    return cells * 0.55 + med * 0.3 + fine * 0.15;  // Large features dominate (0.55 vs 0.5)
}

// Starspots — rarest and most subtle of the three star types.
// Lowest frequency (2.0) and highest threshold (0.6) = very few, faint spots.
// Massive blue giants have weaker magnetic fields relative to their luminosity.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 2.0 + vec3(0.0, time * 0.003, 0.0));  // Freq 2.0 — largest spot scale
    return smoothstep(0.6, 0.85, spots);  // Highest threshold = fewest spots of any star type
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

// Surface rendering — the most stable and luminous of the three star types.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    float plasma = plasmaFlow(spherePos, time);
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;
    float spots = starSpots(spherePos, time);

    // Very subtle pulsing — +/-5% (vs +/-8% Sun, +/-10% red dwarf)
    float pulse = 0.95 + 0.05 * sin(time * 0.3 + snoise(spherePos * 1.5) * 2.0);

    float heat = plasma * 0.65 + cells * 0.35;  // Plasma dominates even more
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;   // 50% spot darkening — mildest of all (vs 65% Sun, 70% red dwarf)

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.5), strongest of the three
    // star types. Hot blue giants have steep photospheric temperature gradients.
    float limb = pow(viewAngle, 0.5);
    heat *= 0.65 + limb * 0.35;   // 35% range — strongest center-to-edge contrast

    // Minimal edge flares — blue giants are more stable due to their
    // radiation-dominated envelopes (less convective turbulence at surface)
    float edgeFlare = pow(edgeDist, 3.0) * fbm(spherePos * 6.0 + vec3(time * 0.1), 3);
    heat += edgeFlare * 0.12;     // Lowest flare contribution (vs 0.2 Sun, 0.3 red dwarf)

    heat = clamp(heat, 0.0, 1.0);

    // Highest base brightness multiplier: (2.0 + heat*1.5) gives range [2.0, 3.5]
    // vs [1.5, 3.0] for other stars. Models 10,000-100,000x solar luminosity.
    vec3 color = starRamp(heat) * (2.0 + heat * 1.5);
    // Blue-white granule highlights
    color += vec3(0.7, 0.8, 1.0) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 1.2;

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
    float angle = atan(p.y, p.x);

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
    float rotX = time * 0.1;               // Horizontal orbit (slowest: 0.1 vs 0.12 vs 0.15)
    float rotY = sin(time * 0.04) * 0.2;   // Vertical bob — gentlest (+/-0.2 vs 0.25 vs 0.3)

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
            float starRot = time * 0.03;
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
