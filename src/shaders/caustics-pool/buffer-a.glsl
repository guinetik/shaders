/**
 * Caustics Pool — Buffer A: Camera state
 *
 * Pixel (0,0) stores camera angles and velocities:
 *   .x = yaw angle (radians, wraps TAU)
 *   .y = pitch angle (radians, clamped)
 *   .z = yaw velocity (radians/frame)
 *   .w = pitch velocity (radians/frame)
 *
 * Pixel (1,0) stores previous mouse position:
 *   .x = previous mouse X normalized
 *   .y = previous mouse Y normalized
 *
 * Drag detection: if mouse position changed between frames, we're
 * dragging. This avoids relying on iMouse.z which stays positive
 * after the first click in our renderer.
 *
 * On release, velocity decays slowly (high friction coefficient =
 * long coast). When nearly stopped, yaw blends back to idle orbit;
 * pitch decays to zero.
 */

// -- Camera physics (per-frame units) --
#define FRICTION          0.993
#define DRAG_SENSITIVITY  2.0
#define PITCH_SENSITIVITY 0.3
#define VELOCITY_SMOOTH   0.35
#define IDLE_ORBIT_SPEED  0.003
#define IDLE_THRESHOLD    0.0003
#define IDLE_BLEND        0.015
#define DRAG_DEAD_ZONE    0.0001

// -- Pitch limits (radians) --
#define PITCH_MIN        -0.35
#define PITCH_MAX         0.18

#define TAU 6.28318530718

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Only pixels (0,0) and (1,0) store state
    if (fragCoord.x > 1.5 || fragCoord.y > 1.5)
    {
        fragColor = vec4(0.0);
        return;
    }

    // Read previous state from both pixels
    vec4 state = texelFetch(iChannel0, ivec2(0, 0), 0);
    vec4 mouse = texelFetch(iChannel0, ivec2(1, 0), 0);

    float yaw      = state.x;
    float pitch    = state.y;
    float yawVel   = state.z;
    float pitchVel = state.w;
    float prevMX   = mouse.x;
    float prevMY   = mouse.y;

    // Initialize on first frame
    if (iFrame == 0)
    {
        yaw      = 0.0;
        pitch    = 0.0;
        yawVel   = IDLE_ORBIT_SPEED;
        pitchVel = 0.0;
        prevMX   = iMouse.x / iResolution.x;
        prevMY   = iMouse.y / iResolution.y;
    }

    float mouseX = iMouse.x / iResolution.x;
    float mouseY = iMouse.y / iResolution.y;

    // Detect drag: mouse position actually changed this frame
    float dx = mouseX - prevMX;
    float dy = mouseY - prevMY;
    bool dragging = (dx * dx + dy * dy) > DRAG_DEAD_ZONE * DRAG_DEAD_ZONE;

    if (dragging)
    {
        // Blend drag delta into velocity for smooth momentum buildup
        float dragYawVel   = dx * DRAG_SENSITIVITY;
        float dragPitchVel = -dy * PITCH_SENSITIVITY; // inverted Y: drag up = look higher

        yawVel   = mix(yawVel,   dragYawVel,   VELOCITY_SMOOTH);
        pitchVel = mix(pitchVel, dragPitchVel, VELOCITY_SMOOTH);
    }
    else
    {
        // Not dragging: friction decay
        yawVel   *= FRICTION;
        pitchVel *= FRICTION;

        // Yaw blends toward idle orbit when nearly stopped
        if (abs(yawVel) < IDLE_THRESHOLD)
        {
            yawVel = mix(yawVel, IDLE_ORBIT_SPEED, IDLE_BLEND);
        }

        // Pitch decays to zero (no idle pitch movement)
        if (abs(pitchVel) < IDLE_THRESHOLD)
        {
            pitchVel = mix(pitchVel, 0.0, IDLE_BLEND);
        }
    }

    // Integrate angles
    yaw += yawVel;
    yaw = mod(yaw, TAU);

    pitch += pitchVel;
    pitch = clamp(pitch, PITCH_MIN, PITCH_MAX);

    // Output: pixel (0,0) = angles + velocities, pixel (1,0) = mouse
    if (fragCoord.x < 0.5)
    {
        fragColor = vec4(yaw, pitch, yawVel, pitchVel);
    }
    else
    {
        fragColor = vec4(mouseX, mouseY, 0.0, 0.0);
    }
}
