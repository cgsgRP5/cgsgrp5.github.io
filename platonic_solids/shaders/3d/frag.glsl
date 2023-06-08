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

void main(void) {
  float l = length(DrawPos.xyz);
  out_color = vec4(DrawPos, 1);
  out_color = vec4(vec3(l * l), 1);
}
