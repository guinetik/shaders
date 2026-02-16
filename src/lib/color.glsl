/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else              rgb = vec3(c, 0.0, x);
    return rgb + m;
}

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
