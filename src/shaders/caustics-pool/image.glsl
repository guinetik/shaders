/**
 * Caustics Pool
 *
 * @author guinetik
 * @date 2026-02-15
 *
 * Ray-marched 3D swimming pool — an open-top box with tiled interior
 * surfaces, a transparent water plane, and caustic light patterns
 * on all submerged surfaces.
 *
 * A ball drops into the pool periodically, creating expanding ripple
 * waves on the water surface. Physics are analytical (no simulation
 * buffers): free-fall under gravity, then damped harmonic bob once
 * submerged. Ripples propagate as circular waves from the splash
 * point, decaying over time. Ball despawns after BALL_LIFETIME.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 * Pool geometry: analytical ray-box interior intersection.
 * Camera angle is stored in buffer-a pixel (0,0) with angular
 * velocity and friction — mouse drag spins with inertia.
 */

// -- Pool geometry --
#define POOL_HALF_SIZE  2.5
#define POOL_DEPTH      2.0
#define POOL_FLOOR_Y    -2.0
#define WATER_Y         -0.3

// -- Camera --
#define CAM_DIST        7.0
#define CAM_HEIGHT      3.5
#define CAM_TARGET      vec3(0.0, -0.8, 0.0)
#define CAM_FOV         2.0

// -- Tiles --
#define TILE_SCALE      3.0
#define TILE_GROUT      0.04
#define TILE_COL        vec3(0.65, 0.82, 0.88)
#define GROUT_COL       vec3(0.35, 0.50, 0.55)
#define WALL_TILE_COL   vec3(0.60, 0.78, 0.85)

// -- Water --
#define WATER_COL       vec3(0.05, 0.30, 0.45)
#define WATER_OPACITY   0.55
#define FRESNEL_POWER   3.0
#define FRESNEL_MIN     0.1
#define FRESNEL_MAX     0.9

// -- Ball --
#define BALL_RADIUS     0.25
#define BALL_COL        vec3(0.9, 0.2, 0.15)
#define BALL_SPEC_COL   vec3(1.0, 0.6, 0.5)
#define BALL_CYCLE       4.0
#define BALL_LIFETIME    3.5
#define BALL_DROP_HEIGHT 4.0
#define BALL_GRAVITY     9.81
#define BALL_BOB_FREQ    3.0
#define BALL_BOB_DECAY   1.8
#define BALL_BOB_AMP     0.3
#define BALL_BUOYANCY_Y  (WATER_Y - BALL_RADIUS * 0.4)
#define BALL_FADE_START  2.5
#define BALL_SPECULAR    32.0

// -- Ripples --
#define RIPPLE_SPEED     2.5
#define RIPPLE_FREQ      8.0
#define RIPPLE_AMP       0.06
#define RIPPLE_DECAY     0.8
#define RIPPLE_SPREAD    0.15

// -- Caustic (joltz0r / David Hoskins) --
#define TAU             6.28318530718
#define CAUSTIC_ITERS   5
#define CAUSTIC_INTEN   0.005
#define CAUSTIC_POWER   1.4
#define CAUSTIC_BASE    1.17
#define CAUSTIC_BRIGHT  8.0
#define CAUSTIC_SPEED   0.5
#define CAUSTIC_OFFSET  23.0
#define CAUSTIC_SCALE   0.8
#define CAUSTIC_TINT    vec3(0.0, 0.35, 0.5)

// -- Lighting --
#define LIGHT_DIR       normalize(vec3(0.5, 1.0, 0.3))
#define AMBIENT         0.25
#define DIFFUSE_STR     0.65
#define SKY_COL         vec3(0.02, 0.02, 0.04)
#define SHADOW_DARK     0.3

// -- Precision --
#define SURF_EPSILON    0.001

// -------------------------------------------------------
// Hash — pseudo-random position per cycle
// -------------------------------------------------------
float hash11(float p)
{
    p = fract(p * 443.8975);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

// -------------------------------------------------------
// Ball state: compute position + opacity from global time
// -------------------------------------------------------
struct BallState {
    vec3 pos;
    float alpha;     // 0 = invisible, 1 = fully visible
    float splashAge; // time since water impact, <0 if still falling
    vec2 dropXZ;     // xz position where ball drops
};

BallState getBall(float t)
{
    BallState b;

    float cycle = floor(t / BALL_CYCLE);
    float local = mod(t, BALL_CYCLE);

    // Pseudo-random drop position within pool (leave margin for ball radius)
    float margin = POOL_HALF_SIZE - BALL_RADIUS - 0.3;
    b.dropXZ = vec2(
        mix(-margin, margin, hash11(cycle * 7.13)),
        mix(-margin, margin, hash11(cycle * 13.37))
    );

    // Time for ball to fall from DROP_HEIGHT to WATER_Y
    // y = DROP_HEIGHT - 0.5 * g * t^2, solve for y = WATER_Y
    float fallDist = BALL_DROP_HEIGHT - WATER_Y;
    float impactTime = sqrt(2.0 * fallDist / BALL_GRAVITY);

    b.splashAge = local - impactTime;

    if (local > BALL_LIFETIME)
    {
        // Despawned
        b.pos = vec3(0.0, 10.0, 0.0); // off screen
        b.alpha = 0.0;
    }
    else if (local < impactTime)
    {
        // Free fall phase
        float y = BALL_DROP_HEIGHT - 0.5 * BALL_GRAVITY * local * local;
        b.pos = vec3(b.dropXZ.x, y, b.dropXZ.y);
        b.alpha = 1.0;
    }
    else
    {
        // Damped bob in water
        float age = b.splashAge;
        float bob = BALL_BOB_AMP * exp(-BALL_BOB_DECAY * age) * cos(BALL_BOB_FREQ * TAU * age);
        float y = BALL_BUOYANCY_Y + bob;
        b.pos = vec3(b.dropXZ.x, y, b.dropXZ.y);

        // Fade out near end of lifetime
        b.alpha = 1.0 - smoothstep(BALL_FADE_START, BALL_LIFETIME, local);
    }

    return b;
}

// -------------------------------------------------------
// Ripple displacement on the water surface
// Circular waves expanding from splash point
// -------------------------------------------------------
float rippleHeight(vec2 xz, BallState ball)
{
    if (ball.splashAge < 0.0 || ball.alpha <= 0.0) return 0.0;

    float age = ball.splashAge;
    float dist = length(xz - ball.dropXZ);

    // Expanding ring: wave front position
    float waveFront = age * RIPPLE_SPEED;

    // Distance from wave front
    float d = dist - waveFront;

    // Envelope: gaussian around wave front, decays over time
    float envelope = exp(-d * d / (RIPPLE_SPREAD + age * 0.5))
                   * exp(-age * RIPPLE_DECAY);

    return sin(dist * RIPPLE_FREQ - age * RIPPLE_SPEED * RIPPLE_FREQ) * envelope * RIPPLE_AMP;
}

// -------------------------------------------------------
// Ripple normal via finite differences
// -------------------------------------------------------
vec3 rippleNormal(vec2 xz, BallState ball)
{
    float e = 0.02;
    float hc = rippleHeight(xz, ball);
    float hx = rippleHeight(xz + vec2(e, 0.0), ball);
    float hz = rippleHeight(xz + vec2(0.0, e), ball);
    return normalize(vec3(hc - hx, e, hc - hz));
}

// Ray-sphere intersection provided by sphere commons (intersectSphere).

// -------------------------------------------------------
// Caustic pattern — core warp provided by caustic commons
// (joltz0r / David Hoskins iterative domain warp)
// -------------------------------------------------------
float causticPattern(vec2 uv, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c = causticWarp(uv, CAUSTIC_SCALE, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_BRIGHT);
}

// -------------------------------------------------------
// Tile pattern
// -------------------------------------------------------
float tileGrid(vec2 uv)
{
    vec2 grid = fract(uv * TILE_SCALE);
    vec2 edge = smoothstep(0.0, TILE_GROUT, grid) *
                smoothstep(0.0, TILE_GROUT, 1.0 - grid);
    return edge.x * edge.y;
}

// -------------------------------------------------------
// Ray-box interior intersection
// -------------------------------------------------------
vec2 boxInterior(vec3 ro, vec3 rd, out vec3 normal, out vec3 hitPos)
{
    vec3 bmin = vec3(-POOL_HALF_SIZE, POOL_FLOOR_Y, -POOL_HALF_SIZE);
    vec3 bmax = vec3( POOL_HALF_SIZE, 0.0,           POOL_HALF_SIZE);

    vec3 invRd = 1.0 / rd;
    vec3 t1 = (bmin - ro) * invRd;
    vec3 t2 = (bmax - ro) * invRd;

    vec3 tmin = min(t1, t2);
    vec3 tmax = max(t1, t2);

    float tNear = max(max(tmin.x, tmin.y), tmin.z);
    float tFar  = min(min(tmax.x, tmax.y), tmax.z);

    if (tNear > tFar || tFar < 0.0) return vec2(-1.0);

    hitPos = ro + rd * tFar;
    normal = vec3(0.0);

    if (abs(hitPos.x - bmin.x) < SURF_EPSILON)      normal = vec3( 1.0, 0.0, 0.0);
    else if (abs(hitPos.x - bmax.x) < SURF_EPSILON)  normal = vec3(-1.0, 0.0, 0.0);
    else if (abs(hitPos.z - bmin.z) < SURF_EPSILON)   normal = vec3( 0.0, 0.0, 1.0);
    else if (abs(hitPos.z - bmax.z) < SURF_EPSILON)   normal = vec3( 0.0, 0.0,-1.0);
    else if (abs(hitPos.y - bmin.y) < SURF_EPSILON)   normal = vec3( 0.0, 1.0, 0.0);
    else                                               normal = vec3( 0.0,-1.0, 0.0);

    return vec2(tNear, tFar);
}

// -------------------------------------------------------
// Water plane intersection
// -------------------------------------------------------
float waterPlane(vec3 ro, vec3 rd)
{
    if (abs(rd.y) < 0.0001) return -1.0;
    float t = (WATER_Y - ro.y) / rd.y;
    return t > 0.0 ? t : -1.0;
}

// -------------------------------------------------------
// Tile UV from hit position + normal
// -------------------------------------------------------
vec2 tileUV(vec3 p, vec3 n)
{
    if (abs(n.y) > 0.5) return p.xz;
    if (abs(n.x) > 0.5) return p.zy;
    return p.xy;
}

// -------------------------------------------------------
// Shade a pool surface point
// -------------------------------------------------------
vec3 shadeSurface(vec3 p, vec3 n, float t)
{
    vec2 uv = tileUV(p, n);

    float tile = tileGrid(uv);
    vec3 baseCol = abs(n.y) > 0.5 ? TILE_COL : WALL_TILE_COL;
    vec3 col = mix(GROUT_COL, baseCol, tile);

    float diff = max(dot(n, LIGHT_DIR), 0.0);
    col *= AMBIENT + DIFFUSE_STR * diff;

    // Caustics on submerged surfaces
    if (p.y < WATER_Y + 0.05)
    {
        float depth = WATER_Y - p.y;
        float caustic = causticPattern(uv, t);
        float depthFade = exp(-depth * 0.3);
        col += (vec3(caustic) + CAUSTIC_TINT) * depthFade * 0.6;
    }

    float depthDarken = 1.0 - smoothstep(0.0, POOL_DEPTH, WATER_Y - p.y) * SHADOW_DARK;
    col *= depthDarken;

    return col;
}

// -------------------------------------------------------
// Shade the ball
// -------------------------------------------------------
vec3 shadeBall(vec3 p, vec3 center, vec3 rd, float t)
{
    vec3 n = normalize(p - center);
    float diff = max(dot(n, LIGHT_DIR), 0.0);

    // Specular highlight
    vec3 h = normalize(LIGHT_DIR - rd);
    float spec = pow(max(dot(n, h), 0.0), BALL_SPECULAR);

    vec3 col = BALL_COL * (AMBIENT + DIFFUSE_STR * diff);
    col += BALL_SPEC_COL * spec * 0.5;

    // Underwater darkening
    if (p.y < WATER_Y)
    {
        float depth = WATER_Y - p.y;
        col *= exp(-depth * 0.4);
        col = mix(col, WATER_COL, 0.2);
    }

    return col;
}

// -------------------------------------------------------
// Fresnel (Schlick)
// -------------------------------------------------------
float fresnel(vec3 rd, vec3 n)
{
    float cosTheta = abs(dot(rd, n));
    float f = pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
    return mix(FRESNEL_MIN, FRESNEL_MAX, f);
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // Orbit camera from buffer-a state
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    // Get ball state
    BallState ball = getBall(t);

    vec3 col = SKY_COL;

    // --- Ball intersection (above water) ---
    float ballT = -1.0;
    if (ball.alpha > 0.0)
        ballT = intersectSphere(ro, rd, ball.pos, BALL_RADIUS);

    // --- Pool box ---
    vec3 boxNorm, boxHit;
    vec2 boxT = boxInterior(ro, rd, boxNorm, boxHit);

    if (boxT.y > 0.0)
    {
        vec3 poolCol = shadeSurface(boxHit, boxNorm, t);

        // --- Water plane ---
        float waterT = waterPlane(ro, rd);
        bool hitWater = waterT > 0.0 && waterT < boxT.y;

        if (hitWater)
        {
            vec3 waterHit = ro + rd * waterT;

            if (abs(waterHit.x) < POOL_HALF_SIZE && abs(waterHit.z) < POOL_HALF_SIZE)
            {
                // Ripple-perturbed water normal
                vec3 wn = rippleNormal(waterHit.xz, ball);

                float refl = fresnel(rd, wn);
                vec3 reflDir = reflect(rd, wn);
                vec3 reflCol = SKY_COL + vec3(0.02, 0.05, 0.08) * max(reflDir.y, 0.0);

                vec3 waterSurf = mix(poolCol, WATER_COL, WATER_OPACITY);
                col = mix(waterSurf, reflCol, refl);

                // Ball visible through water
                if (ballT > waterT && ball.alpha > 0.0)
                {
                    vec3 ballHitPos = ro + rd * ballT;
                    vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
                    ballCol = mix(ballCol, WATER_COL, 0.3);
                    col = mix(col, ballCol, ball.alpha);
                }
            }
            else
            {
                col = poolCol;
            }
        }
        else
        {
            col = poolCol;
        }

        // Above-water wall/rim
        if (boxHit.y > WATER_Y && !(hitWater && waterT < boxT.y))
        {
            vec2 rimUV = tileUV(boxHit, boxNorm);
            float tile = tileGrid(rimUV);
            vec3 rimCol = mix(GROUT_COL, TILE_COL * 1.1, tile);
            float diff = max(dot(boxNorm, LIGHT_DIR), 0.0);
            rimCol *= AMBIENT + DIFFUSE_STR * diff * 1.2;
            col = rimCol;
        }

        // Ball above water (in front of everything)
        if (ballT > 0.0 && ballT < waterT && ball.alpha > 0.0)
        {
            vec3 ballHitPos = ro + rd * ballT;
            vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
            col = mix(col, ballCol, ball.alpha);
        }
        // Ball above water when no water hit
        else if (ballT > 0.0 && !hitWater && ballT < boxT.y && ball.alpha > 0.0)
        {
            vec3 ballHitPos = ro + rd * ballT;
            vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
            col = mix(col, ballCol, ball.alpha);
        }
    }
    else if (ballT > 0.0 && ball.alpha > 0.0)
    {
        // Ball visible against sky (during drop)
        vec3 ballHitPos = ro + rd * ballT;
        col = mix(col, shadeBall(ballHitPos, ball.pos, rd, t), ball.alpha);
    }

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
