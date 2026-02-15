/**
 * {{TITLE}}
 * A starting template — replace with your effect.
 */

// -- Configurable constants --
#define BG_COLOR_TOP    vec3(0.05, 0.0, 0.15)
#define BG_COLOR_BOTTOM vec3(0.0, 0.05, 0.1)
#define GLOW_COLOR      vec3(0.0, 0.78, 1.0)
#define GLOW_RADIUS     0.35
#define GLOW_SOFTNESS   0.4
#define PULSE_SPEED     2.0
#define PULSE_AMPLITUDE 0.15

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

    // Gradient background
    float gradient = uv.y * 0.5 + 0.5;
    vec3 col = mix(BG_COLOR_BOTTOM, BG_COLOR_TOP, gradient);

    // Pulsing center glow
    float dist = length(uv);
    float pulse = GLOW_RADIUS + PULSE_AMPLITUDE * sin(iTime * PULSE_SPEED);
    float glow = smoothstep(pulse + GLOW_SOFTNESS, pulse, dist);
    col += GLOW_COLOR * glow;

    // Gamma correction
    col = pow(col, vec3(0.45));

    fragColor = vec4(col, 1.0);
}
