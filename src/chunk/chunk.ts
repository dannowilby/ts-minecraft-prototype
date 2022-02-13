
import { Vector3, Matrix4 } from '@math.gl/core';

import { Entity, Components, StaticRenderObjectComponent, BlockStructureComponent } from '../state';
import { initShaders } from '../render';
import { createChunkRenderObject, chunkVertexShader, chunkFragmentShader } from './mesh';

import { fullBlockMesh, naiveMeshing } from './mesh';

export const chunkSize = 8;

export const initChunks = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {

  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j ++) {
      createChunk(gl, program, entities, components)(i, 0, j);
    }
  }

};

const createChunk = (gl: WebGL2RenderingContext, program: WebGLProgram, entities: Entity[], components: Components) => (x: number, y: number, z: number) => {
  const componentStructure = generateChunk();
  const componentMesh = createChunkRenderObject(gl, program)(new Vector3(x, y, z), naiveMeshing(componentStructure));
  const id = `chu-${x}-${y}-${z}`;

  entities.push({ id, components: [ "blockStructures", "staticRenderObjects" ] });
  components["blockStructures"].set(id, componentStructure);
  components["staticRenderObjects"].set(id, componentMesh);

};

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
