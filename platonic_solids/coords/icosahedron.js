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

export const icosahedron = { V: icosahedronVB, I: icosahedronIB };
export const icostar = { V: icosahedronVB, I: icostarIB };
