/**
 * Red Dwarf Star
 *
 * A small, turbulent red dwarf star with orange-red plasma, boiling convection
 * cells, dark starspots, and a warm glowing corona.
 * Temperature locked at ~3000K with high activity level.
 *
 * Based on the exoplanets v2 star shaders by guinetik
 *
 * @author guinetik
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// =============================================================================
// NOISE
// =============================================================================

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

float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise(p * f);
        f *= 2.0;
        a *= 0.5;
        p += vec3(100.0);
    }
    return v;
}

// =============================================================================
// STAR COLOR PALETTE — direct ramp, no normalization that kills brightness
// =============================================================================

// Red dwarf palette: dark spots → warm orange → bright yellow-white
vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.3, 0.08, 0.0);     // dark sunspot
    const vec3 COOL     = vec3(0.8, 0.25, 0.02);     // cool surface
    const vec3 WARM     = vec3(1.0, 0.55, 0.08);     // warm convection
    const vec3 HOT      = vec3(1.0, 0.8, 0.3);       // hot granule center
    const vec3 BRIGHT   = vec3(1.0, 0.95, 0.7);      // brightest flare

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE
// =============================================================================

float convectionCells(vec3 p, float time) {
    // Large granulation cells
    float cells = snoise(p * 5.0 + vec3(0.0, time * 0.02, 0.0));
    // Medium detail
    float med = snoise(p * 12.0 + vec3(time * 0.015, 0.0, time * 0.01));
    // Fine turbulent detail
    float fine = snoise(p * 25.0 + vec3(0.0, time * 0.03, time * 0.02));

    return cells * 0.5 + med * 0.3 + fine * 0.2;
}

float starSpots(vec3 p, float time) {
    // Large dark spot regions
    float spots = snoise(p * 3.0 + vec3(0.0, time * 0.005, 0.0));
    // Only the peaks become dark spots
    return smoothstep(0.5, 0.75, spots);
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

vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    // Plasma base
    float plasma = plasmaFlow(spherePos, time);

    // Convection granulation
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;

    // Dark starspots
    float spots = starSpots(spherePos, time);

    // Pulsing brightness variation
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise(spherePos * 2.0) * 3.0);

    // Combine into a single heat value [0..1]
    float heat = plasma * 0.6 + cells * 0.4;
    heat *= pulse;

    // Darken spots
    heat *= 1.0 - spots * 0.7;

    // Limb darkening — edges slightly darker
    float limb = pow(viewAngle, 0.35);
    heat *= 0.7 + limb * 0.3;

    // Edge brightening for active flares
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 8.0 + vec3(time * 0.2), 3);
    heat += edgeFlare * 0.3;

    heat = clamp(heat, 0.0, 1.0);

    // Map to color — values above 1.0 give HDR bloom into tone mapper
    vec3 color = starRamp(heat) * (1.5 + heat * 1.5);

    // Extra brightness at center of convection granules
    color += vec3(1.0, 0.7, 0.2) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 2.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    // Soft inner glow
    float glow = 1.0 / (r * r * 1.5 + 0.01);
    glow *= smoothstep(4.0, 1.0, r);

    // Warm orange glow color
    vec3 glowColor = vec3(1.0, 0.5, 0.1) * glow * 0.15;

    // Wider, dimmer haze
    float haze = 1.0 / (r * r * 5.0 + 0.1);
    haze *= smoothstep(6.0, 1.5, r);
    glowColor += vec3(0.6, 0.2, 0.03) * haze * 0.1;

    return glowColor;
}

vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);

    float rimFactor = (r - 1.0);
    float angle = atan(p.y, p.x);

    // Flame-like corona tendrils
    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.3), 4);
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.2), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    // Fade with distance from surface
    float fade = exp(-rimFactor * 4.0);
    float intensity = flames * fade * 0.9;

    // Prominences — localized bright arcs
    for (int i = 0; i < 4; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.2) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 8.0);
        float lifecycle = max(sin(time * 0.25 * (1.0 + fi * 0.3) + fi * 2.0), 0.0);
        intensity += promMask * lifecycle * fade * 1.5;
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

    float starRadius = 0.85;
    float focalLength = 1.5;

    // Auto rotation camera
    float rotX = time * 0.15;
    float rotY = sin(time * 0.07) * 0.3;

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

    // Apparent screen radius: project world radius to screen space
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    // Dark background
    vec3 color = vec3(0.0, 0.0, 0.01);

    // Glow and corona use apparent radius so they match the rendered sphere
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

            // Sphere position in object space
            vec3 spherePos = normal;

            // Add star's own rotation
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

    // Tone mapping — Reinhard with exposure boost
    color *= 1.8;
    color = color / (color + vec3(1.0));

    // Slight warm tint to blacks
    color += vec3(0.01, 0.003, 0.0);

    // Gamma
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
