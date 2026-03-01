/**
 * Caustics Beach — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-03-01
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Underwater view: pitch range allows looking up at surface and
 * down at the sand floor.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Underwater range: camera can look up at the surface or down at the sand
#define PITCH_MIN -0.4    // Look down toward the sand floor
#define PITCH_MAX  0.5    // Look up toward the water surface

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
