/**
 * Galaxy Generator — Image Renderer
 * @author guinetik
 * @date 2026-03-05
 *
 * Renders particles from buffer-a as a hybrid point/glow system.
 * Particles are classified as dust (points), stars (points), or bright (glows).
 * Colors follow realistic stellar hue gradients (core warm, arms blue, dust faint).
 */

#define PRESET_DURATION 7.0
#define MAX_PARTICLES 15000

// ─────────────────────────────────────────────────────────────────────────────
// COLOR UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Convert HSL to RGB (hue in degrees [0-360], s/l in [0,1]) */
vec3 hslToRgb(float hue, float sat, float light) {
  hue = mod(hue, 360.0) / 60.0;
  float c = (1.0 - abs(2.0 * light - 1.0)) * sat;
  float x = c * (1.0 - abs(mod(hue, 2.0) - 1.0));

  vec3 rgb = vec3(0.0);
  if (hue < 1.0) rgb = vec3(c, x, 0.0);
  else if (hue < 2.0) rgb = vec3(x, c, 0.0);
  else if (hue < 3.0) rgb = vec3(0.0, c, x);
  else if (hue < 4.0) rgb = vec3(0.0, x, c);
  else if (hue < 5.0) rgb = vec3(x, 0.0, c);
  else rgb = vec3(c, 0.0, x);

  float m = light - c * 0.5;
  return rgb + m;
}

/** Sample particle from buffer. Returns (x, y, hue, brightness). */
vec4 sampleParticle(int particleIndex) {
  int x = particleIndex % int(iResolution.x);
  int y = particleIndex / int(iResolution.x);
  return texelFetch(iChannel0, ivec2(x, y), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERING
// ─────────────────────────────────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 col = vec3(0.0);
  int presetIdx = int(iTime / PRESET_DURATION) % 12;

  // Approximate particle count for this preset
  int particleCount = 10000; // average

  // Optional 3D tilt (reduce y by ~10% for shallow perspective)
  float tiltAmount = 0.1;
  vec2 fragCoordTilted = fragCoord;
  fragCoordTilted.y *= (1.0 - tiltAmount);

  // Early exit if too far from any particle
  vec2 centerDist = abs(fragCoordTilted - iResolution.xy * 0.5);
  if (min(centerDist.x, centerDist.y) > 400.0) {
    // Far from center, render background
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Limit loop to particle count
  for (int i = 0; i < min(particleCount, MAX_PARTICLES); i++) {
    vec4 p = sampleParticle(i);
    if (length(p.xy) < 0.1) continue;

    // Apply same tilt to particles
    vec2 ppos = p.xy + iResolution.xy * 0.5;
    ppos.y *= (1.0 - tiltAmount);

    vec2 diff = fragCoordTilted - ppos;
    float dist = length(diff);

    float brightness = p.w;
    float particleRadius = 2.0 + brightness * 8.0;
    if (dist > particleRadius) continue; // skip far particles

    float hue = p.z;
    float sat = 0.8 + brightness * 0.2;
    float light = 0.4 + brightness * 0.2;
    vec3 pcolor = hslToRgb(hue, sat, light);

    float falloff = smoothstep(particleRadius, 0.0, dist);
    float alpha = brightness * falloff;
    col += pcolor * alpha;
  }

  col = pow(col, vec3(0.45));
  fragColor = vec4(col, 1.0);
}
