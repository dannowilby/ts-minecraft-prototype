
import { Matrix4 } from '@math.gl/core';

import { createEntities, createComponents, Components, Entity, StaticRenderObjectComponent } from './state';
import { createSystems, addSystem, dispatch_event, System } from './system';
import { createPlayer, Player } from './player';

const canvasWidth = 800;
const canvasHeight = 500;

const create = (): WebGL2RenderingContext => {

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.display = "block";
  canvas.style.margin = "auto";

  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");

  if(!gl)
    throw new Error("Webgl couldn't instanciate");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  return gl;
};

const main = () => {

  const gl = create();
  
  const { player, entities, components, systems } = init();
  const dispatch = dispatch_event(gl)(player, entities, components, systems);

  let previousTime = -1;
  const gameloop = (time: number) => {
    
    if(previousTime == -1)
      previousTime = time;
    const delta = (time - previousTime) * 0.001; // in seconds


    dispatch("input",  delta);
    dispatch("tick",   delta);
    dispatch("render", delta);


    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    previousTime = time;
    requestAnimationFrame(gameloop);
  };

  requestAnimationFrame(gameloop);
};
window.addEventListener('load', main);

const init = () => {

  const player = createPlayer(canvasWidth, canvasHeight);

  const entities   = createEntities();
  const components = createComponents();
  const systems    = createSystems()

  // TEST CODE
  // entities.push({ id: "test", components: [ "staticRenderObjects" ] });
  // components["staticRenderObjects"].set("test", { vao: 0, program: 0, model: new Matrix4() });
  // addSystem(systems, "test", test_system);

  return { player, entities, components, systems };
}

/* TEST SYSTEM
const test_system: System = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {
  
  components["staticRenderObjects"].forEach((v: StaticRenderObjectComponent, k) => {
    v.vao = v.vao + 1;
    console.log(v.vao);
  });

  console.log(delta);
};
*/

