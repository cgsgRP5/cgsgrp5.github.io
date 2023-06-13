#version 300 es
/**/
precision highp float;

out vec4 out_color;
in vec3 DrawPos;
in vec4 DrawColor;
in vec3 DrawNormal;

vec3 Shade(vec3 P, vec3 N, vec3 LightPos, vec3 in_color) {
  vec3 L = normalize(LightPos);
  vec3 LC = vec3(1, 1, 1);
  vec3 color = in_color * 0.5;
  vec3 V = normalize(P - LightPos);

  // Ambient
  N = faceforward(N, V, N);
  // Diffuse
  color += max(0.1, dot(N, L)) * 0.2 * LC;

  // Specular
  vec3 R = reflect(-L, N);

  color += pow(max(0.1, dot(R, L)), 15.0) * 0.2 * LC;

  return color;
}

void main(void) {
  float l = length(DrawPos.xyz);
  vec3 c1, c2, col;
  if(l < 2.) {
    l = length(DrawPos.xyz);
  }  //out_color = vec4(Shade(DrawPos, DrawNormal, vec3(10, 5, 8), vec3(.1)), 1);
  else {
    l = length(DrawPos.xyz - vec3(2, 0, 2));
  }

  c1 = vec3(1, 0, 0) * vec3(l * l * l * l * l);
  c2 = vec3(0, 0, 1) * vec3(abs(DrawPos.x) + abs(DrawPos.y) + abs(DrawPos.z));

  col = mix(c2, c1, vec3(.78));
  out_color = vec4(Shade(DrawPos, DrawNormal, vec3(10, 5, 8), col), 1);

  // out_color = vec4(DrawNormal, 1);
}