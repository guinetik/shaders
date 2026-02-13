void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = texture(iChannel0, uv).rgb;
    col = 1.0 - exp(-col * 2.5);
    float vig = 1.0 - 0.3 * length(uv - 0.5);
    col *= vig;
    fragColor = vec4(col, 1.0);
}
