#define STEPS 100.0
#define VIEW_SCALE 0.05
#define SPEED 0.65
#define INTENSITY 0.15
#define FADE 0.997
#define FOCUS 2.4
#define MODE xy

// Color settings
#define MIN_HUE 60.0
#define MAX_HUE 240.0
#define MAX_SPEED 30.0
#define HUE_SHIFT_SPEED 15.0
#define SATURATION 0.85
#define LIGHTNESS 0.55

// Blink settings
#define BLINK_FREQ 8.0
#define BLINK_INTENSITY 1.8
#define BLINK_SAT_BOOST 1.3
#define BLINK_LIT_BOOST 1.4

// Dadras parameters
float pa = 3.0;
float pb = 2.7;
float pc = 1.7;
float pd = 2.0;
float pe = 9.0;

vec3 start = vec3(1.0, 1.0, 1.0);

vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        cur.y - pa * cur.x + pb * cur.y * cur.z,
        pc * cur.y - cur.x * cur.z + cur.z,
        pd * cur.x * cur.y - pe * cur.z
    ) * dt;
}

float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0);
    else if (h < 2.0) rgb = vec3(x, c, 0);
    else if (h < 3.0) rgb = vec3(0, c, x);
    else if (h < 4.0) rgb = vec3(0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0, c);
    else              rgb = vec3(c, 0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    float d = 1e6;
    float bestSpeed = 0.0;

    vec3 last = texelFetch(iChannel0, ivec2(0, 0), 0).xyz;
    vec3 next;

    for (float i = 0.0; i < STEPS; i++) {
        next = integrate(last, 0.005 * SPEED);

        float segD = dfLine(last.MODE * VIEW_SCALE, next.MODE * VIEW_SCALE, uv);
        if (segD < d) {
            d = segD;
            bestSpeed = length(vec3(
                next.y - pa * next.x + pb * next.y * next.z,
                pc * next.y - next.x * next.z + next.z,
                pd * next.x * next.y - pe * next.z
            ));
        }

        last = next;
    }

    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color with hue shift + blink boost
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    if (floor(fragCoord) == vec2(0, 0)) {
        fragColor = (iFrame == 0) ? vec4(start, 0) : vec4(next, 0);
    } else {
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        fragColor = vec4(lineColor * c + prev * FADE, 0);
    }
}
