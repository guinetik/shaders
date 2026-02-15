/**
 * Lava World
 * @author guinetik
 * @date 2025-11-27
 *
 * A molten lava planet with dark cooled crust, glowing magma cracks, and a
 * hot atmospheric haze. Fully procedural using hash-based noise.
 *
 * Based on "Tiny Planet: Vulcan" by Morgan McGuire @CasualEffects.
 * Adapted for standalone rendering with no texture dependencies.
 *
 * Rendering layers (front to back):
 *   1. Crust surface — tectonic plates formed by FBM heightmap
 *   2. Lava emission — glowing cracks where crust height is low (lava pools)
 *      and at plate boundaries (edge heat from height gradient)
 *   3. Rim glow     — hot atmospheric haze at the limb
 *   4. Halo         — off-sphere atmospheric glow for background
 *
 * TECHNIQUE: Analytic unit-sphere projection — same as the Earth shader.
 * Surface position and normal derived from Pythagorean identity on a unit sphere.
 *
 * TECHNIQUE: Height-inverted heat mapping. Crust height from FBM is inverted so
 * low regions become hot lava pools and high regions become cool solidified crust.
 * Plate boundaries (mid-height zones) get extra crack detail, simulating tectonic
 * spreading ridges.
 *
 * Physics: Lava emission uses a self-illumination model — hot areas add emissive
 * light proportional to heat^2, while cool crust relies on diffuse sun lighting.
 * The pulsing glow modulates heat over time to simulate convective churning.
 *
 * Noise: Hash-based 3D value noise (fract-sin family) with configurable FBM
 * octaves. Crust uses 6 octaves for detailed plate structure; lava cracks use
 * 4-5 octaves at different scales for veins and large fissures.
 */

// =============================================================================
// NOISE
// =============================================================================
// Noise: Hash-based 3D value noise using fract(sin(n)*1e4) family.
// The step vector (110, 241, 171) creates a unique hash per lattice cell,
// and Hermite smoothstep interpolation (3t^2 - 2t^3) gives C1 continuity.

float hash(float n) { return fract(sin(n) * 1e4); }

float noise(vec3 x) {
    const vec3 step = vec3(110.0, 241.0, 171.0);   // Prime-ish lattice offsets — chosen to avoid correlation
    vec3 i = floor(x);
    vec3 f = fract(x);
    float n = dot(i, step);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix(hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix(hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix(hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

// FBM with configurable octave count — lacunarity 2.0, gain 0.5
// The shift vec3(100.0) offsets each octave's domain to decorrelate layers.
float fbm(vec3 x, int octaves) {
    float v = 0.0;
    float a = 0.5;              // Amplitude — halves per octave (gain = 0.5)
    vec3 shift = vec3(100.0);   // Domain offset between octaves to avoid self-correlation
    for (int i = 0; i < 6; ++i) {
        if (i >= octaves) break;
        v += a * noise(x);
        x = x * 2.0 + shift;   // Lacunarity 2.0 — doubles frequency each octave
        a *= 0.5;
    }
    return v;
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

float square(float x) { return x * x; }

// =============================================================================
// LAVA PALETTE — single noise value mapped to a hot/cold color ramp
// =============================================================================

// Color ramp: black crust → dark red → orange → bright yellow
vec3 lavaRamp(float t) {
    // t=0: cold dark crust, t=1: white-hot magma
    const vec3 BLACK_CRUST = vec3(0.05, 0.02, 0.01);
    const vec3 DARK_RED    = vec3(0.4, 0.05, 0.0);
    const vec3 ORANGE      = vec3(1.0, 0.35, 0.0);
    const vec3 YELLOW_HOT  = vec3(1.0, 0.85, 0.3);

    if (t < 0.3) return mix(BLACK_CRUST, DARK_RED, t / 0.3);
    if (t < 0.6) return mix(DARK_RED, ORANGE, (t - 0.3) / 0.3);
    return mix(ORANGE, YELLOW_HOT, (t - 0.6) / 0.4);
}

// =============================================================================
// LAVA SURFACE
// =============================================================================

// Crust elevation — forms tectonic plates
// Scale 3.0 controls plate size — lower = larger continents, higher = more fragmented
// 6 octaves gives fine detail on plate surfaces
float crustHeight(vec3 pos) {
    return fbm(pos * 3.0, 6);
}

// Lava heat — where the cracks glow hot
// TECHNIQUE: Height-inverted heat mapping — low crust = hot lava pools,
// high crust = cool solidified plates, mid-height = glowing plate edges
float lavaHeat(vec3 pos, float time) {
    // Large-scale cracks between plates — scale 4.0, slow drift
    float cracks = fbm(pos * 4.0 + vec3(0.0, time * 0.01, 0.0), 5);

    // Fine detail veins
    float veins = fbm(pos * 8.0 + vec3(time * 0.02, 0.0, time * 0.015), 4);

    // Combine: low crust = hot cracks, high crust = cool plates
    float height = crustHeight(pos);

    // Invert height: low areas are hot (lava pools), high areas are cool crust
    float heat = 1.0 - smoothstep(0.3, 0.6, height);

    // Add crack detail in medium-height zones (edges of plates)
    float edgeHeat = smoothstep(0.35, 0.45, height) * smoothstep(0.55, 0.45, height);
    heat += edgeHeat * cracks * 1.5;

    // Fine veins everywhere, stronger in hot areas
    heat += veins * 0.2 * heat;

    // Pulsing glow
    heat *= 0.8 + 0.2 * sin(time * 0.3 + fbm(pos * 2.0, 3) * 6.0);

    return clamp(heat, 0.0, 1.0);
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 0.8));  // Sun direction (upper-right-forward)
    const vec3 ATMOS_COL = vec3(0.7, 0.15, 0.02);         // Atmosphere tint — sulfurous orange-red haze
    const vec3 RIM_COL = vec3(1.0, 0.4, 0.05);            // Hot atmospheric rim — bright orange for thermal glow

    // Map window to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.06 * iTime;
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Surface normal via finite difference on crust height
        float height = crustHeight(noisePos);
        vec3 tangent = normalize(cross(noisePos, vec3(0.0, 1.0, 0.0)));
        vec3 binormal = cross(noisePos, tangent);
        const float DX = 0.01;              // Finite-difference step for normal computation — smaller = sharper but noisier
        const float HEIGHT_SCALE = 0.08;   // Normal perturbation amplitude — higher = bumpier crust terrain
        float he = height * HEIGHT_SCALE;
        float tangentW = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * tangent)) / DX;
        float binormalW = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * binormal)) / DX;
        vec3 surfNormal = normalize(noisePos + tangent * tangentW + binormal * binormalW);
        surfNormal.xz = Rotate(surfNormal.xz, -surfaceRot);
        normal = normalize(mix(surfNormal, pos, 0.9));

        // Compute lava heat and map to color
        float heat = lavaHeat(noisePos, iTime);
        vec3 surfaceColor = lavaRamp(heat);

        // Lighting — diffuse on crust, emission from hot areas
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);

        // Dark crust is lit by the sun; hot areas emit their own light
        vec3 litCrust = surfaceColor * diffuse;
        vec3 emission = surfaceColor * heat * heat * 2.0;
        fragColor.rgb = mix(litCrust, litCrust + emission, heat);

        // TECHNIQUE: Rim glow simulating hot atmospheric haze at limb
        // pow(1-z, 1.5) approximates long optical path through volcanic atmosphere
        float rim = pow(1.0 - pos.z, 1.5);     // Exponent 1.5 — steeper = thinner rim
        fragColor.rgb += RIM_COL * rim * 0.8;

        // Atmosphere edge blend
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += ATMOS_COL * rim * 0.4;
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = ATMOS_COL * halo * lightFacing * 1.5;
    }

    // Gamma — 0.9 exponent (slightly less than standard 0.45) to preserve
    // contrast in the dark crust while boosting lava glow visibility
    fragColor.rgb = pow(fragColor.rgb, vec3(0.9));
    fragColor.a = 1.0;
}
