import { glContext, _glContext, render, _render } from "./all_h.js";

/* Main system module */
export class _system {
  /** @type {_glContext} */
  drawContext;
  /** @type {_render} */
  render;

  constructor(id) {
    this.drawContext = glContext(id);
    this.render = render(this.drawContext);
  }
}

export function system(...arg) {
  return new _system(...arg);
}
