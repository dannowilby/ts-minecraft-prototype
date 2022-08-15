
import { Vector2, Vector3 } from '@math.gl/core';
import { EntityId, Entities, Components, newEntity, addComponent, ECState, removeEntity } from '../../engine/ec';
import { createChunkRenderObject, naiveMeshing, chunkVertexShader, chunkFragmentShader } from './mesh';
import { initShaders } from '../render';
import { Structure, RenderObject } from '../components/chunk';
import { createBlockDictionary, ExampleState } from '../index';
import SimplexNoise from 'simplex-noise';
import { BlockDictionary } from './block';
import { generateStructure, generateBlock } from '../generation';


// Need to remove functions from the ChunkFactory struct
// - Making a simplex/perlin noise that only depends on pos and seed, and not an object to generate
// Need to create a "loadDefered" where it abstracts away loading chunks by a webworker
// Should put atlas and program together in an object in the state object

export type ChunkFactory = {
  chunkSize: number,
  loadDistance: number,
  blockDictionary: BlockDictionary
};

export const ChunkFactory = (gl: WebGL2RenderingContext): ChunkFactory => ({
  chunkSize: 8,
  loadDistance: 3,
  blockDictionary: createBlockDictionary(),
});

export const chunkId = (pos: Vector3) => (`chu-${pos[0]}-${pos[1]}-${pos[2]}`);

export const chunkPosFromBlockPos = (chunkFactory: ChunkFactory, pos: Vector3): Vector3 => (new Vector3(
  Math.floor(pos[0] / chunkFactory.chunkSize), 
  Math.floor(pos[1] / chunkFactory.chunkSize), 
  Math.floor(pos[2] / chunkFactory.chunkSize) 
));

export const localBlockPosToIndex = (chunkFactory: ChunkFactory, x: number, y: number, z: number) => {
  const chunkSize = chunkFactory.chunkSize;
  return (x + y * chunkSize + z * chunkSize * chunkSize);
}

/** Start EXPOSED CHUNK FUNCTIONS **/

// SYNCHRONOUS
export const loadChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): ExampleState => {

  const entities = state.entities;
  const components = state.components;
  const chunkFactory = state.chunkFactory;

  const entityId = chunkId(pos);

  if(state.entities.has(entityId))
    return state;

  const entity = newEntity(entities, entityId);

  const structure = generateStructure(chunkFactory, pos);
  state = addComponent(state, entityId, "structures", structure);

  const renderObject = buildChunk(gl, state, pos);
  state = addComponent(state, entityId, "renderObjects", renderObject);

  state = addComponent(state, entityId, "chunkPos", pos);
  
  return state;
}

// ASYNCHRONOUS
export const loadManyChunks = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3[]): ExampleState => {

  const entities = state.entities;
  const components = state.components;
  const structures = components["structures"];
  const chunkFactory = state.chunkFactory;

  let activeThreads = 0;
  
  for(let i = 0; i < pos.length; i++) {

    const entityId = chunkId(pos[i]);

    if(state.entities.has(entityId))
      continue

    const entity = newEntity(entities, entityId);

    const structure = generateStructure(chunkFactory, pos[i]);
    state = addComponent(state, entityId, "structures", structure);

    state = addComponent(state, entityId, "chunkPos", pos[i]);
  
    const worker = new Worker(new URL('../workers/meshWorker.ts', import.meta.url), { type: "module" });
    activeThreads++;
    worker.postMessage({ chunkFactory, structures, pos: pos[i] });
    worker.onmessage = (e) => {

      console.log(`Active threads: ${activeThreads}`);

      if(activeThreads == 1 && state.isStartup) {
        // disable generating text
        const s = document.getElementById("intro");
        if(s)
          s.hidden = true;
        state.isStartup = false;
      }


      activeThreads--;
      const renderObject = createChunkRenderObject(gl, state.program, state.chunkFactory, pos[i], e.data);
      
      state = addComponent(state, entityId, "renderObjects", renderObject);
      worker.terminate();
    }
  }

  return state;
}

// FIXME: don't create a new VAO every time, just update the existing
export const updateChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): ExampleState => {

  const cid = chunkId(pos);
  const renderObject = buildChunk(gl, state, pos);

  state = addComponent(state, cid, "renderObjects", renderObject);

  return state;
}

export const unloadChunk = (state: ExampleState, pos: Vector3): ExampleState => {

  const entityId = chunkId(pos);
  if(!state.entities.has(entityId))
    return state;

  return removeEntity(state, entityId);
}

/** End EXPOSED CHUNK FUNCTIONS */

// FIXME: doesn't set the block if it's not loaded
export const setBlock = (state: ExampleState, pos: Vector3, blockId: number): ExampleState => {
  
  const chunkSize = state.chunkFactory.chunkSize;

  const blockPos = new Vector3(
    Math.floor(pos[0]),
    Math.floor(pos[1]),
    Math.floor(pos[2])
  );

  const localPos = new Vector3( 
    ((blockPos[0] % chunkSize) + chunkSize) % chunkSize, 
    ((blockPos[1] % chunkSize) + chunkSize) % chunkSize, 
    ((blockPos[2] % chunkSize) + chunkSize) % chunkSize 
  ); 
  const chunkPos = chunkPosFromBlockPos(state.chunkFactory, blockPos);
  const chunkEntity = chunkId(chunkPos);

  const structure = state.components["structures"]?.get(chunkEntity);

  // if structure exists set block and replace it
  if(structure) {
    const t = new Float64Array(structure);
    t[localBlockPosToIndex(state.chunkFactory, localPos[0], localPos[1], localPos[2])] = blockId;
    state = addComponent(state, chunkEntity, "structures", structure);
  }

  return state;
}

// FIXME: does not work for some reason
export const getBlock = (chunkFactory: ChunkFactory, structures: Map<EntityId, Structure>, pos: Vector3): number => {

  const chunkSize = chunkFactory.chunkSize;

  const blockPos = new Vector3(
    Math.floor(pos[0]),
    Math.floor(pos[1]),
    Math.floor(pos[2])
  );

  const localPos = new Vector3( 
    ((blockPos[0] % chunkSize) + chunkSize) % chunkSize, 
    ((blockPos[1] % chunkSize) + chunkSize) % chunkSize, 
    ((blockPos[2] % chunkSize) + chunkSize) % chunkSize 
  ); 

  const chunkPos = chunkPosFromBlockPos(chunkFactory, blockPos);
  //const chunkEntity = chunkId(chunkPos);
  const chunkEntity = `chu-${chunkPos[0]}-${chunkPos[1]}-${chunkPos[2]}`;

  const structure = structures.get(chunkEntity);


  if(structure) {
    const t = new Float64Array(structure);
    return t[localBlockPosToIndex(chunkFactory, localPos[0], localPos[1], localPos[2])];
  }

  return generateBlock(chunkFactory, pos);
}


// used for updating/meshing
const buildChunk = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3): RenderObject => {

  const mesh = naiveMeshing(state.chunkFactory, state.components["structures"], pos);
  const renderObject = createChunkRenderObject(gl, state.program, state.chunkFactory, pos, mesh);

  return renderObject;
}
