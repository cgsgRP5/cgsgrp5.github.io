import { vec3, getTextFromFile } from "../all_h";

function getNormals(V, I, N) {
  for (let i = 0; i < V.length; i++) N.push(vec3(0));
  for (let i = 0; i < I.length - 2; i += 3) {
    const p0 = vec3(V[I[i]].x, V[I[i]].y, V[I[i]].z);
    const p1 = vec3(V[I[i + 1]].x, V[I[i + 1]].y, V[I[i + 1]].z);
    const p2 = vec3(V[I[i + 2]].x, V[I[i + 2]].y, V[I[i + 2]].z);
    var n = p1.sub(p0).cross(p2.sub(p0)).norm();
    N[I[i]].add(n);
    N[I[i + 1]].add(n);
    N[I[i + 2]].add(n);
  }
  for (let i = 0; i < N.length; i++) N[i] = N[i].norm();
}

function getVB(figure) {
  var VB = figure.VB;
  var V = figure.V;
  var I = figure.I;
  var N = figure.N;
  var C = figure.C;

  //getNormals(V, I, N);

  for (let i = 0; i < V.length; i++) {
    VB.push(...V[i].add(C).toArrayV(), ...N[i].toArrayV());
  }
}

export function ObjLoad(filename) {
  const data = getTextFromFile(filename);
  var obj = {};
  let Buf,
    nv = 0,
    nf = 0;

  Buf = data.split("\n");
  for (let i = 0; i < Buf.length; i++) {
    var str = Buf[i];
    if (str[0] == "v" && str[1] == " ") {
      str.slice(0, 2);
      var coord = str.split(" ");
      obj.V.push(vec3(coord[0], coord[1], coord[2]));
    } else if (Buf[0] == "v" && Buf[1] == "n" && Buf[3] == " ") {
      str.slice(0, 3);
      var coord = str.split(" ");
      obj.N.push(vec3(coord[0], coord[1], coord[2]));
    } else if (Buf[0] == "f" && Buf[1] == " ") {
      str.slice(0, 2);
      var i0 = str.split(" ");
      var i1 = i0[0].split("//");
      var i2 = i0[1].split("//");
      var i3 = i0[2].split("//");
      obj.N.push(i1[0], i2[0], i3[0]);
    }
  }
  obj.C = vec3(0);
  getVB(obj);
}
