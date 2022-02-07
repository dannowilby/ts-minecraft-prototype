
import { Vector3 } from '@math.gl/core';

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

  // const world = createWorld(); // {};
  
  // state = { Player, World };

  let previousTime = -1;
  const gameloop = (time: number) => {
    
    if(previousTime == -1)
      previousTime = time;
    const delta = time - previousTime;

    // dispatch("input",  state, delta);
    // dispatch("tick",   state, delta);
    // dispatch("render", state, delta);


    previousTime = time;
    requestAnimationFrame(gameloop);
  };

  requestAnimationFrame(gameloop);
};

/*
type Chunk = {
  position: Array<number>;
  blocks: Array<number>;
};

const Player = {};
const World = {
  chunks: Chunk[];
};


const Systems = new Map<string, (world: object, player: object) => void>;

const dispatch = (event: string) => {

  Systems.get(event)(World, Player);

};
*/
