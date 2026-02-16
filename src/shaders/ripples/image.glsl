/**
 * Perlin Ripples Study
 * @author guinetik
 * @date 2026-01-30
 *
 * Chaotic liquid surface with multiple wandering ripple sources
 * that move unpredictably through noise space. Each source has
 * randomized parameters and pulsing intensity.
 *
 * Perlin Ripple Techniques:
 * - 3D gradient noise for smooth animation
 * - Chaotic multi-source ripple interference
 * - Turbulent displacement layers
 *
 * Visual Features:
 * - Unpredictable liquid surface
 * - Wandering ripple sources
 * - Colors sampled from displaced texture
 *
 * Commons: noise-perlin (perlinNoise3D, perlinGrad3), noise-value (hashN)
 */

#define PI 3.14159265359

// --- Source geometry ---
#define SOURCE_COUNT 6           // Number of wandering ripple emitters
#define WANDER_SPEED_X 0.3       // Horizontal noise-space traversal speed — higher = faster drift
#define WANDER_SPEED_Y 0.25      // Vertical noise-space traversal speed — slightly slower gives organic asymmetry
#define WANDER_AMPLITUDE 0.8     // Spatial extent of source wander — 0.5: centered, 1.0: fills screen

// --- Ripple parameters ---
#define RIPPLE_BASE_FREQ 15.0    // Minimum ripple spatial frequency (Hz) — lower = broader rings
#define RIPPLE_FREQ_RANGE 20.0   // Random frequency added per source (15-35 Hz total range)
#define RIPPLE_BASE_SPEED 2.0    // Minimum outward propagation speed — lower = slower wave travel
#define RIPPLE_SPEED_RANGE 3.0   // Random speed added per source (2-5 total range)
#define RIPPLE_DISPLACE 0.015    // Displacement amplitude per ripple source — higher = more UV distortion

// --- Turbulence ---
#define TURB_SPATIAL_SCALE 4.0   // Spatial frequency of turbulent noise layer — higher = finer detail
#define TURB_TIME_SPEED 0.4      // Animation rate of turbulence — 0.2: slow churn, 1.0: rapid boil
#define TURB_STRENGTH 0.03       // UV displacement from turbulence — above 0.05 looks jittery

// --- Burst events ---
#define BURST_EVENT_FREQ 0.5     // Bursts per second — higher = more frequent eruptions
#define BURST_RIPPLE_FREQ 25.0   // Spatial frequency of burst wavefront — higher = tighter rings
#define BURST_SPEED 15.0         // Outward propagation speed of burst ripple — fast for explosive feel
#define BURST_DISPLACE 0.025     // UV displacement strength of burst — stronger than ambient ripples
#define BURST_FADE_TIME 0.5      // Temporal fade threshold — burst decays from 1.0 to 0.0 over this fraction
#define BURST_FADE_RADIUS 0.6    // Spatial fade radius — burst invisible beyond this distance from origin

// --- Refraction & specular ---
#define REFRACT_HIGHLIGHT_SCALE 20.0  // Multiplier on displacement length for brightness — higher = brighter caustics
#define REFRACT_STRENGTH 0.5          // How much refraction modulates brightness — 0.0: none, 1.0: doubles
#define SPECULAR_POWER 6.0            // Exponent for specular flash sharpness — higher = tighter highlights
#define SPECULAR_STRENGTH 0.4         // Additive specular intensity — above 0.6 blows out whites

// --- Post-processing ---
#define VIGNETTE_STRENGTH 0.4    // Edge darkening factor — 0.0: no vignette, 1.0: fully dark corners

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    float time = iTime;

    vec2 p = uv - 0.5;
    p.x *= aspect;

    // === CHAOTIC RIPPLE SOURCES ===
    // Multiple wandering points that emit ripples
    float totalRipple = 0.0;
    vec2 totalDisplace = vec2(0.0);

    for (int i = 0; i < SOURCE_COUNT; i++) {
        float fi = float(i);
        // Seed offset per source — 73.156 is an arbitrary irrational-ish
        // constant that spaces sources far apart in noise space, avoiding
        // correlated motion between emitters
        float seed = fi * 73.156;

        // Each source wanders unpredictably using noise
        vec2 sourcePos = vec2(
            perlinNoise3D(vec3(time * WANDER_SPEED_X + seed, fi * 1.7, 0.0)),
            perlinNoise3D(vec3(fi * 2.3, time * WANDER_SPEED_Y + seed, 1.0))
        ) * WANDER_AMPLITUDE;

        // Distance to this source
        float dist = length(p - sourcePos);

        // Ripple with unique frequency, speed, and phase
        // Hash seeds (5.1, 7.3, 11.7) are coprime-ish multipliers that
        // ensure each source gets decorrelated freq/speed/phase values
        float freq = RIPPLE_BASE_FREQ + hashN(fi * 5.1) * RIPPLE_FREQ_RANGE;   // 15-35 Hz range
        float speed = RIPPLE_BASE_SPEED + hashN(fi * 7.3) * RIPPLE_SPEED_RANGE; // 2-5 propagation speed
        float phase = hashN(fi * 11.7) * 6.28;          // random initial phase

        float ripple = sin(dist * freq - time * speed + phase);

        // Irregular decay - not smooth falloff
        float decay = 1.0 / (1.0 + dist * (3.0 + hashN(fi * 3.3) * 4.0));
        decay *= 0.5 + 0.5 * sin(time * (0.5 + hashN(fi * 9.1)) + fi);

        ripple *= decay;
        totalRipple += ripple;

        // Displacement toward/away from source
        vec2 dir = normalize(p - sourcePos + 0.001);
        totalDisplace += dir * ripple * RIPPLE_DISPLACE;
    }

    // === TURBULENT NOISE LAYER ===
    // Add chaotic 3D noise displacement
    vec3 noisePos = vec3(p * TURB_SPATIAL_SCALE, time * TURB_TIME_SPEED);
    float turb1 = perlinNoise3D(noisePos);
    float turb2 = perlinNoise3D(noisePos * 2.3 + 100.0);

    totalDisplace += vec2(turb1, turb2) * TURB_STRENGTH;

    // === SUDDEN BURSTS ===
    // Occasional random strong ripples
    float burstPhase = floor(time * BURST_EVENT_FREQ);
    float burstT = fract(time * BURST_EVENT_FREQ);
    vec2 burstPos = vec2(
        hashN(burstPhase * 17.1) - 0.5,
        hashN(burstPhase * 23.7) - 0.5
    ) * BURST_FADE_RADIUS;
    float burstDist = length(p - burstPos);
    float burst = sin(burstDist * BURST_RIPPLE_FREQ - burstT * BURST_SPEED);
    burst *= smoothstep(BURST_FADE_TIME, 0.0, burstT);
    burst *= smoothstep(BURST_FADE_RADIUS, 0.0, burstDist);
    totalDisplace += normalize(p - burstPos + 0.001) * burst * BURST_DISPLACE;

    // === SAMPLE TEXTURE ===
    vec2 displacedUV = uv + totalDisplace;
    displacedUV = clamp(displacedUV, 0.001, 0.999);

    vec3 color = texture(iChannel0, displacedUV).rgb;

    // Fallback if no texture
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {
        // Chaotic liquid visualization
        float pattern = totalRipple * 0.3 + 0.5;
        pattern += turb1 * 0.2 + turb2 * 0.15;

        // Shifting color palette
        float hue = pattern * 0.5 + time * 0.05;
        vec3 col1 = vec3(0.1, 0.1, 0.2);
        vec3 col2 = 0.5 + 0.5 * cos(6.28 * (hue + vec3(0.0, 0.33, 0.67)));

        color = mix(col1, col2, smoothstep(0.2, 0.8, pattern));

        // Bright interference lines
        float interference = abs(fract(totalRipple * 2.0) - 0.5) * 2.0;
        interference = pow(interference, 8.0);
        color += vec3(0.8, 0.9, 1.0) * interference * 0.5;
    }

    // === REFRACTION BRIGHTNESS ===
    float refract = length(totalDisplace) * REFRACT_HIGHLIGHT_SCALE;
    color *= 1.0 + refract * REFRACT_STRENGTH;

    // === SPECULAR FLASHES ===
    float spec = pow(max(0.0, totalRipple), SPECULAR_POWER) * SPECULAR_STRENGTH;
    color += vec3(1.0) * spec;

    // === POST ===
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;
    color *= vig;

    fragColor = vec4(color, 1.0);
}
