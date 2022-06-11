
/**
import { createEntities, createComponents, Components, Entity, StaticRenderObjectComponent } from './state';
import { createSystems, addSystem, dispatch_event, System } from './system';
import { createPlayer, Player, projectionMatrix, freeCameraInput } from './player';
import { renderStaticObjects } from './render';
*/

import { State, Event, dispatch } from './engine/state';
import { ECState, createECState } from './engine/ec';
import { createProfiler, updateProfiler, start, end } from './engine/profiler';
import { createWindow } from './engine/window';

const captureInput = (state: State): State => {
  window.onkeyup = (e: KeyboardEvent) => {
    state.activeInput.delete(e.key.toLowerCase());
  }

  window.onkeydown = (e: KeyboardEvent) => { // might want to check if locked
    state.activeInput.add(e.key.toLowerCase());
  }

  document.onmousemove = (e) => {
      state.mouseMovement = [ e.movementX, e.movementY ];
  }

  return state;
}

const main = () => {

  const gl = createWindow();
  let profiler = createProfiler(true); // boolean parameter: print or not
  
  let state: State = create(gl);
  state = captureInput(state);

  let previousTime = -1;
  const gameloop = (time: number) => {
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    
    // calc delta
    if(previousTime == -1)
      previousTime = time;
    const delta = (time - previousTime) * 0.001; // in seconds

    const lockChangeAlert = () => {
      if (document.pointerLockElement === gl.canvas)
        state.lock = true;
      else
        state.lock = false;
    }
    document.addEventListener('pointerlockchange', lockChangeAlert, false);

    // flush events, need to figure a way to pass event data/how to structure event data
    while(state.queue.length != 0) {
      const event = state.queue.shift();

      if(event === undefined)
        continue;

      state = dispatch(gl, state, event.type, delta)(event.data);
    }

    // update frame
    state = dispatch(gl, state, "input",  delta)(null);
    state = dispatch(gl, state, "tick",   delta)(null);

    // profile this
    state = dispatch(gl, state, "render", delta)(null);

    profiler = updateProfiler(profiler, delta);

    previousTime = time;
    requestAnimationFrame(gameloop);
  };

  requestAnimationFrame(gameloop);
};
window.addEventListener('load', main);

import { init } from './example/index';

const create = (gl: WebGL2RenderingContext) => {

  // console.log(description);

  /*
  const atlas = "atlas.png";
  const player = createPlayer(gl, atlas);

  const entities   = createEntities();
  const components = createComponents();
  const systems    = createSystems();

  initMaze(gl, entities, components);

  addSystem(systems, "render", renderStaticObjects);
  addSystem(systems, "input",  freeCameraInput);
  */

  return init(gl);
}

// The following was before the complete rewrite
const description = `
Some info about my project:

Controls mimic minecraft creative mode, 
just click in the window and then you 
should be able to fly around. Left clicking 
will remove blocks in front of you, up to 5 
blocks away.

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
