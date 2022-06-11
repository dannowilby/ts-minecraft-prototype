
import { Vector3 } from '@math.gl/core';
import { EntityId, Entities, Components, newEntity, addComponent, ECState, removeEntity } from '../engine/ec';
import { createChunkRenderObject, naiveMeshing, chunkVertexShader, chunkFragmentShader } from './mesh';
import { initShaders } from '../render';
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

const newChunk = (gl: WebGL2RenderingContext, chunkFactory: ChunkFactory, pos: Vector3): [ Structure, RenderObject ] => {

  const structure = generateStructure(chunkFactory, pos);
  const renderObject = buildChunk(gl, chunkFactory, structure, pos);

  return [ structure, renderObject ];
}

// used for updating/meshing
const buildChunk = (gl: WebGL2RenderingContext, chunkFactory: ChunkFactory, structure: Structure, pos: Vector3): RenderObject => {

  const mesh = naiveMeshing(structure);
  const renderObject = createChunkRenderObject(gl, chunkFactory, pos, naiveMeshing(structure));

  return renderObject;
}

/** Start EXPOSED CHUNK FUNCTIONS **/

export const loadChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): ExampleState => {

  const entities = state.entities;
  const components = state.components;
  const chunkFactory = state.chunkFactory;

  const entityId = `chu-${pos.x}-${pos.y}-${pos.z}`;

  if(state.entities.has(entityId))
    return state;

  const entity = newEntity(entities, entityId);

  // check if chunk exists already, if not create a new one
  const [ structure, renderObject ] = newChunk(gl, chunkFactory, pos);

  state = addComponent(state, entityId, "structures", structure);
  state = addComponent(state, entityId, "renderObjects", renderObject);
  state = addComponent(state, entityId, "chunkPos", pos);
  
  return state;
}

const updateChunk = (gl: WebGL2RenderingContext, chunkFactory: ChunkFactory, entities: Entities, components: Components, pos: Vector3): [ Entities, Components ] => {

  const entityId = `chu-${pos.x}-${pos.y}-${pos.z}`;

  return [ entities, components ];
}

export const unloadChunk = (state: ExampleState, pos: Vector3): ExampleState => {

  const entityId = `chu-${pos.x}-${pos.y}-${pos.z}`;
  if(!state.entities.has(entityId))
    return state;

  return removeEntity(state, entityId);
}

/** End EXPOSED CHUNK FUNCTIONS */


// could separate into generation file
const generateStructure = (chunkFactory: ChunkFactory, pos: Vector3): Structure => {

  const output: number[][][] = [];
  const chunkSize = chunkFactory.chunkSize;

  const baseHeight = chunkFactory.chunkSize / 2;
  const wavelength = chunkSize * 2;
  const height = chunkSize / 4;

  for(let i = 0; i < chunkSize; i++) { // x
    output.push([]);
    for(let j = 0; j < chunkSize; j++) { // y
      output[i].push([]) 
      for(let k = 0; k < chunkSize; k++) {  // z

        const gx = chunkSize * pos.x + i;
        const gz = chunkSize * pos.z + k;

        const h = baseHeight + height * chunkFactory.noise.noise2D(gx / wavelength, gz / wavelength);

        if(j <= h)
          output[i][j][k] =  1;
        else
          output[i][j][k] = 0;

      }
    }
  }
        
  return output;
}
