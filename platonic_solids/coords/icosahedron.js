import { vec3 } from "../all_h.js";

const sqrt5 = Math.sqrt(5);
const div1sqrt5 = 1 / sqrt5;
const sqrt01mul5subsqr5 = Math.sqrt(0.1 * (5 - sqrt5));
const sqrt01mul5addsqr5 = Math.sqrt(0.1 * (5 + sqrt5));

const icosahedronVB = [
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
  0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 1, 1, 10, 6, 2, 1, 6, 2, 6, 7, 3, 2,
  7, 3, 7, 8, 4, 3, 8, 4, 8, 9, 5, 4, 9, 5, 9, 10, 1, 5, 10, 11, 10, 9, 11, 9,
  8, 11, 8, 7, 11, 7, 6, 11, 6, 10,
];

export const icosahedron = { V: icosahedronVB, I: icosahedronIB };
