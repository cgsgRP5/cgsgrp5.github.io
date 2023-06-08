let posLoc, shaderProgram;
/** @type {WebGLRenderingContext} */
let gl;
const Size = 65536.0, Lenqx = 2.0, Lenqy = 2.0;


async function loadShaderFromFile(full_path) {
    const res = await fetch(full_path);
    const data = await res.text();
    return data;
}

function loadShader(type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("!");
    }

    return shader;
}

function attachShaders(dir_path) {
    let ftv, ftf;

    ftv = loadShaderFromFile(`${dir_path}\\vert.glsl`);
    ftf = loadShaderFromFile(`${dir_path}\\frag.glsl`);

    const allDataD = Promise.all([ftv, ftf]);
    allDataD.then((res) => {
        const vertSh = loadShader(gl.VERTEX_SHADER, res[0]);
        const fragSh = loadShader(gl.FRAGMENT_SHADER, res[1]);
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertSh);
        gl.attachShader(shaderProgram, fragSh);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            const Buf = gl.getProgramInfoLog(shaderProgram);
            console.log(Buf);
        }
        posLoc = gl.getAttribLocation(shaderProgram, "in_pos");

        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        const pos = [1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, -1, 1, 0, 1];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
        gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
    });
}

export function initGL() {
    const canvas = document.getElementById("3dwebgl");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    attachShaders("./shds");
}

export function Draw() {
    if (posLoc != undefined && shaderProgram != undefined) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        let date = new Date();
        let time = date.getMilliseconds() / 1000.0 + date.getSeconds() + date.getMinutes() * 60;
        const uniformLocalTime = gl.getUniformLocation(shaderProgram, "time")
        gl.uniform1f(uniformLocalTime, time);

        const uniformSize = gl.getUniformLocation(shaderProgram, "size")
        gl.uniform1f(uniformSize, Size);

        const uniformLenqx = gl.getUniformLocation(shaderProgram, "lenqx")
        gl.uniform1f(uniformLenqx, Lenqx);
        const uniformLenqy = gl.getUniformLocation(shaderProgram, "lenqy")
        gl.uniform1f(uniformLenqy, Lenqy);

        gl.enableVertexAttribArray(posLoc);
        gl.useProgram(shaderProgram);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
