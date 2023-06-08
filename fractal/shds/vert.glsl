#version 300 es
in highp vec4 in_pos;
out vec3 pos;

void main() {
    pos = in_pos.xyz;
    gl_Position = in_pos;
}