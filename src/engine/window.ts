
export const createWindow = (): WebGL2RenderingContext => {

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  canvas.style.margin = "auto";

  canvas.onclick = () => {
    canvas.requestPointerLock();
  };

  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");

  if(!gl)
    throw new Error("Webgl couldn't instanciate");

  // baby blue clear color for a basic skybox
  // gl.clearColor(0.537, 0.811, 0.941, 1.0);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  return gl;
};

