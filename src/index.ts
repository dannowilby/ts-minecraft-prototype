
import { Matrix4 } from '@math.gl/core';

import { createEntities, createComponents, Components, Entity, StaticRenderObjectComponent } from './state';
import { createSystems, addSystem, dispatch_event, System } from './system';
import { createPlayer, Player, projectionMatrix, freeCameraInput } from './player';
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


  // baby blue clear color for a basic skybox
  gl.clearColor(0.537, 0.811, 0.941, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
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

let fps = 0;
const main = () => {

  const gl = create();
  
  const { player, entities, components, systems } = init(gl);
  const dispatch = dispatch_event(gl)(player, entities, components, systems);

  window.onresize = onResize(gl, player);

  let frames = 0;
  let times = 0;
  setInterval(() => {
    console.log(`FPS = ${fps}`); // uncomment to print fps in the console
    frames = 0;
    times = 0;
  }, 1000);

  let previousTime = -1;
  const gameloop = (time: number) => {
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    
    if(previousTime == -1)
      previousTime = time;
    const delta = (time - previousTime) * 0.001; // in seconds

    dispatch("input",  delta);
    dispatch("tick",   delta);
    dispatch("render", delta);

    times = times + delta;
    frames = frames + 1;
    fps = frames / times;

    previousTime = time;
    requestAnimationFrame(gameloop);
  };

  requestAnimationFrame(gameloop);
};
window.addEventListener('load', main);

import { initMaze } from './maze';
const description = `
Some info about my project:

Controls mimic minecraft creative mode, 
just click in the window and then you 
should be able to fly around. Left clicking 
will remove blocks in front of you, up to 5 
blocks away. Also right click will add a block
of dirt.

The arena is generated randomly each time, 
so it'll be different if you refresh the page.

I used a very basic ecs system and laid the 
groundwork for an event system, but due to 
time constraints the code may resemble a plate
of spaghetti.

I coded this in typescript and used webpack to
compile the project into a simple bundle file.
I used math.gl/core so that I could use predefined
Vector3 and Matrix4 classes, specifically for the 
lookAt and perspective functions.

The texture atlas I used for the blocks is taken
from The Painterly Pack: http://painterlypack.net/.

I've also uploaded this project to my github incase 
I decide to work on it further.
`;
const init = (gl: WebGL2RenderingContext) => {

  console.log(description);

  const atlas = "atlas.png";
  const player = createPlayer(gl, atlas);

  const entities   = createEntities();
  const components = createComponents();
  const systems    = createSystems();

  initMaze(gl, entities, components);
  const plpos = player.pointLight;
  components.staticRenderObjects.get('pointLight')?.model.identity().translate([ plpos.x - 0.5, plpos.y - 0.5, plpos.z - 0.5 ]);
  const slpos = player.spotLight;
  components.staticRenderObjects.get('spotLight')?.model.identity().translate([ slpos.x - 0.5, slpos.y - 0.5, slpos.z - 0.5 ]);

  addSystem(systems, "render", renderStaticObjects);
  addSystem(systems, "input",  freeCameraInput);

  return { player, entities, components, systems };
}

