/**
 * Blue Giant Star
 *
 * A massive blue giant with a smooth, intensely luminous surface and powerful
 * corona glow. Temperature at ~20000K with low but steady stellar activity.
 * Smoother, larger-scale features than cooler stars.
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
// BLUE GIANT PALETTE — blue-white, intensely luminous
// =============================================================================

vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.15, 0.2, 0.4);      // dark blue spot
    const vec3 COOL     = vec3(0.5, 0.6, 0.9);       // cooler blue surface
    const vec3 WARM     = vec3(0.7, 0.8, 1.0);       // warm blue-white
    const vec3 HOT      = vec3(0.85, 0.9, 1.0);      // hot near-white
    const vec3 BRIGHT   = vec3(0.95, 0.97, 1.0);     // intense white-blue

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE — low activity, smooth large-scale features
// =============================================================================

float convectionCells(vec3 p, float time) {
    // Larger, smoother cells for a massive star
    float cells = snoise(p * 3.0 + vec3(0.0, time * 0.01, 0.0));
    float med = snoise(p * 7.0 + vec3(time * 0.008, 0.0, time * 0.006));
    float fine = snoise(p * 14.0 + vec3(0.0, time * 0.015, time * 0.01));
    return cells * 0.55 + med * 0.3 + fine * 0.15;
}

float starSpots(vec3 p, float time) {
    // Fewer, subtler spots on a blue giant
    float spots = snoise(p * 2.0 + vec3(0.0, time * 0.003, 0.0));
    return smoothstep(0.6, 0.85, spots);
}

float plasmaFlow(vec3 p, float time) {
    // Smoother, slower plasma for a massive star
    vec3 q = p * 2.5;
    q += vec3(sin(time * 0.06) * 0.2, cos(time * 0.08) * 0.2, time * 0.03);
    float n1 = fbm(q, 4) * 0.5 + 0.5;

    vec3 r = p * 3.0 + vec3(50.0);
    r += vec3(cos(time * 0.05) * 0.25, sin(time * 0.07) * 0.2, time * 0.04);
    float n2 = fbm(r, 3) * 0.5 + 0.5;

    return n1 * 0.6 + n2 * 0.4;
}

vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    float plasma = plasmaFlow(spherePos, time);
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;
    float spots = starSpots(spherePos, time);

    // Very subtle pulsing
    float pulse = 0.95 + 0.05 * sin(time * 0.3 + snoise(spherePos * 1.5) * 2.0);

    float heat = plasma * 0.65 + cells * 0.35;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Stronger limb darkening for blue giant
    float limb = pow(viewAngle, 0.5);
    heat *= 0.65 + limb * 0.35;

    // Minimal edge flares — blue giants are more stable
    float edgeFlare = pow(edgeDist, 3.0) * fbm(spherePos * 6.0 + vec3(time * 0.1), 3);
    heat += edgeFlare * 0.12;

    heat = clamp(heat, 0.0, 1.0);

    // Higher base brightness — blue giants are extremely luminous
    vec3 color = starRamp(heat) * (2.0 + heat * 1.5);
    color += vec3(0.7, 0.8, 1.0) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 1.2;

    return color;
}

// =============================================================================
// GLOW AND CORONA — intense blue-white, wider glow
// =============================================================================

vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    // Stronger glow — blue giants are very luminous
    float glow = 1.0 / (r * r * 1.2 + 0.01);
    glow *= smoothstep(5.0, 1.0, r);
    vec3 glowColor = vec3(0.6, 0.75, 1.0) * glow * 0.18;

    float haze = 1.0 / (r * r * 4.0 + 0.1);
    haze *= smoothstep(7.0, 1.5, r);
    glowColor += vec3(0.4, 0.5, 0.9) * haze * 0.1;

    return glowColor;
}

vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.5) return vec3(0.0);

    float rimFactor = (r - 1.0);
    float angle = atan(p.y, p.x);

    // Smoother, more uniform corona
    float flame1 = fbm(vec3(angle * 1.5, rimFactor * 4.0, time * 0.2), 3);
    float flame2 = fbm(vec3(angle * 3.0 + 10.0, rimFactor * 2.5, time * 0.15), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    // Slower fade — wider corona for a giant star
    float fade = exp(-rimFactor * 3.0);
    float intensity = flames * fade * 0.6;

    // Very few, subtle prominences
    for (int i = 0; i < 2; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.5) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 12.0);
        float lifecycle = max(sin(time * 0.15 * (1.0 + fi * 0.4) + fi * 3.0), 0.0);
        intensity += promMask * lifecycle * fade * 0.8;
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

    float starRadius = 0.85;
    float focalLength = 1.5;

    // Slower rotation for a massive star
    float rotX = time * 0.1;
    float rotY = sin(time * 0.04) * 0.2;

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

            // Slower self-rotation
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

    // Higher exposure for blue giant's intense luminosity
    color *= 2.0;
    color = color / (color + vec3(1.0));

    // Slight cool tint to blacks
    color += vec3(0.003, 0.004, 0.01);

    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
