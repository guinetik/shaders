/**
 * Caustic Study #03: Crystal — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-02-18
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Crystal view: wider pitch range for looking down at the gem from above.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Slightly elevated default view to look down at the crystal
#define PITCH_MIN -0.5    // Max downward tilt — allows steep overhead view
#define PITCH_MAX  0.3    // Max upward tilt — sees crystal from below

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
