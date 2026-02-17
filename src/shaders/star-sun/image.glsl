/**
 * Solar Star
 * @author guinetik
 * @date 2025-11-29
 *
 * Our Sun -- a yellow-white G-type main sequence star with turbulent convection
 * cells, visible surface relief, and a fiery corona. Rendered as a ray-sphere
 * intersection with noise-driven bump mapping for 3D surface detail.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 * Fire palette based on "Combustible Voronoi" by Shane.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle warm tint
 *   2. Glow            — inverse-square radial falloff, warm yellow-orange
 *   3. Corona          — FBM flame tendrils + 3 cyclic prominences
 *   4. Star surface    — bump-mapped convection with Planck blackbody palette
 *   5. Tone mapping    — Reinhard operator with moderate exposure
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera.
 *
 * TECHNIQUE: Bump mapping via finite differences on high-frequency simplex noise.
 * Gradient is computed properly (divided by epsilon) so surface perturbation is
 * visible as turbulent ridges and granulation cells, not a flat painted sphere.
 *
 * TECHNIQUE: Planck's law fire palette (1400-3200K range) for physically-motivated
 * but visually saturated fire colors — deep red spots through orange to bright yellow.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.4) and self-illumination from
 * the perturbed normal, creating visible contrast between granule peaks and valleys.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// NOTE: Kept inline because the domain shift differs from fbmSimplex3D.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise3D(p * f);
        f *= 2.0;
        a *= 0.5;
        p += vec3(100.0);
    }
    return v;
}

// =============================================================================
// SOLAR PALETTE — Planck's law blackbody radiation
// =============================================================================
// Physics: Maps a 0-1 heat value to blackbody color via Planck spectral radiance.
// Temperature range chosen for visually saturated fire colors:
//   i=0 → 1400K (deep red/dark)  i=0.5 → 2300K (bright orange)  i=1 → 3200K (yellow-white)
// Based on "Combustible Voronoi" by Shane (https://www.shadertoy.com/view/4tlSzl).

#define TEMP_MIN 1900.0   // Coolest — dark orange, intergranular lanes
#define TEMP_RANGE 1500.0  // Range — 1900K to 3400K, orange through bright yellow

vec3 firePalette(float i) {
    float T = TEMP_MIN + TEMP_RANGE * i;
    vec3 L = vec3(7.4, 5.6, 4.4);   // RGB wavelengths in 100s of nm
    L = pow(L, vec3(5.0)) * (exp(1.43876719683e5 / (T * L)) - 1.0);
    return 1.0 - exp(-5e8 / L);
}

// =============================================================================
// STAR SURFACE
// =============================================================================
// TECHNIQUE: High-contrast granulation — bright convective cell centers with
// dark intergranular lanes, all self-luminous (no directional lighting).
// The surface is pure emissive plasma: color contrast comes from the heat map
// driving the fire palette, not from light/shadow.
//
// Granulation pattern uses 1-abs(noise) to create cell-like shapes: bright
// broad centers with thin dark boundaries, mimicking solar convection.

// Granulation — cell-like pattern using 1-abs(noise).
// This creates bright convective cells with thin dark intergranular lanes,
// matching the real sun's photosphere appearance.
float granulation(vec3 p, float time) {
    // Large cells — primary granulation scale (~1000km on real sun)
    float g1 = 1.0 - abs(snoise3D(p * 5.0 + vec3(0.0, time * 0.08, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 10.0 + vec3(time * 0.07, 0.0, time * 0.06)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 20.0 + vec3(0.0, time * 0.1, time * 0.08)) * 0.5 + 0.5;
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;
}

// Sunspots — transient cooler regions that form, dissolve, and erupt elsewhere.
// Two noise layers at different speeds create spots that cycle in and out.
float starSpots(vec3 p, float time) {
    // Primary spots — moderate speed so they visibly drift and fade
    float spots1 = snoise3D(p * 2.5 + vec3(0.0, time * 0.04, time * 0.03));
    // Secondary cycle — different frequency creates interference pattern
    // so spots appear/vanish as the two layers phase in and out of alignment
    float spots2 = snoise3D(p * 3.5 + vec3(time * 0.05, 0.0, time * 0.02) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.45, 0.8, spots);
}

// Plasma turbulence — large-scale slow-moving flow patterns.
float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 3.0;
    q += vec3(sin(time * 0.12) * 0.4, cos(time * 0.15) * 0.35, time * 0.06);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    vec3 r = p * 5.0 + vec3(50.0);
    r += vec3(cos(time * 0.1) * 0.4, sin(time * 0.13) * 0.3, time * 0.08);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.55 + n2 * 0.45;
}

// Surface rendering — pure self-luminous plasma, no directional lighting.
// All visual detail comes from heat-to-color mapping through the fire palette.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Pulsing modulation — convective churning
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 4.0);

    // Heat map — granulation dominant for visible cell structure
    float heat = cells * 0.55 + plasma * 0.45;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Contrast curve — sharpens granule boundaries.
    // Pushes bright areas brighter and dark lanes darker.
    heat = smoothstep(0.15, 0.85, heat);

    // Limb darkening — purely emissive, just reduces heat at edges
    float limb = pow(viewAngle, 0.4);
    heat *= 0.55 + limb * 0.45;

    // Edge flares — bright turbulence at the limb
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);
    heat += edgeFlare * 0.2;

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

// Radial glow — warm yellow-orange, moderate intensity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    float glow = 1.0 / (r * r * 1.5 + 0.01);
    glow *= smoothstep(4.5, 1.0, r);
    vec3 glowColor = firePalette(0.6) * glow * 0.2;

    float haze = 1.0 / (r * r * 5.0 + 0.1);
    haze *= smoothstep(6.0, 1.5, r);
    glowColor += firePalette(0.3) * haze * 0.1;

    return glowColor;
}

// Corona — flame tendrils and prominences.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.5) return vec3(0.0);

    float rimFactor = (r - 1.0);
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.12;
    float angle = atan(p.y, p.x) - starRot;

    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.25), 4);
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.18), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    float fade = exp(-rimFactor * 3.5);
    float intensity = flames * fade * 1.0;

    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.4) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 10.0);
        float lifecycle = max(sin(time * 0.2 * (1.0 + fi * 0.3) + fi * 2.5), 0.0);
        intensity += promMask * lifecycle * fade * 1.5;
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

    float starRadius = 0.85;
    float focalLength = 1.5;

    float rotX = time * 0.36;
    float rotY = sin(time * 0.18) * 0.25;

    float camDist = 3.5;
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);

    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // Ray-sphere intersection
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

            float starRot = time * 0.12;
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

    // Tone mapping — moderate Reinhard
    color *= 1.8;
    color = color / (color + vec3(1.0));
    color += vec3(0.005, 0.002, 0.0);
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
