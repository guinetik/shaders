/**
 * Red Dwarf Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A small, turbulent red dwarf star with orange-red plasma, boiling convection
 * cells, dark starspots, and a warm glowing corona. Temperature locked at ~3000K
 * with high stellar activity.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle blue tint
 *   2. Glow            — inverse-square radial falloff around the star
 *   3. Corona          — FBM-driven flame tendrils + cyclic prominences
 *   4. Star surface    — convection cells, plasma flow, starspots, limb darkening
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection. Unlike the planet shaders (which use
 * analytic Pythagorean projection), the star shaders use a proper 3D camera
 * with orbital rotation and ray-sphere intersection (quadratic formula). This
 * allows the camera to orbit and zoom around the star.
 *
 * TECHNIQUE: Limb darkening. The star's edges are darkened using pow(viewAngle,
 * 0.35), approximating the physical effect where photons escaping at shallow
 * angles traverse more stellar atmosphere. The exponent 0.35 is tuned for a
 * red dwarf's convective envelope (cooler stars show stronger limb darkening).
 *
 * TECHNIQUE: Prominence lifecycle. Corona prominences use a golden-ratio angular
 * distribution (0.618 * i) for even spacing, modulated by sin()-based lifecycle
 * functions so prominences grow and fade over time independently.
 *
 * Physics: Color palette approximates ~3000K blackbody radiation — dominant
 * orange-red emission with occasional yellow-white flare peaks. Red dwarfs
 * are fully convective, so the surface shows vigorous boiling granulation
 * at higher activity levels than hotter stars.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation) chosen for its smooth,
 * isotropic gradients — critical for convincing stellar surface turbulence
 * without visible grid artifacts. FBM with up to 5 octaves for plasma flow.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Chosen for smooth, isotropic gradients essential for convincing stellar
// surface turbulence. Simplex noise has no visible grid artifacts and is
// computationally cheaper than classic Perlin noise in 3D.

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
// Domain offset vec3(100.0) between octaves decorrelates layers.
// 5 octaves for plasma detail, 3-4 for corona flames.
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
// STAR COLOR PALETTE — direct ramp, no normalization that kills brightness
// =============================================================================

// Physics: ~3000K blackbody color ramp. Red dwarfs peak in infrared; visible
// emission is dominated by red-orange. Flare peaks can briefly reach yellow-white.
// Ramp: dark spots -> warm orange -> bright yellow-white
vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.3, 0.08, 0.0);     // Dark starspot — cooler magnetic regions
    const vec3 COOL     = vec3(0.8, 0.25, 0.02);     // Cool surface — typical photosphere
    const vec3 WARM     = vec3(1.0, 0.55, 0.08);     // Warm convection upwelling
    const vec3 HOT      = vec3(1.0, 0.8, 0.3);       // Hot granule center — convective peak
    const vec3 BRIGHT   = vec3(1.0, 0.95, 0.7);      // Brightest flare — transient energy release

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE
// =============================================================================

// Convection granulation — three octaves at hand-tuned frequencies for
// red dwarf's vigorous convective envelope. Higher frequencies than the
// Sun/blue giant reflect the smaller, more turbulent convection cells.
float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 5.0 + vec3(0.0, time * 0.02, 0.0));     // Large granules — freq 5.0
    float med = snoise(p * 12.0 + vec3(time * 0.015, 0.0, time * 0.01)); // Medium detail — freq 12.0
    float fine = snoise(p * 25.0 + vec3(0.0, time * 0.03, time * 0.02)); // Fine turbulence — freq 25.0

    return cells * 0.5 + med * 0.3 + fine * 0.2;  // Weighted blend: large features dominate
}

// Starspots — magnetically active regions where convection is suppressed.
// Red dwarfs have frequent, large starspots due to their fully convective interiors.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 3.0 + vec3(0.0, time * 0.005, 0.0));  // Freq 3.0 — large spot regions
    return smoothstep(0.5, 0.75, spots);  // Only noise peaks become spots. Threshold 0.5 = ~30% coverage.
                                           // Lower threshold = more spots. Higher = fewer, rarer spots.
}

float plasmaFlow(vec3 p, float time) {
    // Boiling plasma with time-varying flow
    vec3 q = p * 3.5;
    q += vec3(sin(time * 0.1) * 0.3, cos(time * 0.13) * 0.3, time * 0.05);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    // Second layer offset for turbulence
    vec3 r = p * 4.5 + vec3(50.0);
    r += vec3(cos(time * 0.08) * 0.4, sin(time * 0.12) * 0.3, time * 0.07);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — combines all stellar surface effects into final color.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    // Plasma base — large-scale flow pattern
    float plasma = plasmaFlow(spherePos, time);

    // Convection granulation — remapped to [0,1]
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;

    // Dark starspots — magnetically suppressed regions
    float spots = starSpots(spherePos, time);

    // Pulsing brightness — simulates global oscillation modes
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise(spherePos * 2.0) * 3.0); // +/-10% variation

    // Combine into a single heat value [0..1]
    float heat = plasma * 0.6 + cells * 0.4;  // Plasma dominates, cells add texture
    heat *= pulse;

    // Darken spots — 70% darkening factor (red dwarfs have prominent spots)
    heat *= 1.0 - spots * 0.7;

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.35) approximates the physical
    // effect where photons escaping at shallow angles traverse more photosphere.
    // Exponent 0.35 tuned for red dwarf's deep convective envelope.
    float limb = pow(viewAngle, 0.35);
    heat *= 0.7 + limb * 0.3;   // 30% intensity range from edge to center

    // Edge brightening for active flares — visible at the limb
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 8.0 + vec3(time * 0.2), 3);
    heat += edgeFlare * 0.3;    // 30% flare contribution — high for an active red dwarf

    heat = clamp(heat, 0.0, 1.0);

    // Map to color — multiplier (1.5 + heat*1.5) gives range [1.5, 3.0] for HDR
    // Hot areas push above 1.0 and get compressed by tone mapping for natural bloom
    vec3 color = starRamp(heat) * (1.5 + heat * 1.5);

    // Extra brightness at center of convection granules — warm orange highlight
    color += vec3(1.0, 0.7, 0.2) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 2.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

// Radial glow — inverse-square falloff simulating scattered light in the
// interstellar medium and instrumental diffraction.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;   // Normalized distance from star center

    // Soft inner glow — 1/r^2 with small epsilon to prevent division by zero
    float glow = 1.0 / (r * r * 1.5 + 0.01);  // Factor 1.5 controls falloff steepness
    glow *= smoothstep(4.0, 1.0, r);           // Fade to zero beyond 4x star radius

    // Warm orange glow color — matches ~3000K blackbody
    vec3 glowColor = vec3(1.0, 0.5, 0.1) * glow * 0.15;  // 0.15 intensity — brighter = more bloom

    // Wider, dimmer haze — secondary falloff layer
    float haze = 1.0 / (r * r * 5.0 + 0.1);   // Steeper 1/r^2 for outer haze
    haze *= smoothstep(6.0, 1.5, r);            // Extends to 6x radius
    glowColor += vec3(0.6, 0.2, 0.03) * haze * 0.1;  // Deep red outer haze

    return glowColor;
}

// Corona — FBM-driven flame tendrils extending beyond the stellar surface.
// Only rendered in the annular region between 1.0x and 2.0x star radius.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);  // Skip pixels outside corona range

    float rimFactor = (r - 1.0);   // 0 at surface, 1 at outer corona edge
    float angle = atan(p.y, p.x);  // Polar angle around star

    // Two-layer flame pattern at different angular frequencies for organic look
    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.3), 4);   // Broad flames
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.2), 3); // Fine detail
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;  // Remap to [0,1]

    // Physics: Exponential decay with distance — models density falloff in stellar corona
    float fade = exp(-rimFactor * 4.0);    // Decay rate 4.0 — higher = more concentrated near surface
    float intensity = flames * fade * 0.9; // 0.9 base intensity — high for active red dwarf

    // TECHNIQUE: Prominence lifecycle. 4 prominences distributed by golden ratio
    // (0.618) for even angular spacing. Each has an independent sin()-based
    // lifecycle so prominences grow and fade over time.
    for (int i = 0; i < 4; i++) {          // 4 prominences — highest count of the three star types
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.2) * TAU;  // Golden-ratio spacing
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI); // Wrapped angular distance
        float promMask = exp(-angleDiff * angleDiff * 8.0);           // Gaussian angular mask — 8.0 = spread width
        float lifecycle = max(sin(time * 0.25 * (1.0 + fi * 0.3) + fi * 2.0), 0.0); // Half-wave rectified sine
        intensity += promMask * lifecycle * fade * 1.5;    // 1.5x prominence brightness
    }

    vec3 coronaColor = mix(vec3(1.0, 0.55, 0.1), vec3(1.0, 0.3, 0.02), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;   // World-space star radius — red dwarfs are 0.1-0.6 solar radii
    float focalLength = 1.5;  // Camera focal length — higher = more zoomed in

    // Auto rotation camera — orbits around star
    float rotX = time * 0.15;              // Horizontal orbit speed — fastest of three star types
    float rotY = sin(time * 0.07) * 0.3;  // Vertical bob amplitude — +/-0.3 rad

    float camDist = 3.5;                   // Camera distance from origin — affects apparent size
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    // TECHNIQUE: Apparent radius projection — project world-space star radius to
    // screen space so glow/corona effects match the rendered sphere exactly
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    // Dark background
    vec3 color = vec3(0.0, 0.0, 0.01);

    // Glow and corona use apparent radius so they match the rendered sphere
    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // TECHNIQUE: Ray-sphere intersection using the quadratic formula.
    // For a sphere centered at origin: |camPos + t*rd|^2 = r^2
    // Discriminant h = b^2 - c determines hit (h > 0) or miss (h <= 0)
    vec3 oc = camPos;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - starRadius * starRadius;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 hitPos = camPos + rd * t;
            vec3 normal = normalize(hitPos);

            // Sphere position in object space
            vec3 spherePos = normal;

            // Add star's own axial rotation — 0.05 rad/s
            float starRot = time * 0.05;
            float cs = cos(starRot), sn = sin(starRot);
            spherePos = vec3(
                spherePos.x * cs + spherePos.z * sn,
                spherePos.y,
                -spherePos.x * sn + spherePos.z * cs
            );

            // View angle for limb effects
            float viewAngle = max(dot(normal, normalize(camPos - hitPos)), 0.0);

            color = renderSurface(spherePos, viewAngle, time);
        }
    }

    // Tone mapping — Reinhard operator: color / (color + 1)
    // Exposure 1.8x boosts overall brightness before compression
    color *= 1.8;
    color = color / (color + vec3(1.0));  // Maps [0, inf) -> [0, 1) with soft rolloff

    // Slight warm tint to blacks — prevents pure black, adds ambient warmth
    color += vec3(0.01, 0.003, 0.0);

    // Gamma — 0.85 exponent (brighter than standard 0.45) preserves corona detail
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
