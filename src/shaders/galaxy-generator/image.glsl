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

/**
 * COLOR RENDERING
 *
 * Galaxy particles use realistic stellar colors based on temperature (blackbody sequence):
 *   - Cool red: M dwarfs (old, low-mass stars) — hue ~10°
 *   - Orange: K giants — hue ~25°
 *   - Yellow: G stars (Sun-like) — hue ~42°
 *   - Blue-white: A/B stars (hot, young) — hue ~210°
 *   - Deep blue: O stars (very hot, massive) — hue ~225°
 *
 * Buffer-a assigns hues based on radial distance (metallicity gradient):
 *   - Core: warm (old population, high metallicity)
 *   - Arms: cool (young population, blue stars, low metallicity)
 *   - Dust: faint nebular (blue-violet)
 *
 * TECHNIQUE: HSL Color Space
 * HSL (Hue-Saturation-Lightness) is more intuitive than RGB for stellar colors.
 * Brightness from buffer determines saturation and lightness dynamically:
 *   - Brighter particles → more saturated, lighter (appears hotter/stronger)
 *   - Dimmer particles → less saturated, darker (dust, faint stars)
 */

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

/**
 * PARTICLE SAMPLING & RENDERING
 *
 * Particles are fetched from buffer-a using texelFetch (exact pixel, no filtering).
 * Rendering uses a hybrid approach:
 *
 *   - Dim particles (dust, brightness < 0.3): rendered as small points (2-3 pixels)
 *   - Bright particles (brightness > 0.6): rendered as glowing halos (8-10 pixels)
 *   - Smooth falloff (smoothstep) creates soft glow edges
 *
 * TECHNIQUE: Distance Falloff
 * Each particle glows outward in a circular region of radius = 2 + brightness × 8.
 * Falloff is smooth (smoothstep), not hard-edged, for photorealistic appearance.
 * Particles additively blend (+=) creating natural bright spots where multiple overlap.
 *
 * TECHNIQUE: Early Termination Optimization
 * Fragments >400 pixels from screen center skip the particle loop entirely
 * (galaxies are only ~280-380 pixels radius, so this is safe).
 * Distance culling (if dist > particleRadius continue) skips expensive color calcs.
 */

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
  int particleCount = 1000;

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

  /**
   * RENDERING LOOP
   *
   * For each fragment:
   * 1. Apply perspective tilt (y-compression, 10%) for shallow viewing angle
   * 2. Check early spatial exit (if too far from center, skip to black background)
   * 3. Iterate all particles:
   *    - Skip empty/invalid particles (length < 0.1)
   *    - Skip particles beyond distance threshold
   *    - Sample color from hue; apply brightness-based saturation/lightness
   *    - Calculate glow falloff; accumulate color with additive blending
   * 4. Apply gamma correction (0.45) for proper perception on sRGB displays
   */

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
