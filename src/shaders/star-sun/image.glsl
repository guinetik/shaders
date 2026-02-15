/**
 * Solar Star
 * @author guinetik
 * @date 2025-11-29
 *
 * Our Sun -- a yellow-white G-type main sequence star with balanced convection
 * cells, moderate flare activity, and a warm corona glow. Temperature set to
 * 5778K, the measured effective temperature of the Sun.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle warm tint
 *   2. Glow            — inverse-square radial falloff, warm yellow-orange
 *   3. Corona          — FBM flame tendrils + 3 cyclic prominences
 *   4. Star surface    — convection cells, plasma flow, sunspots, limb darkening
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera, identical structure
 * to the red dwarf shader but with tuned parameters for a G-type star.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.4). The exponent is slightly
 * higher than the red dwarf (0.35), producing a gentler falloff consistent with
 * the Sun's radiative/convective boundary layer structure.
 *
 * TECHNIQUE: Moderate prominence activity. 3 prominences (vs 4 for red dwarf)
 * with slower lifecycle oscillation and tighter angular masking, reflecting the
 * Sun's calmer magnetic activity compared to fully-convective red dwarfs.
 *
 * Physics: Color palette approximates ~5778K blackbody radiation — warm
 * yellow-white surface with orange-tinted cooler granule edges and near-white
 * hot granule centers. Sunspots are darker (smoothstep threshold 0.55-0.8)
 * and less frequent than on the red dwarf.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation), same as the red dwarf
 * shader. FBM octave counts are identical but frequency multipliers are lower,
 * producing larger, smoother convection cells appropriate for a larger star.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Same simplex noise implementation as the red dwarf shader. Smooth, isotropic
// gradients produce convincing stellar surface turbulence.

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
// Same structure as red dwarf but called with lower base frequencies
// to produce the Sun's larger, smoother convection features.
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
// SOLAR PALETTE — yellow-white with warm tones
// =============================================================================
// Physics: ~5778K blackbody color ramp. The Sun's peak emission is in the
// green-yellow band (Wien's law: ~500nm), but the broad spectrum appears
// yellow-white to the human eye.

vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.35, 0.12, 0.02);    // Dark sunspot — ~3500-4500K cooler magnetic region
    const vec3 COOL     = vec3(0.9, 0.5, 0.1);       // Cooler granule edge — intergranular lanes
    const vec3 WARM     = vec3(1.0, 0.75, 0.3);      // Warm surface — average photosphere
    const vec3 HOT      = vec3(1.0, 0.92, 0.6);      // Hot granule center — convective upwelling
    const vec3 BRIGHT   = vec3(1.0, 1.0, 0.9);       // Brightest — near white, flare or facular region

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE — moderate activity (G-type main sequence)
// =============================================================================
// Convection frequencies are lower than the red dwarf (4.5/10/20 vs 5/12/25)
// and time multipliers are slower, producing larger, calmer granulation cells
// consistent with the Sun's ~1000km granule size.

float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 4.5 + vec3(0.0, time * 0.015, 0.0));    // Large granules — freq 4.5
    float med = snoise(p * 10.0 + vec3(time * 0.01, 0.0, time * 0.008)); // Medium detail — freq 10.0
    float fine = snoise(p * 20.0 + vec3(0.0, time * 0.02, time * 0.015)); // Fine texture — freq 20.0
    return cells * 0.5 + med * 0.3 + fine * 0.2;  // Weighted blend
}

// Sunspots — cooler magnetic regions. Lower frequency (2.5) and higher
// threshold (0.55) than red dwarf = fewer, larger spots. The Sun's ~11-year
// cycle produces 0-200 spots; this approximates moderate activity.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 2.5 + vec3(0.0, time * 0.004, 0.0));  // Freq 2.5 — large spot groups
    return smoothstep(0.55, 0.8, spots);  // Higher threshold = fewer spots than red dwarf (0.5)
}

float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 3.0;
    q += vec3(sin(time * 0.08) * 0.25, cos(time * 0.1) * 0.25, time * 0.04);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    vec3 r = p * 4.0 + vec3(50.0);
    r += vec3(cos(time * 0.06) * 0.3, sin(time * 0.09) * 0.25, time * 0.05);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — moderate activity parameters compared to red dwarf.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    float plasma = plasmaFlow(spherePos, time);
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;
    float spots = starSpots(spherePos, time);

    // Gentler pulse than red dwarf — +/-8% vs +/-10%
    float pulse = 0.92 + 0.08 * sin(time * 0.4 + snoise(spherePos * 2.0) * 3.0);

    float heat = plasma * 0.6 + cells * 0.4;
    heat *= pulse;
    heat *= 1.0 - spots * 0.65;   // 65% spot darkening (vs 70% for red dwarf)

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.4). Slightly gentler than
    // red dwarf (0.35) due to Sun's radiative-convective boundary structure.
    float limb = pow(viewAngle, 0.4);
    heat *= 0.7 + limb * 0.3;

    // Moderate edge flares — steeper falloff (2.5) and lower intensity (0.2)
    // than red dwarf (2.0, 0.3), reflecting the Sun's calmer magnetic activity
    float edgeFlare = pow(edgeDist, 2.5) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);
    heat += edgeFlare * 0.2;

    heat = clamp(heat, 0.0, 1.0);

    vec3 color = starRamp(heat) * (1.5 + heat * 1.5);
    // Yellow-white granule highlights — warmer tint than red dwarf's orange
    color += vec3(1.0, 0.85, 0.4) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 1.5;

    return color;
}

// =============================================================================
// GLOW AND CORONA — warm yellow-white
// =============================================================================

// Radial glow — same structure as red dwarf but with yellow-white tint and
// slightly lower intensity (0.12 vs 0.15) for the Sun's more moderate luminosity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    float glow = 1.0 / (r * r * 1.5 + 0.01);     // Inverse-square falloff
    glow *= smoothstep(4.0, 1.0, r);               // Fade beyond 4x radius
    vec3 glowColor = vec3(1.0, 0.7, 0.2) * glow * 0.12;  // Warm yellow glow

    float haze = 1.0 / (r * r * 5.0 + 0.1);       // Outer haze layer
    haze *= smoothstep(6.0, 1.5, r);
    glowColor += vec3(0.8, 0.4, 0.08) * haze * 0.08;  // Orange outer haze

    return glowColor;
}

// Corona — same structure as red dwarf but with calmer parameters:
// - Steeper decay (4.5 vs 4.0) = more concentrated near surface
// - Lower base intensity (0.7 vs 0.9)
// - Only 3 prominences at 1.0x brightness (vs 4 at 1.5x)
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);

    float rimFactor = (r - 1.0);
    float angle = atan(p.y, p.x);

    // Two-layer flame pattern — slightly slower than red dwarf (0.25/0.18 vs 0.3/0.2)
    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.25), 4);
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.18), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    float fade = exp(-rimFactor * 4.5);       // Steeper decay than red dwarf (4.5 vs 4.0)
    float intensity = flames * fade * 0.7;     // Lower base intensity — calmer corona

    // Fewer, calmer prominences — 3 (vs 4 for red dwarf)
    // Tighter angular mask (10.0 vs 8.0) and slower lifecycle (0.2 vs 0.25)
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.4) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 10.0);  // Narrower than red dwarf (10 vs 8)
        float lifecycle = max(sin(time * 0.2 * (1.0 + fi * 0.3) + fi * 2.5), 0.0);
        intensity += promMask * lifecycle * fade * 1.0;        // 1.0x prominence (vs 1.5x for red dwarf)
    }

    vec3 coronaColor = mix(vec3(1.0, 0.75, 0.25), vec3(1.0, 0.5, 0.08), rimFactor);
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

    // Slightly slower orbit than red dwarf (0.12 vs 0.15)
    float rotX = time * 0.12;              // Horizontal orbit speed
    float rotY = sin(time * 0.06) * 0.25;  // Vertical bob — gentler than red dwarf (+/-0.25 vs 0.3)

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

    // Project world-space radius to screen space for glow/corona alignment
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);  // Near-black background with warm tint

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

            float starRot = time * 0.04;  // Axial rotation — slower than red dwarf (0.04 vs 0.05)
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

    // Tone mapping — Reinhard with 1.8x exposure (same as red dwarf)
    color *= 1.8;
    color = color / (color + vec3(1.0));
    color += vec3(0.008, 0.004, 0.0);   // Warm tint to blacks
    color = pow(color, vec3(0.85));      // Gamma — brighter than standard 0.45

    fragColor = vec4(color, 1.0);
}
