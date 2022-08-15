
import { Vector3 } from '@math.gl/core';

import { State, createState, System, addSystem } from '../engine/state';
import { ECState, createECState, registerComponent } from '../engine/ec';

import { Camera, createCamera, freeCameraInput } from '../engine/freeCamera';
import { blockInput, cameraInput, checkChunkChange, renderSelectionBox } from './systems/input';
import { loadChunks, unloadChunks } from './systems/world';

import { RenderObject, Structure, ChunkPos } from './components/chunk';
import { renderChunks } from './systems/chunk';

import { Player, createPlayer } from './player';

import { ChunkFactory, loadChunk } from './chunk/chunk';
import { Block, BlockDictionary } from './chunk/block';
import { fullBlockMesh, chunkVertexShader, chunkFragmentShader } from './chunk/mesh';
import { initShaders } from './render';

import { loadTexture } from './render';

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

export interface ExampleState extends ECState {
  chunkFactory: ChunkFactory;
  atlas: WebGLTexture;
  player: Player;
  program: WebGLProgram;
  isStartup: boolean;
};

export const init = (gl: WebGL2RenderingContext): ExampleState => {

  let state = {
    ...createECState(gl),
    player: createPlayer(gl), 
    chunkFactory: ChunkFactory(gl),
    blockDictionary: createBlockDictionary(),
    atlas: loadTexture(gl, "atlas.png"),
    program: initShaders(gl, chunkVertexShader, chunkFragmentShader),
    isStartup: true,
  };

  state.components = registerComponent<RenderObject>(state.components, "renderObjects");
  state.components = registerComponent<Structure>(state.components, "structures");
  state.components = registerComponent<ChunkPos>(state.components, "chunkPos");

  // systems
  state = addSystem(state, "playerChangeChunk", unloadChunks);
  state = addSystem(state, "playerChangeChunk", loadChunks);

  state = addSystem(state, "input", cameraInput);
  state = addSystem(state, "input", checkChunkChange);
  state = addSystem(state, "click", blockInput);

  state = addSystem(state, "render", renderSelectionBox);
  state = addSystem(state, "render", renderChunks);

  return state;
}

export const createBlockDictionary = () => ([
  {
    name: 'air',
    type: 'air',
    u: 0,
    v: 0
  },
  {
    name: 'dirt',
    type: 'fullBlock',
    u: 0.125,
    v: 0
  },
  {
    name: 'grass',
    type: 'fullBlock',
    u: 0.0,
    v: 0
  },
  {
    name: 'stone',
    type: 'fullBlock',
    u: 0.0625,
    v: 0
  },
  {
    name: 'wood',
    type: 'fullBlock',
    u: 0.250,
    v: 0
  },
]);
