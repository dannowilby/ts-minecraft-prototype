
import { Entity, Components, BlockStructureComponent } from './state';
import { createChunk, chunkSize } from './chunk/chunk';
import { initShaders } from './render';
import { chunkVertexShader, chunkFragmentShader } from './chunk/mesh';
import { generateEmptyChunk } from './chunk/chunk';

export const initMaze = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {

  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);

  const arenaSize = 4;

  for(let i = 0; i < arenaSize; i++) {
    for(let j = 0; j < arenaSize; j++) {
      createChunk(gl, program, entities, components)(i, 0, j, generateMazeChunk());
    }
  }
}

// you can design your own maze wallmap, however I created a function which makes one
// because I am lazy
const generateMazeChunk = (): BlockStructureComponent => {

  const output: BlockStructureComponent = generateEmptyChunk();

  generateFloor(output);

  generateWalls(output, generateWallMap());

  return output;
};

const generateWallMap = (): number[][] => {

  const output: number[][] = [];

  for(let i = 0; i < chunkSize; i++) {
    output.push([]);
    for(let j = 0; j < chunkSize; j++) {
      const r = Math.random(); // should wall be placed
      const s = Math.random(); // how tall should it be

      if(r < 0.2)
        output[i][j] = Math.floor(s * 4) + 1;
      else
        output[i][j] = 0;

    }
  }

  return output;
}

const generateFloor = (input: BlockStructureComponent) => {

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {
      if(Math.random() > 0.5)
        input[i][0][j] = 1;
      else
        input[i][0][j] = 2;
    }
  }
};

const generateWalls = (input: BlockStructureComponent, wallMap: number[][]) => {

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {

      const height = wallMap[i][j];

      for(let k = 0; k < height; k++) {
        input[i][1 + k][j] = (Math.random() > 0.5) ? 1 : 2;
      }

    }
  }

}

const generateCeiling = (input: BlockStructureComponent) => {

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {
      const r = Math.random();
      if(r > 0.66)
        input[i][chunkSize - 1][j] = 1;
      else if(r > 0.33)
        input[i][chunkSize - 1][j] = 2;
    }
  }
};
