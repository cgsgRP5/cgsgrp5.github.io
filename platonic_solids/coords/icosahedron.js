import { _vec3, vec3 } from "../all_h.js";

const sqrt5 = Math.sqrt(5);
const div1sqrt5 = 1 / sqrt5;
const sqrt01mul5subsqr5 = Math.sqrt(0.1 * (5 - sqrt5));
const sqrt01mul5addsqr5 = Math.sqrt(0.1 * (5 + sqrt5));

const icosahedronV = [
  0,
  1,
  0,

  2 / sqrt5,
  div1sqrt5,
  0,

  0.5 - 0.1 * sqrt5,
  div1sqrt5,
  -sqrt01mul5addsqr5,

  -0.5 - 0.1 * sqrt5,
  div1sqrt5,
  -sqrt01mul5subsqr5,

  -0.5 - 0.1 * sqrt5,
  div1sqrt5,
  sqrt01mul5subsqr5,

  0.5 - 0.1 * sqrt5,
  div1sqrt5,
  sqrt01mul5addsqr5,

  0.5 + 0.5 / sqrt5,
  -div1sqrt5,
  -sqrt01mul5subsqr5,

  0.1 * sqrt5 - 0.5,
  -div1sqrt5,
  -sqrt01mul5addsqr5,

  -2 / sqrt5,
  -div1sqrt5,
  0,

  0.1 * sqrt5 - 0.5,
  -div1sqrt5,
  sqrt01mul5addsqr5,

  0.5 + 0.5 / sqrt5,
  -div1sqrt5,
  sqrt01mul5subsqr5,

  0,
  -1,
  0,
];

const icosahedronIB = [
  0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 1,

  1, 10, 6, 2, 1, 6, 2, 6, 7, 3, 2, 7, 3, 7, 8,

  4, 3, 8, 4, 8, 9, 5, 4, 9, 5, 9, 10, 1, 5, 10,

  11, 10, 9, 11, 9, 8, 11, 8, 7, 11, 7, 6, 11, 6, 10,
];

const icostarIB = [
  1, 2, 3, 2, 3, 4, 3, 4, 5, 4, 5, 1, 5, 1, 2,

  6, 7, 8, 7, 8, 9, 8, 9, 10, 9, 10, 6, 10, 6, 7,

  0, 1, 3, 0, 2, 4, 0, 3, 5, 0, 4, 1, 0, 5, 2,

  11, 6, 8, 11, 7, 9, 11, 8, 10, 11, 9, 6, 11, 10, 7,

  1, 2, 10, 2, 3, 6, 3, 4, 7, 4, 5, 8, 5, 1, 9,

  6, 7, 1, 7, 8, 2, 8, 9, 3, 9, 10, 4, 10, 6, 5,

  1, 5, 6, 2, 1, 7, 3, 2, 8, 4, 3, 9, 5, 4, 10,

  6, 10, 2, 7, 6, 3, 8, 7, 4, 9, 8, 5, 10, 9, 1,
];

var icosahedronN = [];
var icostarN = [];

var icosahedronVB = [];
var icostarVB = [];

function getVB(figure) {
  var VB = figure.VB;
  var V = figure.V;
  var I = figure.I;
  var N = figure.N;
  for (let i = 0; i < V.length; i++) N.push(0);
  for (let i = 0; i < I.length - 2; i += 3) {
    const p0 = vec3(V[I[i]], V[I[i] + 1], V[I[i] + 2]);
    const p1 = vec3(V[I[i + 1]], V[I[i + 1] + 1], V[I[i + 1] + 2]);
    const p2 = vec3(V[I[i + 2]], V[I[i + 2] + 1], V[I[i + 2] + 2]);
    var n = p1.sub(p0).cross(p2.sub(p0)).norm();
    (N[I[i] * 3] += n.x), (N[I[i] * 3 + 1] += n.y), (N[I[i] * 3 + 2] += n.z);
    (N[I[i + 1] * 3] += n.x),
      (N[I[i + 1] * 3 + 1] += n.y),
      (N[I[i + 1] * 3 + 2] += n.z);
    (N[I[i + 2] * 3] += n.x),
      (N[I[i + 2] * 3 + 1] += n.y),
      (N[I[i + 2] * 3 + 2] += n.z);
  }
  for (let i = 0; i < V.length - 2; i += 3) {
    let n = vec3(N[i], N[i + 1], N[i + 2]).norm();
    VB.push(V[i], V[i + 1], V[i + 2], n.x, n.y, n.z);
  } /*
  for (let i = 0; i < V.length - 2; i += 3) {
    VB.push(V[i], V[i + 1], V[i + 2]);
  }
  for (let i = 0; i < N.length - 2; i += 3) {
    var l = vec3(N[i], N[i + 1], N[i + 2]).len();
    (N[i] /= l), (N[i + 1] /= l), (N[i + 2] /= l);
    VB.push(N[i], N[i + 1], N[i + 2]);
  }    */
}

export const icosahedron = {
  VB: icosahedronVB,
  V: icosahedronV,
  I: icosahedronIB,
  N: icosahedronN,
};
export const icostar = {
  VB: icostarVB,
  V: icosahedronV,
  I: icostarIB,
  N: icostarN,
};

if (icosahedron.VB.length == 0) getVB(icosahedron);
if (icostar.VB.length == 0) getVB(icostar);
