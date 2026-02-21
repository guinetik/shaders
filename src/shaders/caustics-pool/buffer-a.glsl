/**
 * Caustics Pool — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-02-15
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Pool view: shallow pitch range for looking down into the water.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Shallow range: camera looks slightly down into the pool
#define PITCH_MIN -0.35   // Max downward tilt — prevents looking under the pool
#define PITCH_MAX  0.18   // Max upward tilt — keeps water surface visible

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
