/**
 * Star Study - 3D Raymarched Star with Orbiting Planet
 *
 * @author guinetik
 * @date 2025-11-30
 *
 * A procedural star system featuring a realistic granulated plasma surface,
 * corona flames, solar prominences, and an orbiting rocky planet.
 *
 * Features:
 * - Raymarched 3D star with 1-abs(noise) granulation for convection cells
 * - Dual-layer cycling spots, plasma flow, and contrast-curved heat mapping
 * - Corona, solar flares, and flame tongues that rotate with the star
 * - Radial god rays with star rotation
 * - Temperature cycling through stellar spectral types (O to M class)
 * - Rocky planet with day/night terminator and star-colored lighting
 * - Planet orbits the star and rotates on its axis
 *
 * Controls:
 * - Auto-rotates until first mouse interaction
 * - Click and drag to adjust camera angle (persists after release)
 * - Horizontal drag: orbit around the star
 * - Vertical drag: tilt camera up/down
 *
 * Temperature cycle: Orange (K-type) -> Yellow (G-type) -> White (F-type) ->
 *                    Blue-white (A-type) -> Blue (O-type) -> Magenta (T-dwarf) ->
 *                    Red (M-type) -> back to Orange
 *
 * Commons: sphere (intersectSphere), color (hsv2rgb/rgb2hsv), noise-simplex
 * (snoise2D/3D, fbmSimplex2D, tiledNoise3D, plasmaNoise).
 *
 * Based on the v2 star shaders from the Exoplanets visualization project
 * https://github.com/guinetik/exoplanets
 */

// =============================================================================
// CONSTANTS
// =============================================================================

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

// Star geometry
const float STAR_RADIUS = 1.0;
const float CORONA_RADIUS = 1.35;  // Subtle corona, close to surface

// Planet geometry
const float PLANET_RADIUS = 0.15;
const float PLANET_ORBIT_RADIUS = 3.5;
const float PLANET_ORBIT_SPEED = 0.15;
const float PLANET_ROTATION_SPEED = 0.4;
const vec3 PLANET_BASE_COLOR = vec3(0.3, 0.5, 0.8); // Earth-like blue

// Temperature color palette (from shadertoy-study.glsl)
const vec3 TEMP_300K = vec3(0.35, 0.2, 0.45);      // Y-dwarf purple
const vec3 TEMP_800K = vec3(0.6, 0.27, 0.65);      // T-dwarf magenta
const vec3 TEMP_2000K = vec3(1.0, 0.35, 0.1);      // M-dwarf red
const vec3 TEMP_3000K = vec3(1.0, 0.65, 0.35);     // M-dwarf orange-red
const vec3 TEMP_4000K = vec3(1.0, 0.78, 0.55);     // K-dwarf orange
const vec3 TEMP_5778K = vec3(1.0, 0.96, 0.91);     // G-type Sun
const vec3 TEMP_7500K = vec3(0.92, 0.93, 1.0);     // F-type white
const vec3 TEMP_10000K = vec3(0.80, 0.85, 1.0);    // A-type blue-white
const vec3 TEMP_25000K = vec3(0.65, 0.75, 1.0);    // O-type blue

// =============================================================================
// LOCAL UTILITIES (unique to star-study, not in commons)
// =============================================================================

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float hash3(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// =============================================================================
// TEMPERATURE TO COLOR
// =============================================================================

vec3 temperatureToColor(float tempK) {
    tempK = clamp(tempK, 300.0, 30000.0);
    if (tempK < 800.0) return mix(TEMP_300K, TEMP_800K, (tempK - 300.0) / 500.0);
    if (tempK < 2000.0) return mix(TEMP_800K, TEMP_2000K, (tempK - 800.0) / 1200.0);
    if (tempK < 3000.0) return mix(TEMP_2000K, TEMP_3000K, (tempK - 2000.0) / 1000.0);
    if (tempK < 4000.0) return mix(TEMP_3000K, TEMP_4000K, (tempK - 3000.0) / 1000.0);
    if (tempK < 5778.0) return mix(TEMP_4000K, TEMP_5778K, (tempK - 4000.0) / 1778.0);
    if (tempK < 7500.0) return mix(TEMP_5778K, TEMP_7500K, (tempK - 5778.0) / 1722.0);
    if (tempK < 10000.0) return mix(TEMP_7500K, TEMP_10000K, (tempK - 7500.0) / 2500.0);
    return mix(TEMP_10000K, TEMP_25000K, (tempK - 10000.0) / 15000.0);
}

// =============================================================================
// CAMERA
// =============================================================================

mat3 rotateY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0, s, 0, 1, 0, -s, 0, c);
}

// =============================================================================
// FBM — inline with domain shift (differs from fbmSimplex3D in commons)
// =============================================================================

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
// GRANULATION — cell-like pattern using 1-abs(noise)
// =============================================================================
// Bright convective cells with thin dark intergranular lanes,
// matching the real photosphere appearance across all spectral types.

float granulation(vec3 p, float time) {
    // Large cells — primary granulation scale
    float g1 = 1.0 - abs(snoise3D(p * 5.0 + vec3(0.0, time * 0.08, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 10.0 + vec3(time * 0.07, 0.0, time * 0.06)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 20.0 + vec3(0.0, time * 0.1, time * 0.08)) * 0.5 + 0.5;
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;
}

// =============================================================================
// STAR SPOTS — dual-layer cycling dark regions
// =============================================================================
// Two noise layers at different speeds create spots that cycle in and out
// as the layers phase in/out of alignment.

float starSpots(vec3 p, float time) {
    float spots1 = snoise3D(p * 2.5 + vec3(0.0, time * 0.04, time * 0.03));
    float spots2 = snoise3D(p * 3.5 + vec3(time * 0.05, 0.0, time * 0.02) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.45, 0.8, spots);
}

// =============================================================================
// PLASMA FLOW — large-scale turbulent flow patterns
// =============================================================================

float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 3.0;
    q += vec3(sin(time * 0.12) * 0.4, cos(time * 0.15) * 0.35, time * 0.06);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    vec3 r = p * 5.0 + vec3(50.0);
    r += vec3(cos(time * 0.1) * 0.4, sin(time * 0.13) * 0.3, time * 0.08);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.55 + n2 * 0.45;
}

// =============================================================================
// STAR SURFACE — pure self-luminous plasma, color from baseColor × heat
// =============================================================================
// TECHNIQUE: Same granulation/spots/plasma pipeline as individual star shaders,
// but instead of firePalette (which can't produce blue), the heat map modulates
// the temperatureToColor base — cool lanes get darker/warmer, hot granules
// get brighter, preserving the spectral cycling across all temperatures.

vec3 renderSurface(vec3 spherePos, float viewAngle, vec3 baseColor, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Pulsing modulation — convective churning
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 4.0);

    // Heat map — granulation dominant for visible cell structure
    float heat = cells * 0.55 + plasma * 0.45;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Contrast curve — sharpens granule boundaries
    heat = smoothstep(0.15, 0.85, heat);

    // Limb darkening — purely emissive, just reduces heat at edges
    float limb = pow(viewAngle, 0.4);
    heat *= 0.55 + limb * 0.45;

    // Edge flares — bright turbulence at the limb
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);
    heat += edgeFlare * 0.2;

    heat = clamp(heat, 0.0, 1.0);

    // Color mapping — baseColor modulated by heat instead of firePalette.
    // Cool lanes get a dark, warm-shifted multiplier; hot granules get bright boost.
    vec3 coolColor = baseColor * vec3(0.4, 0.25, 0.15);
    vec3 hotColor = baseColor * vec3(1.5, 1.3, 1.1);
    vec3 color = mix(coolColor, hotColor, heat) * (1.0 + heat * 2.0);

    // Quadratic emissive boost — hottest granule centers blaze
    color += baseColor * heat * heat * 1.0;

    return color;
}

// =============================================================================
// CORONA - Volumetric glow around the star (smooth falloff, no hard edges)
// =============================================================================

vec3 corona(vec3 ro, vec3 rd, vec3 starColor, float time) {
    vec3 col = vec3(0.0);

    // Use a larger radius but with smooth exponential falloff
    float b = dot(ro, rd);

    // Find closest approach to star center
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));

    // Smooth falloff from star surface - no hard boundary
    float distFromSurface = closestDist - STAR_RADIUS;
    if (distFromSurface < -0.1) return col;  // Inside star

    // Exponential density falloff (no hard edge)
    float density = exp(-max(distFromSurface, 0.0) * 2.5);

    // Direction for noise - rotate with star
    vec3 closest = ro - rd * b;
    vec3 np = normalize(closest);

    // Apply star rotation
    float starRot = time * 0.5;
    float cosR = cos(starRot);
    float sinR = sin(starRot);
    vec3 rotNp = vec3(np.x * cosR - np.z * sinR, np.y, np.x * sinR + np.z * cosR);

    float angle = atan(rotNp.y, rotNp.x);
    float elev = acos(clamp(rotNp.z, -1.0, 1.0));

    // Animated noise for variation
    float n = snoise3D(vec3(angle * 2.0, elev * 2.0, time * 0.15));
    n = abs(n) * 0.6 + 0.4;

    // Second noise layer for more detail
    float n2 = snoise3D(vec3(angle * 4.0 + time * 0.1, elev * 3.0, time * 0.08));
    n2 = abs(n2) * 0.4 + 0.6;

    density *= n * n2;

    // Fade smoothly at edges
    density *= smoothstep(0.0, 0.15, distFromSurface + 0.1);

    col = starColor * vec3(1.3, 1.0, 0.7) * density * 0.6;

    return col;
}

// =============================================================================
// SOLAR FLARES - Bright prominences (smooth falloff, no hard edges)
// =============================================================================

vec3 solarFlares(vec3 ro, vec3 rd, vec3 starColor, float time) {
    vec3 col = vec3(0.0);

    float b = dot(ro, rd);
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));

    // Smooth falloff instead of hard cutoff
    float innerFade = smoothstep(0.7, 1.0, closestDist);  // Fade in from star center
    float outerFade = exp(-(closestDist - 1.0) * 2.0);    // Exponential fade outward
    float flareMask = innerFade * outerFade;

    if (flareMask < 0.01) return col;

    vec3 closest = ro - rd * b;
    vec3 dir = normalize(closest);

    // Apply star rotation to direction
    float starRot = time * 0.5;
    float cosR = cos(starRot);
    float sinR = sin(starRot);
    vec3 rotDir = vec3(dir.x * cosR - dir.z * sinR, dir.y, dir.x * sinR + dir.z * cosR);

    // 6 flare sources - rotate with star
    for (float i = 0.0; i < 6.0; i++) {
        float flareAngle = i * TAU / 6.0;  // Fixed positions, star rotation handles movement
        float flareElev = PI * 0.5 + sin(i * 1.5) * 0.3;

        vec3 flareDir = vec3(
            sin(flareElev) * cos(flareAngle),
            sin(flareElev) * sin(flareAngle),
            cos(flareElev)
        );

        float alignment = max(dot(rotDir, flareDir), 0.0);
        alignment = pow(alignment, 12.0);

        float flareIntensity = 0.5 + 0.5 * sin(time * 0.5 + i * 2.0);
        flareIntensity *= hash(i * 7.13 + floor(time * 0.1)) > 0.3 ? 1.0 : 0.4;

        col += starColor * vec3(1.2, 0.85, 0.5) * alignment * flareIntensity * flareMask * 2.0;
    }

    return col;
}

// =============================================================================
// LIGHT RAYS - Radial god rays
// =============================================================================

vec3 lightRays(vec2 uv, vec3 starColor, float time) {
    // Rotate UV with star
    float starRot = time * 0.5;
    float cosR = cos(starRot);
    float sinR = sin(starRot);
    vec2 rotUv = vec2(uv.x * cosR - uv.y * sinR, uv.x * sinR + uv.y * cosR);

    float angle = atan(rotUv.y, rotUv.x);
    float dist = length(uv);

    float rays = 0.0;
    for (float i = 1.0; i < 4.0; i++) {
        float rayAngle = angle * (4.0 + i * 2.0);
        float ray = sin(rayAngle) * 0.5 + 0.5;
        ray = pow(ray, 8.0);
        rays += ray / i;
    }

    float falloff = 1.0 / (1.0 + dist * 4.0);
    falloff = pow(falloff, 2.0);

    // Fade in outside star
    float rayMask = smoothstep(0.2, 0.35, dist);

    return starColor * vec3(1.1, 0.95, 0.8) * rays * falloff * rayMask * 0.2;
}

// =============================================================================
// OUTER GLOW - Soft bloom
// =============================================================================

vec3 outerGlow(vec2 uv, vec3 starColor) {
    float dist = length(uv);
    float glow = 0.25 / (dist + 0.15);
    glow = pow(glow, 1.4) * 0.25;
    return starColor * vec3(1.1, 0.9, 0.7) * glow;
}

// =============================================================================
// FLAME TONGUES - Visible protrusions that break the circular silhouette
// =============================================================================

vec3 flameTongues(vec3 ro, vec3 rd, vec3 starColor, float time) {
    vec3 col = vec3(0.0);

    // Find closest approach to star center
    float b = dot(ro, rd);
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));

    // Only render in the zone just outside the star (the silhouette area)
    if (closestDist < 0.85 || closestDist > 1.4) return col;

    vec3 closest = ro - rd * b;
    vec3 dir = normalize(closest);

    // Apply star rotation
    float starRot = time * 0.5;
    float cosR = cos(starRot);
    float sinR = sin(starRot);
    vec3 rotDir = vec3(dir.x * cosR - dir.z * sinR, dir.y, dir.x * sinR + dir.z * cosR);

    float angle = atan(rotDir.y, rotDir.x);
    float elev = acos(clamp(rotDir.z, -1.0, 1.0));

    // Multiple flame layers with different frequencies
    float flames = 0.0;

    // Large slow-moving tongues
    float tongue1 = tiledNoise3D(vec3(angle / TAU * 8.0, elev / PI * 4.0, time * 0.08), 8.0);
    tongue1 = pow(max(tongue1, 0.0), 1.5);

    // Medium flames
    float tongue2 = tiledNoise3D(vec3(angle / TAU * 16.0, elev / PI * 8.0, time * 0.12), 16.0);
    tongue2 = pow(max(tongue2, 0.0), 2.0);

    // Small flickering details
    float tongue3 = snoise3D(vec3(angle * 6.0, elev * 4.0, time * 0.3));
    tongue3 = pow(max(tongue3, 0.0), 2.5);

    flames = tongue1 * 0.5 + tongue2 * 0.35 + tongue3 * 0.15;

    // Each flame extends to different heights based on noise
    float flameHeight = 0.15 + flames * 0.25;
    float distFromSurface = closestDist - STAR_RADIUS;

    // Flame is visible if we're within its reach
    float flameReach = smoothstep(flameHeight, 0.0, distFromSurface);
    flameReach *= smoothstep(0.85, 1.0, closestDist); // Fade in from star surface

    // Intensity varies with height (brighter at base)
    float heightFade = 1.0 - (distFromSurface / flameHeight);
    heightFade = pow(max(heightFade, 0.0), 0.7);

    float intensity = flames * flameReach * heightFade;

    // Color: hot at base, cooler at tips
    vec3 baseFlameColor = starColor * vec3(1.4, 1.1, 0.8);
    vec3 tipFlameColor = starColor * vec3(1.1, 0.7, 0.4);
    vec3 flameColor = mix(baseFlameColor, tipFlameColor, distFromSurface / 0.3);

    col = flameColor * intensity * 1.2;

    return col;
}

// =============================================================================
// BACKGROUND STARS
// =============================================================================

vec3 backgroundStars(vec3 rd) {
    vec3 stars = vec3(0.0);
    // Sharp pixel stars
    vec3 p = rd * 150.0;
    vec3 id = floor(p);
    vec3 f = fract(p) - 0.5;
    float h = hash3(id);
    if (h > 0.985) {
        // Sharp cutoff for pixel-like appearance
        float d = max(abs(f.x), max(abs(f.y), abs(f.z)));
        if (d < 0.15) {
            float bright = (h - 0.985) * 60.0;
            stars = vec3(bright * 0.6);
        }
    }
    return stars;
}

// =============================================================================
// ROCKY PLANET SHADER
// =============================================================================

vec3 renderRockyPlanet(vec2 uv, vec3 normal, vec3 baseColor, float seed) {
    vec2 terrainUv = uv + vec2(seed * 10.0, seed * 7.0);

    // Vary base color
    vec3 hsv = rgb2hsv(baseColor);
    hsv.x = fract(hsv.x + seed * 0.15);
    hsv.y = clamp(hsv.y * 1.3, 0.5, 1.0);
    hsv.z = clamp(hsv.z * 1.1, 0.4, 1.0);
    vec3 variedColor = hsv2rgb(hsv);

    // Terrain elevation
    float terrain = fbmSimplex2D(terrainUv * (3.0 + seed * 3.0));

    // Color zones
    vec3 lowland = variedColor * 0.6;  // Oceans/valleys
    vec3 highland = variedColor * 1.1; // Land
    vec3 peak = variedColor * 1.4;     // Mountains/ice caps

    // Mix by elevation
    vec3 surfaceColor = mix(lowland, highland, smoothstep(0.3, 0.6, terrain));
    surfaceColor = mix(surfaceColor, peak, smoothstep(0.7, 0.9, terrain));

    // Craters
    float craters = snoise2D(terrainUv * (25.0 + seed * 15.0));
    float craterMask = smoothstep(0.8, 0.7, craters);
    surfaceColor *= (1.0 - craterMask * 0.25);

    // Fine detail
    float detail = snoise2D(terrainUv * 40.0) * 0.05;
    surfaceColor += surfaceColor * detail;

    // Limb darkening (atmosphere effect)
    float limb = smoothstep(-0.2, 0.8, normal.z);
    surfaceColor *= 0.4 + limb * 0.6;

    return surfaceColor;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    // Mouse control
    float camDist = 9.0;
    float camAngleX, camAngleY;

    // Has mouse ever been clicked?
    bool mouseUsed = iMouse.x > 0.0 || iMouse.y > 0.0;

    if (!mouseUsed) {
        // Auto-rotate until first interaction
        camAngleX = iTime * 0.1;
        camAngleY = 0.15;
    } else {
        // After first click: auto-rotate continues, mouse offset persists
        // iMouse.xy holds last position even after release
        vec2 mouse = iMouse.xy / iResolution.xy;

        // Auto-rotate base + mouse offset
        // Mouse X scrolls through angles, wrapping around
        camAngleX = iTime * 0.1 + mouse.x * TAU * 2.0;
        camAngleY = 0.15 + (mouse.y - 0.5) * PI * 0.5;
    }

    camAngleY = clamp(camAngleY, -0.8, 0.8);

    vec3 ro = vec3(
        camDist * cos(camAngleY) * sin(camAngleX),
        camDist * sin(camAngleY),
        camDist * cos(camAngleY) * cos(camAngleX)
    );

    vec3 forward = normalize(-ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = cross(forward, right);
    vec3 rd = normalize(forward + uv.x * right + uv.y * up);

    // === TEMPERATURE CYCLING ===
    // Offset so we start at nice orange (4000K) and cycle through all types
    float tempCycle = mod(iTime * 0.08 + 0.3125, 1.0);  // Start at orange, full cycle ~12s
    float temperature;
    if (tempCycle < 0.125) temperature = mix(4000.0, 5778.0, tempCycle / 0.125);       // Orange -> Yellow
    else if (tempCycle < 0.25) temperature = mix(5778.0, 7500.0, (tempCycle - 0.125) / 0.125);   // Yellow -> White
    else if (tempCycle < 0.375) temperature = mix(7500.0, 10000.0, (tempCycle - 0.25) / 0.125);  // White -> Blue-white
    else if (tempCycle < 0.5) temperature = mix(10000.0, 25000.0, (tempCycle - 0.375) / 0.125);  // Blue-white -> Blue
    else if (tempCycle < 0.625) temperature = mix(25000.0, 800.0, (tempCycle - 0.5) / 0.125);    // Blue -> Magenta (wrap)
    else if (tempCycle < 0.75) temperature = mix(800.0, 2500.0, (tempCycle - 0.625) / 0.125);    // Magenta -> Red
    else if (tempCycle < 0.875) temperature = mix(2500.0, 3500.0, (tempCycle - 0.75) / 0.125);   // Red -> Orange-red
    else temperature = mix(3500.0, 4000.0, (tempCycle - 0.875) / 0.125);                          // Orange-red -> Orange

    vec3 starColor = temperatureToColor(temperature);
    // Normalize to prevent washout
    float maxC = max(starColor.r, max(starColor.g, starColor.b));
    if (maxC > 0.01) starColor = starColor / maxC * 0.85;

    // Background
    vec3 col = backgroundStars(rd) * 0.5;

    // Outer glow (behind everything)
    col += outerGlow(uv, starColor);

    // Light rays
    col += lightRays(uv, starColor, iTime);

    // Corona volume
    col += corona(ro, rd, starColor, iTime);

    // Solar flares
    col += solarFlares(ro, rd, starColor, iTime);

    // Flame tongues - break the circular silhouette
    col += flameTongues(ro, rd, starColor, iTime);

    // Raymarch star sphere
    float b = dot(ro, rd);
    float c = dot(ro, ro) - STAR_RADIUS * STAR_RADIUS;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 p = ro + rd * t;
            vec3 n = normalize(p);

            // Rotate star around its axis (fast spin)
            float starRotation = iTime * 0.5;
            float cosR = cos(starRotation);
            float sinR = sin(starRotation);
            vec3 rotatedP = vec3(
                p.x * cosR - p.z * sinR,
                p.y,
                p.x * sinR + p.z * cosR
            );

            float viewAngle = max(dot(n, -rd), 0.0);
            col = renderSurface(rotatedP, viewAngle, starColor, iTime);

            // Organic rim glow - varies around the edge to break circular silhouette
            float rim = 1.0 - max(dot(n, -rd), 0.0);

            // Add noise to rim intensity based on position
            float rimAngle = atan(n.y, n.x);
            float rimElev = acos(n.z);
            float rimNoise = snoise3D(vec3(rimAngle * 3.0, rimElev * 2.0, iTime * 0.2));
            rimNoise = rimNoise * 0.5 + 0.5;

            // Flame-like protrusions at the edge
            float flameRim = tiledNoise3D(vec3(rimAngle / TAU, rimElev / PI, iTime * 0.15), 12.0);
            flameRim = abs(flameRim);

            // Combine for organic edge
            float rimIntensity = pow(rim, 2.5) * (0.4 + rimNoise * 0.6 + flameRim * 0.5);
            col += starColor * vec3(1.3, 0.95, 0.6) * rimIntensity * 0.8;

            // Extra bright spots that "pop" out
            float hotSpots = pow(rimNoise * flameRim, 2.0);
            col += starColor * vec3(1.5, 1.1, 0.7) * hotSpots * rim * 0.5;
        }
    }

    // =========================================================================
    // ORBITING PLANET
    // =========================================================================

    // Planet orbital position (orbits around star)
    float orbitAngle = iTime * PLANET_ORBIT_SPEED;
    vec3 planetCenter = vec3(
        cos(orbitAngle) * PLANET_ORBIT_RADIUS,
        0.0,  // Flat orbit, centered on star
        sin(orbitAngle) * PLANET_ORBIT_RADIUS
    );

    // Check if ray hits planet
    float planetHitDist = intersectSphere(ro, rd, planetCenter, PLANET_RADIUS);

    // Check if ray hits star (for depth comparison)
    float starHitDist = intersectSphere(ro, rd, vec3(0.0), STAR_RADIUS);
    if (starHitDist < 0.0) starHitDist = 1e10;  // No hit = far away

    // Only render planet if it's in front of the star
    if (planetHitDist > 0.0 && planetHitDist < starHitDist) {
        vec3 hitPoint = ro + rd * planetHitDist;
        vec3 planetNormal = normalize(hitPoint - planetCenter);

        // Planet self-rotation for UV mapping
        float rotAngle = iTime * PLANET_ROTATION_SPEED;
        float cosR = cos(rotAngle);
        float sinR = sin(rotAngle);
        vec3 rotatedNormal = vec3(
            planetNormal.x * cosR - planetNormal.z * sinR,
            planetNormal.y,
            planetNormal.x * sinR + planetNormal.z * cosR
        );

        // UV from rotated coordinates
        float latitude = 0.5 + asin(rotatedNormal.y) / PI;
        float longitude = 0.5 + atan(rotatedNormal.x, rotatedNormal.z) / TAU;
        vec2 planetUv = vec2(longitude, latitude);

        // View-space normal for limb darkening
        vec3 viewNormal = planetNormal;
        viewNormal.z = dot(planetNormal, -rd);

        // Render planet surface
        vec3 planetSurface = renderRockyPlanet(planetUv, viewNormal, PLANET_BASE_COLOR, 0.42);

        // === STAR LIGHTING ===
        vec3 lightDir = normalize(-planetCenter);  // Direction to star (at origin)
        float diffuse = max(dot(planetNormal, lightDir), 0.0);

        // Boost diffuse for more visible lighting
        diffuse = pow(diffuse, 0.7);  // Soften falloff for more light coverage

        // Smooth terminator (day/night transition)
        float terminator = smoothstep(-0.05, 0.15, diffuse);

        // Ambient light
        float ambient = 0.08;

        // Night side
        vec3 nightColor = planetSurface * ambient;

        // Day side - much brighter, strongly lit by star
        vec3 dayColor = planetSurface * (0.3 + diffuse * 1.2);

        // Tint day side with star color (stronger tint)
        dayColor *= mix(vec3(1.0), starColor * 1.5, 0.5);

        vec3 planetCol = mix(nightColor, dayColor, terminator);

        // Atmospheric rim glow (catches star light at edges)
        float rimLight = pow(1.0 - abs(dot(viewNormal, vec3(0.0, 0.0, 1.0))), 2.5);
        float rimLit = max(dot(planetNormal, lightDir) + 0.4, 0.0);
        planetCol += starColor * rimLight * rimLit * 0.5;

        col = planetCol;
    }

    // Post-processing
    col = col / (1.0 + col);  // Tone mapping
    col = pow(col, vec3(0.9));  // Gamma
    col *= 1.0 - dot(uv, uv) * 0.15;  // Vignette
    col += col * col * 0.08;  // Subtle bloom

    fragColor = vec4(col, 1.0);
}
