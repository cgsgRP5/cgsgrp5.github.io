#version 300 es
/**/
precision highp float;

in vec3 in_pos;
in vec3 in_norm;

uniform Matrix {
  mat4 WVP;
  mat4 VP;
  mat4 W;
  vec4 CamLoc;
  vec4 CamAt;
  vec4 CamUp;
  vec4 CamRight;
};

out vec3 DrawPos;
out vec4 DrawColor;
out vec3 DrawNormal;
out vec3 Loc, At, Up, Right;

void main(void) {
  gl_Position = WVP * vec4(in_pos, 1);
  DrawPos = in_pos;
  DrawColor = vec4(in_pos.rgb, 1);
  DrawNormal = inverse(transpose(mat3(W))) * in_norm;
  Loc = CamLoc.xyz;
  At = CamAt.xyz;
  Up = CamUp.xyz;
  Right = CamRight.xyz;
}
