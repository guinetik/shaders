/**
 * Liquid Glass
 * @author guinetik
 * @date 2026-01-23
 *
 * Two superellipse glass blobs drifting over an input image,
 * bouncing off screen edges like billiard balls and merging
 * into metaball shapes via smooth minimum blending.
 *
 * Ported from Genuary 2026 Day 23 ("Transparency").
 *
 * Physical model:
 * - Fresnel equations for dielectric reflectance (IOR 1.5 ~ glass)
 * - Chromatic aberration via wavelength-dependent refraction offset
 * - Gaussian blur kernel for frosted glass scattering
 * - Superellipse SDF for rounded-square lens shape
 * - Smooth minimum (smin) for organic metaball merging
 *
 * @credit PaoloCurtoni (shader inspiration), IQ (superellipse SDF)
 */

// -- Glass properties --
#define IOR                 1.5   // Index of refraction — 1.5 is typical crown glass.
                                  // Higher (1.8+) = more reflection, stronger Fresnel.
#define BLUR_STRENGTH       1.5   // Frosted glass scatter radius — higher = more diffuse/frosted.
                                  // 0 = perfectly clear glass. 3+ = heavily frosted.

// -- Shape --
#define RADIUS              0.22  // Blob radius in NDC — larger = bigger glass blobs.
#define SUPERELLIPSE_N      4.0   // Superellipse exponent — 2.0 = circle, 4.0 = rounded square,
                                  // higher = sharper corners approaching a true square.
#define BLEND_RADIUS        0.12  // Smooth-minimum blend radius for metaball merging.
                                  // Larger = blobs merge from farther apart; 0 = no blending.

// -- Lens distortion --
#define BASE_MAGNIFICATION  0.75  // UV scale inside the lens — <1.0 zooms out (minifies),
                                  // >1.0 zooms in (magnifies).
#define LENS_STRENGTH       0.4   // Edge distortion intensity — how much the lens warps near edges.
#define EDGE_EXPONENT       3.0   // Exponential distortion ramp — higher = distortion concentrated at edges.
#define DEPTH_NORMALIZER    0.8   // Fraction of radius used as max SDF depth — controls distortion falloff shape.
#define ABERRATION_AMOUNT   0.08  // Chromatic aberration — separation between R and B channels.
                                  // 0 = no aberration. 0.15+ = very visible color fringing.

// -- Edge highlight --
#define EDGE_THICKNESS      0.008 // Width of the bright rim at the glass boundary.
#define EDGE_DIAG_SCALE     1.5   // Scale for diagonal highlight pattern on the edge rim.
#define EDGE_DIAG_POWER     1.8   // Sharpness of diagonal highlight — higher = tighter specular band.
#define EDGE_BRIGHTNESS     1.2   // Peak brightness of the edge highlight (>1.0 = HDR white).

// -- Shadow --
#define SHADOW_OFFSET       0.02  // Vertical offset of the drop shadow below the blob.
#define SHADOW_SPREAD       0.06  // How far the shadow feathers outward from the blob edge.
#define SHADOW_OPACITY      0.15  // Peak shadow darkness — 0.0 = invisible, 1.0 = fully opaque.

// -- Fresnel --
#define FRESNEL_STRENGTH    0.35  // How much Fresnel reflection tints the glass surface.
                                  // 0.0 = no reflection. 1.0 = fully reflective at grazing angles.
#define FRESNEL_GRAD_EPS    0.01  // Epsilon for numerical gradient of the blended SDF (normal estimation).
#define NORMAL_Z            0.5   // Z component of the pseudo-3D normal — controls perceived curvature depth.

// -- Blur kernel --
#define BLUR_SAMPLES        16    // Gaussian blur grid side length — total taps = (SAMPLES/2)^2.
                                  // 8 = fast/coarse. 32 = smooth but expensive.
#define BLUR_SIGMA_FACTOR   0.25  // Gaussian sigma as fraction of sample count — controls blur bell width.
#define BLUR_PIXEL_SCALE    0.002 // UV-space size of each blur tap offset.

// -- Motion (blob A) --
#define SPEED_AX            0.31  // Horizontal bounce speed for blob A — larger = faster drift.
#define SPEED_AY            0.23  // Vertical bounce speed for blob A.
#define PHASE_AX            0.37  // Horizontal phase offset — shifts starting position.
#define PHASE_AY            0.71  // Vertical phase offset.

// -- Motion (blob B) --
#define SPEED_BX            0.43  // Horizontal bounce speed for blob B.
#define SPEED_BY            0.29  // Vertical bounce speed for blob B.
#define PHASE_BX            2.13  // Horizontal phase offset.
#define PHASE_BY            1.47  // Vertical phase offset.

// -- Bounds --
#define BOUNDS_MARGIN       0.02  // Inset from screen edge for bounce limits.

// -- Weighted center --
#define CENTER_FALLOFF      8.0   // Gaussian falloff for weighted center calculation.
                                  // Higher = each blob's lens effect stays more localized.

// -- Post-processing --
#define VIGNETTE_START      0.6   // Radial distance where vignette begins (0 = center, 1 = edge).
#define VIGNETTE_END        1.4   // Radial distance where vignette reaches full darkness.
#define VIGNETTE_MIX        0.1   // Vignette blending strength — 0 = off, 1 = full effect.
#define GAMMA               0.95  // Output gamma — <1.0 brightens midtones, >1.0 darkens.
#define GLASS_TINT          vec3(0.95, 0.98, 1.0)   // Subtle cool tint applied inside the glass.
#define GLASS_LIFT          0.15  // Additive brightness lift inside the glass — simulates internal scattering.
#define FRESNEL_COLOR       vec3(1.0, 0.98, 0.95)   // Warm-white Fresnel reflection highlight color.

// -- SDF iteration --
#define SDF_ITERATIONS      12    // Accuracy of superellipse SDF distance — more = tighter fit to the shape.
                                  // 6 = fast but rough. 16+ = very accurate but expensive.
#define PI_OVER_4           0.7853981634

// =============================================================================
// IQ's Superellipse SDF
// Returns vec3(distance, gradient.xy)
// =============================================================================

vec3 sdSuperellipse(vec2 p, float r, float n) {
    p = p / r;
    vec2 gs = sign(p);
    vec2 ps = abs(p);
    float gm = pow(ps.x, n) + pow(ps.y, n);
    float gd = pow(gm, 1.0 / n) - 1.0;
    vec2 g = gs * pow(ps, vec2(n - 1.0)) * pow(gm, 1.0 / n - 1.0);
    p = abs(p);
    if (p.y > p.x) p = p.yx;
    n = 2.0 / n;
    float d = 1e20;
    vec2 oq = vec2(1.0, 0.0);
    for (int i = 1; i < SDF_ITERATIONS; i++) {
        float h = float(i) / float(SDF_ITERATIONS - 1);
        vec2 q = vec2(pow(cos(h * PI_OVER_4), n),
                      pow(sin(h * PI_OVER_4), n));
        vec2 pa = p - oq;
        vec2 ba = q - oq;
        vec2 z = pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float d2 = dot(z, z);
        if (d2 < d) {
            d = d2;
        }
        oq = q;
    }
    return vec3(sqrt(d) * sign(gd) * r, g);
}

// =============================================================================
// Smooth minimum for blending SDFs
// =============================================================================

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// =============================================================================
// Fresnel reflectance (Schlick-approximated dielectric)
// =============================================================================

float fresnel(vec3 I, vec3 N, float ior) {
    float cosi = clamp(dot(I, N), -1.0, 1.0);
    float etai = 1.0, etat = ior;
    if (cosi > 0.0) {
        float temp = etai;
        etai = etat;
        etat = temp;
    }
    float sint = etai / etat * sqrt(max(0.0, 1.0 - cosi * cosi));
    if (sint >= 1.0) {
        return 1.0;
    }
    float cost = sqrt(max(0.0, 1.0 - sint * sint));
    cosi = abs(cosi);
    float Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
    float Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
    return (Rs * Rs + Rp * Rp) / 2.0;
}

// =============================================================================
// Sample the background image from iChannel0
// UV is in centered [-aspect, aspect] x [-1, 1] space;
// remap to [0,1] for texture lookup.
// =============================================================================

vec3 sampleBackground(vec2 uv, float aspect) {
    vec2 texUV = vec2(uv.x / aspect, uv.y) * 0.5 + 0.5;
    texUV = clamp(texUV, 0.001, 0.999);
    return texture(iChannel0, texUV).rgb;
}

// =============================================================================
// Gaussian blur (frosted glass scattering)
// =============================================================================

float gaussian(vec2 i) {
    float sigma = float(BLUR_SAMPLES) * BLUR_SIGMA_FACTOR;
    return exp(-0.5 * dot(i / sigma, i / sigma)) / (6.28318 * sigma * sigma);
}

vec3 efficientBlur(vec2 uv, float blurAmt, float aspect) {
    vec3 O = vec3(0.0);
    float totalWeight = 0.0;
    int s = BLUR_SAMPLES / 2;

    for (int i = 0; i < 64; i++) {
        if (i >= s * s) break;
        vec2 d = vec2(mod(float(i), float(s)), floor(float(i) / float(s)))
                 * 2.0 - float(s) / 2.0;
        vec2 offset = d * blurAmt * BLUR_PIXEL_SCALE;
        float weight = gaussian(d);

        vec3 sampleCol = sampleBackground(uv + offset, aspect);
        O += sampleCol * weight;
        totalWeight += weight;
    }

    return O / totalWeight;
}

// =============================================================================
// Triangle-wave bounce: maps linear time to ping-pong within [-bound, bound]
// =============================================================================

float triangleWave(float t, float bound) {
    float halfPeriod = 2.0 * bound;
    return bound - abs(mod(t, 2.0 * halfPeriod) - halfPeriod);
}

// =============================================================================
// Main
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy - 0.5) * 2.0;
    float aspect = iResolution.x / iResolution.y;
    uv.x *= aspect;

    // =========================================================================
    // Blob positions: billiard-ball bounce via triangle wave
    // =========================================================================
    float boundsX = aspect - RADIUS - BOUNDS_MARGIN;
    float boundsY = 1.0 - RADIUS - BOUNDS_MARGIN;

    vec2 posA = vec2(
        triangleWave(iTime * SPEED_AX + PHASE_AX, boundsX),
        triangleWave(iTime * SPEED_AY + PHASE_AY, boundsY)
    );
    vec2 posB = vec2(
        triangleWave(iTime * SPEED_BX + PHASE_BX, boundsX),
        triangleWave(iTime * SPEED_BY + PHASE_BY, boundsY)
    );

    // =========================================================================
    // Blended SDF (metaball merge via smin)
    // =========================================================================
    float dA = sdSuperellipse(uv - posA, RADIUS, SUPERELLIPSE_N).x;
    float dB = sdSuperellipse(uv - posB, RADIUS, SUPERELLIPSE_N).x;
    float d = smin(dA, dB, BLEND_RADIUS);

    // Weighted center — pixels near blob A pull toward A, near B toward B
    float wA = exp(-dA * dA * CENTER_FALLOFF);
    float wB = exp(-dB * dB * CENTER_FALLOFF);
    vec2 center = (posA * wA + posB * wB) / (wA + wB + 1e-6);

    // Shadow (blended)
    vec2 shadowA = posA + vec2(0.0, -SHADOW_OFFSET);
    vec2 shadowB = posB + vec2(0.0, -SHADOW_OFFSET);
    float sdA = sdSuperellipse(uv - shadowA, RADIUS, SUPERELLIPSE_N).x;
    float sdB = sdSuperellipse(uv - shadowB, RADIUS, SUPERELLIPSE_N).x;
    float shadowD = smin(sdA, sdB, BLEND_RADIUS);
    float shadowMask = (1.0 - smoothstep(0.0, SHADOW_SPREAD, shadowD)) * SHADOW_OPACITY;

    // Base background
    vec3 baseColor = sampleBackground(uv, aspect);
    baseColor = mix(baseColor, vec3(0.0), shadowMask);

    vec3 finalColor = baseColor;

    // =========================================================================
    // Inside the glass
    // =========================================================================
    if (d < 0.0) {
        vec2 offset = uv - center;
        float distFromCenter = length(offset);

        float depthInShape = abs(d);
        float normalizedDepth = clamp(depthInShape / (RADIUS * DEPTH_NORMALIZER), 0.0, 1.0);
        float edgeFactor = 1.0 - normalizedDepth;
        float exponentialDistortion = exp(edgeFactor * EDGE_EXPONENT) - 1.0;

        float distortionAmount = exponentialDistortion * LENS_STRENGTH;

        // Chromatic aberration
        float baseDistortion = BASE_MAGNIFICATION + distortionAmount * distFromCenter;

        float redDistortion   = baseDistortion * (1.0 - ABERRATION_AMOUNT);
        float greenDistortion = baseDistortion;
        float blueDistortion  = baseDistortion * (1.0 + ABERRATION_AMOUNT);

        vec2 redUV   = center + offset * redDistortion;
        vec2 greenUV = center + offset * greenDistortion;
        vec2 blueUV  = center + offset * blueDistortion;

        float blur = BLUR_STRENGTH * (edgeFactor * 0.5 + 0.5);

        vec3 redBlur   = efficientBlur(redUV,   blur, aspect);
        vec3 greenBlur = efficientBlur(greenUV, blur, aspect);
        vec3 blueBlur  = efficientBlur(blueUV,  blur, aspect);

        vec3 refractedColor = vec3(redBlur.r, greenBlur.g, blueBlur.b);
        refractedColor *= GLASS_TINT;
        refractedColor += vec3(GLASS_LIFT);

        // Fresnel via numerical gradient of the blended SDF
        vec2 eps = vec2(FRESNEL_GRAD_EPS, 0.0);
        float dxp = smin(
            sdSuperellipse(uv + eps.xy - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv + eps.xy - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dxn = smin(
            sdSuperellipse(uv - eps.xy - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv - eps.xy - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dyp = smin(
            sdSuperellipse(uv + eps.yx - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv + eps.yx - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dyn = smin(
            sdSuperellipse(uv - eps.yx - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv - eps.yx - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);

        vec2 gradient = vec2(dxp - dxn, dyp - dyn);
        vec3 normal = normalize(vec3(gradient, NORMAL_Z));
        vec3 viewDir = vec3(0.0, 0.0, -1.0);
        float fresnelAmount = fresnel(viewDir, normal, IOR);

        finalColor = mix(refractedColor, FRESNEL_COLOR, fresnelAmount * FRESNEL_STRENGTH);
    }

    // =========================================================================
    // Edge highlight
    // =========================================================================
    float edgeMask = smoothstep(EDGE_THICKNESS, 0.0, abs(d));

    if (edgeMask > 0.0) {
        vec2 normalizedPos = uv * EDGE_DIAG_SCALE;
        float diagonal1 = abs(normalizedPos.x + normalizedPos.y);
        float diagonal2 = abs(normalizedPos.x - normalizedPos.y);
        float diagonalFactor = max(
            smoothstep(1.0, 0.1, diagonal1),
            smoothstep(1.0, 0.5, diagonal2)
        );
        diagonalFactor = pow(diagonalFactor, EDGE_DIAG_POWER);

        vec3 edgeWhite = vec3(EDGE_BRIGHTNESS);
        vec3 internalColor = finalColor * 0.5;
        vec3 edgeColor = mix(internalColor, edgeWhite, diagonalFactor);
        finalColor = mix(finalColor, edgeColor, edgeMask);
    }

    // =========================================================================
    // Post-processing: vignette + gamma
    // =========================================================================
    float vig = 1.0 - smoothstep(VIGNETTE_START, VIGNETTE_END, length(uv / aspect));
    finalColor *= 1.0 - VIGNETTE_MIX + vig * VIGNETTE_MIX;
    finalColor = pow(max(finalColor, vec3(0.0)), vec3(GAMMA));

    fragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
