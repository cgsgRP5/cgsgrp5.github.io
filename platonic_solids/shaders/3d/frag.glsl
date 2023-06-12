#version 300 es
/**/
precision highp float;

out vec4 out_color;

in vec3 DrawPos;
in vec4 DrawColor;
in vec3 DrawNormal;
in vec3 Loc, At, Up, Right;

vec3 Shade(vec3 P, vec3 N, vec3 color)
{
  vec3 L = normalize(vec3(1));
  vec3 LC = vec3(1);
  //color = vec3(0);
  vec3 V = normalize(Loc - P);

  // Ambient
  // color = Ka;

  N = faceforward(N, V, N);

  // Diffuse
  color += abs(dot(N, L)) * 0.3 * LC;

  // Specular
  vec3 R = reflect(V, N);
  color += pow(max(dot(R, L), 0.0), 10.0) * 0.2 * LC;

  return color;
}
void main(void)
{
  float l = length(DrawPos.xyz);
  vec3 c1, c2, col;
  c1 = vec3(1, 0, 0) * vec3(l * l * l * l * l);
  c2 = vec3(0, 0, 1) * vec3(abs(DrawPos.x) + abs(DrawPos.y) + abs(DrawPos.z));

  col = mix(c2, c1, vec3(.78));
  out_color = vec4(Shade(DrawPos, normalize(DrawPos), col), 1);
}
