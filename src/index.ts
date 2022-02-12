
import { Matrix4 } from '@math.gl/core';

import { createEntities, createComponents, Components, Entity, StaticRenderObjectComponent } from './state';
import { createSystems, addSystem, dispatch_event, System } from './system';
import { createPlayer, Player, projectionMatrix, cameraInput } from './player';
import { renderStaticObjects } from './render';

const canvasWidth = 800;
const canvasHeight = 500;

const create = (): WebGL2RenderingContext => {

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


  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  return gl;
};

const onResize = (gl: WebGLRenderingContext, player: Player) => () => {
  const w = window.innerWidth, h = window.innerHeight;
  
  gl.canvas.width = w;
  gl.canvas.height = h;
  gl.viewport(0, 0, w, h);
  
  player.projection = projectionMatrix(w, h);
}

const main = () => {

  const gl = create();
  
  const { player, entities, components, systems } = init(gl);
  const dispatch = dispatch_event(gl)(player, entities, components, systems);

  window.onresize = onResize(gl, player);

  let previousTime = -1;
  const gameloop = (time: number) => {
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    
    if(previousTime == -1)
      previousTime = time;
    const delta = (time - previousTime) * 0.001; // in seconds

    dispatch("input",  delta);
    dispatch("tick",   delta);
    dispatch("render", delta);

    previousTime = time;
    requestAnimationFrame(gameloop);
  };

  requestAnimationFrame(gameloop);
};
window.addEventListener('load', main);

import { initChunks } from './chunk/chunk';

const init = (gl: WebGL2RenderingContext) => {

  const player = createPlayer();

  const lockChangeAlert = () => {
    if (document.pointerLockElement === gl.canvas)
      player.locked = true;
    else
      player.locked = false;
  }
  document.addEventListener('pointerlockchange', lockChangeAlert, false);

  const entities   = createEntities();
  const components = createComponents();
  const systems    = createSystems();

  initChunks(gl, entities, components);

  addSystem(systems, "render", renderStaticObjects);
  addSystem(systems, "input",  cameraInput);

  return { player, entities, components, systems };
}

