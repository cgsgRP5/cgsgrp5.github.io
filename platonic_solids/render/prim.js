import { buffer, _buffer, _material, _mat4 } from "../all_h.js";

let admisName = [];
admisName["P"] = ["in_pos", "Position"];
admisName["N"] = ["in_norm", "Normal"];
admisName["T"] = ["in_tex", "Texture"];
admisName["C"] = ["in_color", "Color"];

/* Primitive module */
export class _prim {
  isCreated;
  isDelete;
  isDraw;

  type;
  /** @type {_mat4} */
  mTrans;
  /** @type {_material} */
  mtl;
  /** @type {_buffer} */
  VA;
  /** @type {_buffer} */
  VB;
  /** @type {_buffer} */
  IB;
  numOfV;

  constructor(
    /** @type {WebGL2RenderingContext} */ gl,
    type,
    /** @type {_buffer} */ V,
    /** @type {_buffer} */ I,
    /**@type {_material}*/ mtl
  ) {
    /* Saved */
    this.isCreated = false;
    this.isDelete = false;
    this.isDraw = false;
    if (type == "triangle strip") this.type = gl.TRIANGLE_STRIP;
    else if (type == "triangle") this.type = gl.TRIANGLES;
    else this.type = gl.POINTS;

    this.mtl = mtl;
    /* this.VA = this.VB = this.VI = null; */

    if (typeof mtl.shd.program.then == typeof Promise)
      mtl.shd.program.then(() => {
        this.loadV(gl, V, I, mtl);
        this.isCreated = true;
      });
    else {
      this.loadV(gl, V, I, mtl);
      this.isCreated = true;
    }
  }
  draw(mTrans) {
    this.isDraw = true;
    this.mTrans = mTrans;
  }
  del() {
    if (this.isCreated != true) this.isDelete = false;
  }
  loadV(
    /** @type {WebGL2RenderingContext} */ gl,
    /** @type {_buffer} */ V,
    /** @type {_buffer} */ I,
    /**@type {_material}*/ mtl
  ) {
    if (I == undefined || I == null) this.numOfV = V.length / 3;
    else this.numOfV = I.length;

    /* VA & VB */
    this.VA = gl.createVertexArray();
    gl.bindVertexArray(this.VA);

    this.VB = buffer(gl, gl.ARRAY_BUFFER, new Float32Array(V));

    if (I != null && I != undefined)
      /* index */
      this.IB = buffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Int16Array(I));

    let off = 0;
    // mtl.mtlPat.vForm.args[i].name[0]
    for (let i = 0; i < mtl.mtlPat.vForm.len; i++) {
      for (
        let j = 0;
        j < admisName[mtl.mtlPat.vForm.args[i].name].length;
        j++
      ) {
        const name = admisName[mtl.mtlPat.vForm.args[i].name][j];
        if (mtl.shd.attrs[name] != undefined) {
          const loc = mtl.shd.attrs[name].loc;
          gl.vertexAttribPointer(
            loc,
            mtl.mtlPat.vForm.args[i].size,
            gl.FLOAT,
            false,
            mtl.mtlPat.vFormAllSize * 4,
            off
          );
          off += mtl.mtlPat.vForm.args[i].size * 4;
          gl.enableVertexAttribArray(loc);
          break;
        }
        alert("_shader have no pos but _materialPat have");
      }
    }
  }
}

export function prim(...arg) {
  return new _prim(...arg);
}
