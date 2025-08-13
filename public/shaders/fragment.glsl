precision mediump float;

varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;
uniform float u_speed;
uniform float u_complexity;
uniform float u_scale;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

void main() {
    vec2 uv = v_uv;
    vec2 p = uv * u_scale;
    
    float time = u_time * u_speed;
    
    // Create flowing noise patterns
    vec2 flow = vec2(
        fbm(p + time * 0.1),
        fbm(p + time * 0.15 + 100.0)
    );
    
    // Add complexity layers
    float noise1 = fbm(p + flow * 2.0 + time * 0.2);
    float noise2 = fbm(p * 2.0 - flow + time * 0.1);
    float noise3 = fbm(p * 0.5 + flow * 0.5 - time * 0.05);
    
    // Combine noise patterns based on complexity
    float combined = mix(
        mix(noise1, noise2, 0.5),
        noise3,
        u_complexity * 0.2
    );
    
    // Create color zones
    float zone1 = smoothstep(0.0, 0.3, combined);
    float zone2 = smoothstep(0.3, 0.6, combined);
    float zone3 = smoothstep(0.6, 0.9, combined);
    
    // Blend colors based on zones
    vec3 color = u_color1.rgb;
    color = mix(color, u_color2.rgb, zone1);
    color = mix(color, u_color3.rgb, zone2);
    color = mix(color, u_color4.rgb, zone3);
    
    // Add subtle brightness variation
    float brightness = 1.0 + 0.2 * sin(combined * 3.14159);
    color *= brightness;
    
    gl_FragColor = vec4(color, 1.0);
}