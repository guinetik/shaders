/**
 * Caustic Pattern (joltz0r / David Hoskins)
 * @author joltz0r, David Hoskins (adapted by guinetik)
 * @date 2026-02-16
 *
 * Iterative domain warp for underwater caustic patterns.
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor.
 *
 * Two layers at different scales are recommended for depth complexity.
 */

#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Compute raw caustic convergence via iterative domain warp.
 *
 * Returns normalized accumulation value -- higher where displaced UV
 * coordinates converge, producing bright caustic lines. Apply
 * post-processing for final brightness curve:
 *   c = base - pow(c, power);   // typical: 1.17 - pow(c, 1.4)
 *   c = pow(abs(c), bright);    // typical: pow(abs(c), 8.0)
 *
 * @param uv        2D sample position
 * @param scale     UV scaling (larger = finer pattern, typical 0.5-3.0)
 * @param time      Animation time (pre-scaled by caller)
 * @param iters     Warp iterations: 3=soft blobs, 5=crisp, 8+=very sharp
 * @param intensity Inverse-distance sensitivity (smaller = tighter lines, typical 0.005)
 * @return Normalized convergence value
 */
float causticWarp(vec2 uv, float scale, float time, int iters, float intensity) {
    vec2 p = mod(uv * scale * M_TAU, M_TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    for (int n = 0; n < 8; n++) {
        if (n >= iters) break;
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / intensity),
            p.y / (cos(i.y + tt) / intensity)
        ));
    }
    return c / float(iters);
}
