"use strict";
var canvasWidth = 800;
var canvasHeight = 500;
var create = function () {
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.display = "block";
    canvas.style.margin = "auto";
    document.body.appendChild(canvas);
    var gl = canvas.getContext("webgl2");
    if (!gl)
        throw new Error("Webgl couldn't instanciate");
    return { canvas: canvas, gl: gl };
};
var main = function () {
    var _a = create(), canvas = _a.canvas, gl = _a.gl;
    gl.viewport(0, 0, canvasWidth, canvasHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
};
