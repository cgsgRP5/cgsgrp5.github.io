#version 300 es
out highp vec4 out_col;
in highp vec3 pos;
uniform highp float time, size, lenqx, lenqy;

void main() {
    highp vec2 z, z0;
    highp float X0 = -lenqx - 0.2 * sin(2.0 * time), X1 = lenqx + 0.4 * sin(time), Y0 = -lenqy - 0.2 * cos(time / 2.0), Y1 = lenqy + 0.2 * sin(time * 1.5), W = size, H = size;
    int n, k;
    highp float d = 0.5;
    highp vec4 col;

    z0 = z = vec2(X0 + (pos.x * size + size) * (X1 - X0) / W / 2.0, Y0 + (pos.y * size + size) * (Y1 - Y0) / H / 2.0);
    while(n++ < 128 && z.x * z.x + z.y * z.y < 4.0)
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + z0;

    k = (n % 2) * 2 - 1;
    col = mix(vec4(pos + vec3(sin(time) * sin(time), sin(time), 1), 1.0 / d) * d, vec4(pos, 1), sin(time) * sin(time));
    //out_col = vec4(vec3(float(n) / 128.0, 0.25 + float(k * n) / 256.0, 0), 1);
    out_col = vec4(col.xyz / 2.0 + vec3(float(n) / (1255.0 + 1000.0 * sin(time) * cos(time))), 1);
}