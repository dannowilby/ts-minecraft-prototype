
import { Vector2, Vector3 } from '@math.gl/core';
import { EntityId, Entities, Components, newEntity, addComponent, ECState, removeEntity } from '../engine/ec';
import { createChunkRenderObject, naiveMeshing, chunkVertexShader, chunkFragmentShader } from './mesh';
import { initShaders } from './render';
import { Structure, RenderObject } from './components/chunk';
import { ExampleState } from './index';
import SimplexNoise from 'simplex-noise';

export type ChunkFactory = {
  program: WebGLProgram,
  chunkSize: number,
  loadDistance: number,
  noise: SimplexNoise,
};

export const ChunkFactory = (gl: WebGL2RenderingContext): ChunkFactory => ({
  program: initShaders(gl, chunkVertexShader, chunkFragmentShader),
  chunkSize: 16,
  loadDistance: 4,
  noise: new SimplexNoise('seed'),
});

export const chunkId = (pos: Vector3) => (`chu-${pos.x}-${pos.y}-${pos.z}`);

/** Start EXPOSED CHUNK FUNCTIONS **/

export const loadChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): ExampleState => {

  const entities = state.entities;
  const components = state.components;
  const chunkFactory = state.chunkFactory;

  const entityId = chunkId(pos);

  if(state.entities.has(entityId))
    return state;

  const entity = newEntity(entities, entityId);

  const structure = generateStructure(state, pos);
  state = addComponent(state, entityId, "structures", structure);

  const renderObject = buildChunk(gl, state, pos);
  state = addComponent(state, entityId, "renderObjects", renderObject);

  state = addComponent(state, entityId, "chunkPos", pos);
  
  return state;
}

const updateChunk = (gl: WebGL2RenderingContext) => {}

export const unloadChunk = (state: ExampleState, pos: Vector3): ExampleState => {

  const entityId = chunkId(pos);
  if(!state.entities.has(entityId))
    return state;

  return removeEntity(state, entityId);
}

/** End EXPOSED CHUNK FUNCTIONS */

export const generateBlock = (state: ExampleState, pos: Vector3): number => {
  const chunkFactory = state.chunkFactory;
  const chunkSize = chunkFactory.chunkSize;

  const baseHeight = chunkFactory.chunkSize / 2;
  const wavelength = chunkSize * 2;
  const height = chunkSize / 4;

  const h = baseHeight + height * chunkFactory.noise.noise2D(pos.x / wavelength, pos.z / wavelength);

  if(pos.y < h)
    if(Math.random() < 0.5)
      return 1;
    else
      return 2;

  return 0;
}

// could separate into generation file
export const generateStructure = (state: ExampleState, pos: Vector3): Structure => {

  const output: number[][][] = [];

  const entityId = chunkId(pos);
  const chunkFactory = state.chunkFactory;
  const chunkSize = chunkFactory.chunkSize;

  const blockPos = new Vector3(pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize);

  // build an empty structure
  for(let i = 0; i < chunkSize; i++) { // x
    output.push([]);
    for(let j = 0; j < chunkSize; j++) { // y
      output[i].push([]) 
    }
  }

  // set the blocks
  for(let i = 0; i < chunkSize; i++) { // x
    for(let j = 0; j < chunkSize; j++) { // y
      for(let k = 0; k < chunkSize; k++) {  // z

        const gx = blockPos.x + i;
        const gy = blockPos.y + j;
        const gz = blockPos.z + k;

        output[i][j][k] = generateBlock(state, new Vector3(gx, gy, gz));
      }
    }
  }
        
  return output;
}

// used for updating/meshing
const buildChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): RenderObject => {

  const mesh = naiveMeshing(state, pos);
  const renderObject = createChunkRenderObject(gl, state.chunkFactory, pos, mesh);

  return renderObject;
}
