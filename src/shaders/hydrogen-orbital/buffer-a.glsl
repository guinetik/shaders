/**
 * Hydrogen Orbital — Buffer A: Camera state
 * @author guinetik
 * @date 2026-02-22
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Slightly elevated default view to look at the orbital from a natural angle.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
#define PITCH_MIN -0.6    // Max downward tilt — view orbital from above
#define PITCH_MAX  0.6    // Max upward tilt — view orbital from below

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
