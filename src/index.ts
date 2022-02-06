
const canvasWidth = 800;
const canvasHeight = 500;

const create = () => {

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.display = "block";
  canvas.style.margin = "auto";

  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");

  if(!gl)
    throw new Error("Webgl couldn't instanciate");

  return { canvas, gl };
};

const main = () => {

  const { canvas, gl } = create();

  gl.viewport(0, 0, canvasWidth, canvasHeight);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
};
