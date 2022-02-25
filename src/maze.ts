
import { Vector3 } from '@math.gl/core';
import { Entity, Components, BlockStructureComponent } from './state';
import { createChunk, chunkSize } from './chunk/chunk';
import { initShaders } from './render';
import { chunkVertexShader, chunkFragmentShader } from './chunk/mesh';
import { generateEmptyChunk } from './chunk/chunk';

import { createChunkRenderObject, fullBlockMeshWithNormals } from './chunk/mesh';
export const initMaze = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {

  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);

  const id = `pointLight`;
  entities.push({ id, components: [ "staticRenderObjects" ] });
  const mesh = fullBlockMeshWithNormals;
  components["staticRenderObjects"].set(id, createChunkRenderObject(gl, program)(
    new Vector3(0,1,0),
    new Float32Array([
      ...mesh.northFace(0, 0, 0, 0, 0),
      ...mesh.southFace(0, 0, 0, 0, 0),
      ...mesh.eastFace(0, 0, 0, 0, 0),
      ...mesh.westFace(0, 0, 0, 0, 0),
      ...mesh.topFace(0, 0, 0, 0, 0),
      ...mesh.bottomFace(0, 0, 0, 0, 0),
    ])
  ));
  components["staticRenderObjects"].get(id).displayWireframe = true;

  const id1 = `spotLight`;
  entities.push({ id: id1, components: [ "staticRenderObjects" ] });
  components["staticRenderObjects"].set(id1, createChunkRenderObject(gl, program)(
    new Vector3(0,1,0),
    new Float32Array([
      ...mesh.northFace(0, 0, 0, 0, 0),
      ...mesh.southFace(0, 0, 0, 0, 0),
      ...mesh.eastFace(0, 0, 0, 0, 0),
      ...mesh.westFace(0, 0, 0, 0, 0),
      ...mesh.topFace(0, 0, 0, 0, 0),
      ...mesh.bottomFace(0, 0, 0, 0, 0),
    ])
  ));
  components["staticRenderObjects"].get(id1).displayWireframe = true;

  const arenaSize = 4;

  for(let i = 0; i < arenaSize; i++)
    for(let j = 0; j < arenaSize; j++)
      createChunk(gl, program, entities, components)(i, 0, j, generateMazeChunk());
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
