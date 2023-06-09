#version 300 es
/**/
precision highp float;

out vec4 out_color;

in vec3 DrawPos;
in vec4 DrawColor;
in vec3 DrawNormal; 
/*
in vec2 TexCoord;  
in vec3 DrawNormal;

*/

vec3 getColor(vec3 C, int q) {
  vec3 color = DrawPos - C;
  for(int i = 0; i < q; i++) {
  }
  return color;
}

void main(void) {
  float l = length(DrawPos.xyz);
  out_color = vec4(vec3(0, 0, 1) * vec3(l * l * l * l * l), 1);
}
