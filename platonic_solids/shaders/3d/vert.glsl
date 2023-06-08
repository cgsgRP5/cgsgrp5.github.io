#version 300 es
/**/
precision highp float;

in vec3 in_pos;
in vec3 in_normal;

uniform Matrix {
  mat4 WVP;
  mat4 VP;
  mat4 W;
};

out vec3 DrawPos;
out vec4 DrawColor;
out vec3 DrawNormal;

void main(void) {
  //gl_Position = vec4((VP * in_pos).xyz, 1);
  gl_Position = WVP * vec4(in_pos, 1);
  DrawPos = in_pos;
  DrawColor = vec4(in_pos.rgb, 1);
  DrawNormal = in_normal;
}
