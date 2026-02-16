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
