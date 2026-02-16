/**
 * 3D Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless 3D-to-2D projection helpers for attractor rendering.
 * Provides rotation matrices and projection functions.
 */

// === ROTATION MATRICES ===

/**
 * Rotation matrix around the X axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

/**
 * Rotation matrix around the Y axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// === PROJECTION ===

/**
 * Project a 3D point to 2D screen space via rotation matrix.
 *
 * Applies the view rotation and scales the result. The Z component
 * is discarded (orthographic projection along the view axis).
 *
 * @param p        3D point to project
 * @param viewRot  Combined view rotation matrix (typically rotY * rotX)
 * @param scale    Screen scale factor (pixels per unit)
 * @return 2D screen-space position
 */
vec2 projectMat(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * p).xy * scale;
}
