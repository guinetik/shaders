/**
 * Red Dwarf Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A small, turbulent red dwarf star with deep red-orange plasma, cell-like
 * granulation, cycling starspots, and a warm glowing corona. Temperature
 * locked at ~3000K with high stellar activity — the most active of the three
 * star types.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 * Fire palette based on "Combustible Voronoi" by Shane.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle blue tint
 *   2. Glow            — inverse-square radial falloff, deep red-orange
 *   3. Corona          — FBM flame tendrils + 4 cyclic prominences
 *   4. Star surface    — granulation cells, plasma flow, dual-layer spots,
 *                        self-emission via Planck blackbody palette
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera.
 *
 * TECHNIQUE: Planck's law fire palette (1200-2400K range) for physically-motivated
 * deep red through orange fire colors — cooler than the Sun, matching M-dwarf
 * photosphere temperatures.
 *
 * TECHNIQUE: Self-emission rendering — no directional lighting. All visual detail
 * comes from heat-to-color mapping through the fire palette. Contrast curve
 * (smoothstep) sharpens granule boundaries.
 *
 * TECHNIQUE: Granulation using 1-abs(noise) for cell-like patterns with bright
 * convective centers and thin dark intergranular lanes. Highest frequencies of
 * the three star types, reflecting the most turbulent convection cells.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.35) — stronger than the Sun,
 * approximating the deeper convective envelope of a red dwarf.
 *
 * TECHNIQUE: Prominence lifecycle. Corona prominences use a golden-ratio angular
 * distribution (0.618 * i) for even spacing, modulated by sin()-based lifecycle
 * functions so prominences grow and fade over time independently.
 *
 * Physics: Color palette approximates ~3000K blackbody radiation — dominant
 * deep red emission with occasional orange flare peaks. Red dwarfs are fully
 * convective, so the surface shows vigorous boiling granulation at higher
 * activity levels than hotter stars.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation) chosen for its smooth,
 * isotropic gradients — critical for convincing stellar surface turbulence
 * without visible grid artifacts. FBM with up to 5 octaves for plasma flow.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Domain offset vec3(100.0) between octaves decorrelates layers.
// 5 octaves for plasma detail, 3-4 for corona flames.
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
// FIRE PALETTE — Planck's law blackbody radiation
// =============================================================================
// Physics: Maps a 0-1 heat value to blackbody color via Planck spectral radiance.
// Temperature range chosen for deep red M-dwarf colors:
//   i=0 → 1200K (deep red/dark)  i=0.5 → 1800K (warm red-orange)  i=1 → 2400K (orange)
// Based on "Combustible Voronoi" by Shane (https://www.shadertoy.com/view/4tlSzl).

#define TEMP_MIN 1200.0   // Coolest — deep red, starspot
#define TEMP_RANGE 1200.0  // Range — 1200K to 2400K, deep red through orange

vec3 firePalette(float i) {
    float T = TEMP_MIN + TEMP_RANGE * i;
    vec3 L = vec3(7.4, 5.6, 4.4);   // RGB wavelengths in 100s of nm
    L = pow(L, vec3(5.0)) * (exp(1.43876719683e5 / (T * L)) - 1.0);
    return 1.0 - exp(-5e8 / L);
}

// =============================================================================
// STAR SURFACE
// =============================================================================

// Granulation — cell-like pattern using 1-abs(noise).
// This creates bright convective cells with thin dark intergranular lanes.
// Highest frequencies of the three star types — red dwarfs are the most turbulent.
float granulation(vec3 p, float time) {
    // Large cells — primary granulation scale
    float g1 = 1.0 - abs(snoise3D(p * 6.0 + vec3(0.0, time * 0.1, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 12.0 + vec3(time * 0.08, 0.0, time * 0.07)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 25.0 + vec3(0.0, time * 0.12, time * 0.1)) * 0.5 + 0.5;
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;
}

// Starspots — dual-layer cycling spots. Red dwarfs have the most active spots
// due to their fully convective interiors and strong magnetic fields.
// Two noise layers at different speeds create spots that cycle in and out.
float starSpots(vec3 p, float time) {
    // Primary spots — moderate speed so they visibly drift and fade
    float spots1 = snoise3D(p * 3.0 + vec3(0.0, time * 0.05, time * 0.04));
    // Secondary cycle — different frequency creates interference pattern
    // so spots appear/vanish as the two layers phase in and out of alignment
    float spots2 = snoise3D(p * 4.0 + vec3(time * 0.06, 0.0, time * 0.03) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.4, 0.75, spots);
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

// Surface rendering — pure self-luminous plasma, no directional lighting.
// All visual detail comes from heat-to-color mapping through the fire palette.
// Red dwarf is the most active star type — strongest spots and edge flares.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Pulsing modulation — convective churning
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 3.0);

    // Heat map — equal blend of cells and plasma
    float heat = cells * 0.5 + plasma * 0.5;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Contrast curve — sharpens granule boundaries.
    // Pushes bright areas brighter and dark lanes darker.
    heat = smoothstep(0.15, 0.85, heat);

    // Limb darkening — purely emissive, just reduces heat at edges
    float limb = pow(viewAngle, 0.35);
    heat *= 0.55 + limb * 0.45;

    // Edge flares — bright turbulence at the limb
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 8.0 + vec3(time * 0.2), 3);
    heat += edgeFlare * 0.25;

    heat = clamp(heat, 0.0, 1.0);

    // Fire palette — all color from self-emission, no shading
    vec3 color = firePalette(heat) * (1.0 + heat * 2.0);

    // Quadratic emissive boost — hottest granule centers blaze
    color += firePalette(1.0) * heat * heat * 1.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

// Radial glow — inverse-square falloff, deep red-orange from fire palette.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;   // Normalized distance from star center

    // Soft inner glow — 1/r^2 with small epsilon to prevent division by zero
    float glow = 1.0 / (r * r * 1.5 + 0.01);  // Factor 1.5 controls falloff steepness
    glow *= smoothstep(4.0, 1.0, r);           // Fade to zero beyond 4x star radius
    vec3 glowColor = firePalette(0.6) * glow * 0.15;  // 0.15 intensity — brighter = more bloom

    // Wider, dimmer haze — secondary falloff layer
    float haze = 1.0 / (r * r * 5.0 + 0.1);   // Steeper 1/r^2 for outer haze
    haze *= smoothstep(6.0, 1.5, r);            // Extends to 6x radius
    glowColor += firePalette(0.3) * haze * 0.1;  // Deep red outer haze

    return glowColor;
}

// Corona — FBM-driven flame tendrils extending beyond the stellar surface.
// Only rendered in the annular region between 1.0x and 2.0x star radius.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);  // Skip pixels outside corona range

    float rimFactor = (r - 1.0);   // 0 at surface, 1 at outer corona edge
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.15;
    float angle = atan(p.y, p.x) - starRot;

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

    vec3 coronaColor = mix(firePalette(0.8), firePalette(0.4), rimFactor);
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
    float rotX = time * 0.45;              // Horizontal orbit speed — fastest of three star types
    float rotY = sin(time * 0.21) * 0.3;  // Vertical bob amplitude — +/-0.3 rad

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
            float starRot = time * 0.15;
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
