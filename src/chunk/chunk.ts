
import { Vector3, Matrix4 } from '@math.gl/core';

import { Entity, Components, StaticRenderObjectComponent, BlockStructureComponent } from '../state';
import { initShaders } from '../render';
import { createChunkRenderObject, chunkVertexShader, chunkFragmentShader } from './mesh';

import { fullBlockMesh, naiveMeshing } from './mesh';

export const chunkSize = 8;

export const initChunks = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {

  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);

  const componentStructure = generateSolidChunk();
  const componentMesh = createChunkRenderObject(gl, program)(new Vector3(0, 0, 0), naiveMeshing(componentStructure));
  const id = "chu-0-0-0";

  entities.push({ id, components: [ "blockStructures", "staticRenderObjects" ] });
  components["blockStructures"].set(id, componentStructure);
  components["staticRenderObjects"].set(id, componentMesh);
};

const generateSolidChunk = () => {

  const output: BlockStructureComponent = [];
  for(let i = 0; i < chunkSize; i++) {
    output.push([]);
    for(let j = 0; j < chunkSize; j++) {
      output[i].push([])
      for(let k = 0; k < chunkSize; k++) {
        const r = Math.random();
        if(r > 0.25 && r < 0.75)
          output[i][j].push(1);
        else if(r > 0.75)
          output[i][j].push(2);
        else
          output[i][j].push(0);
      }
    }
  }

  return output;
}
