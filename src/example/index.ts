
import { Vector3 } from '@math.gl/core';

import { State, createState, System, addSystem } from '../engine/state';
import { ECState, createECState, registerComponent } from '../engine/ec';

import { Camera, createCamera, freeCameraInput } from '../engine/freeCamera';
import { cameraInput } from './systems/input';
import { loadChunks, unloadChunks } from './systems/world';

import { ChunkFactory, loadChunk } from './chunk';
import { RenderObject, Structure, ChunkPos } from './components/chunk';
import { renderChunks } from './systems/chunk';

import { Block, BlockDictionary } from './block';
import { fullBlockMesh } from './mesh';

import { loadTexture } from '../render';

// TODO:
// convert to octree
// greedy meshing
// smart meshing with checking chunk boundaries
// ambient block light
// random generation
// text rendering
// physics
// block breaking and adding
// implement multithreading via webworkers

export interface Player extends Camera {

};

export interface ExampleState extends ECState {
  chunkFactory: ChunkFactory;
  blockDictionary: BlockDictionary;
  atlas: WebGLTexture;
  player: Player;
};

export const init = (gl: WebGL2RenderingContext): ExampleState => {

  let state = {
    ...createECState(gl),
    player: createCamera(gl),
    chunkFactory: ChunkFactory(gl),
    blockDictionary: createBlockDictionary(),
    atlas: loadTexture(gl, "atlas.png"),
  };

  state.components = registerComponent<RenderObject>(state.components, "renderObjects");
  state.components = registerComponent<Structure>(state.components, "structures");
  state.components = registerComponent<ChunkPos>(state.components, "chunkPos");

  state = addSystem(state, "tick", unloadChunks);
  state = addSystem(state, "tick", loadChunks);
  state = addSystem(state, "input", cameraInput);
  state = addSystem(state, "render", renderChunks);

  return state;
}

const createBlockDictionary = () => ([
        {
          name: 'air',
          type: 'air',
          mesh: fullBlockMesh,
          u: 0,
          v: 0
        },
        {
          name: 'dirt',
          type: 'fullBlock',
          mesh: fullBlockMesh,
          u: 0.125,
          v: 0
        },
        {
          name: 'grass',
          type: 'fullBlock',
          mesh: fullBlockMesh,
          u: 0.0,
          v: 0
        },

]);
