
import { Vector3, Matrix4 } from '@math.gl/core';

import { Entity, EntityId, Components, StaticRenderObjectComponent, BlockStructureComponent } from '../state';
import { initShaders } from '../render';
import { createChunkRenderObject, updateChunkRenderObject, chunkVertexShader, chunkFragmentShader } from './mesh';

import { fullBlockMesh, naiveMeshing } from './mesh';

export const chunkSize = 8;

export const getChunkId = (pos: Vector3): EntityId => {

  const x = Math.floor(pos.x / chunkSize);
  const y = Math.floor(pos.y / chunkSize);
  const z = Math.floor(pos.z / chunkSize);

  return `chu-${x}-${y}-${z}`;
}

export const getBlock = (entities: Entity[], components: Components) => (pos: Vector3): number => {

  const x = pos.x;
  const y = pos.y;
  const z = pos.z;

  const structure = components["blockStructures"].get(getChunkId(pos));

  if(!structure)
    return 0;

  return structure[Math.floor(x % chunkSize)][Math.floor(y % chunkSize)][Math.floor(z % chunkSize)];

}

export const setBlock = (entities: Entity[], components: Components) => (pos: Vector3, block: number) => {

  const x = pos.x;
  const y = pos.y;
  const z = pos.z;

  const structure = components["blockStructures"].get(getChunkId(pos));

  if(!structure)
    return;

  structure[Math.floor(x % chunkSize)][Math.floor(y % chunkSize)][Math.floor(z % chunkSize)] = block;
}

export const initChunks = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {
  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);
};

export const createChunk = (gl: WebGL2RenderingContext, program: WebGLProgram, entities: Entity[], components: Components) => (x: number, y: number, z: number, componentStructure: BlockStructureComponent) => {
  const componentMesh = createChunkRenderObject(gl, program)(new Vector3(x, y, z), naiveMeshing(componentStructure));
  const id = `chu-${x}-${y}-${z}`;

  entities.push({ id, components: [ "blockStructures", "staticRenderObjects" ] });
  components["blockStructures"].set(id, componentStructure);
  components["staticRenderObjects"].set(id, componentMesh);
};

export const updateChunk = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => (pos: Vector3) => {

  const renderObject = components["staticRenderObjects"].get(getChunkId(pos));
  const blockStructure = components["blockStructures"].get(getChunkId(pos));

  if(!renderObject || !blockStructure)
    return;

  updateChunkRenderObject(gl, renderObject.program)(renderObject, naiveMeshing(blockStructure));
}

export const generateEmptyChunk = (): BlockStructureComponent => {

  const output: BlockStructureComponent = [];
  
  // create empty chunk
  for(let i = 0; i < chunkSize; i++) {
    output.push([]);
    for(let j = 0; j < chunkSize; j++) {
      output[i].push([])
      for(let k = 0; k < chunkSize; k++) {
        output[i][j].push(0)
      }
    }
  }

  return output;
}
const generateChunk = () => {

  const output: BlockStructureComponent = [];
  for(let i = 0; i < chunkSize; i++) {
    output.push([]);
    for(let j = 0; j < chunkSize; j++) {
      output[i].push([])
      for(let k = 0; k < chunkSize; k++) {
        const r = Math.random();

        if(j == 0)
          output[i][j].push(r > 0.5 ? 1 : 2);
        else if (j == chunkSize - 1)
          if(r > 0.75)
            output[i][j].push(2)
          else if(r > 0.25)
            output[i][j].push(1);
          else
            output[i][j].push(0);
        else
          output[i][j].push(0);

      }
    }
  }

  return output;
}
