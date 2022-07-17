import { Vector3 } from '@math.gl/core';

import { ExampleState } from '../index';
import { State, System } from '../../engine/state';

import { loadChunk, loadManyChunks, unloadChunk } from '../chunk/chunk';

export const loadChunks: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  const loadDistance = castedState.chunkFactory.loadDistance;
  const chunkSize = castedState.chunkFactory.chunkSize;

  const pos = castedState.player.position;
  const chunkPos = new Vector3(
    Math.floor(pos.x / chunkSize),
    Math.floor(pos.y / chunkSize),
    Math.floor(pos.z / chunkSize)
  );

  const toLoad: Vector3[] = [];

  const offset: Vector3[] = [];
  const r = loadDistance;
  for(let i = 0; i < r; i++) {
    for(let j = 0; j < r; j++) {
      for(let k = 0; k < r; k++) {
        if((i*i + j*j + k*k) < r*r) {
            offset.push(new Vector3(i, j, k));
            offset.push(new Vector3(i, -j, k));
        }
      }
    }

  }

  console.log(offset)

  castedState = loadManyChunks(gl, castedState, offset);

  return castedState as any as T;
}

export const unloadChunks: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  const loadDistance = castedState.chunkFactory.loadDistance;
  const chunkSize = castedState.chunkFactory.chunkSize;

  const playerPos = castedState.player.position;
  const chunkPos = new Vector3(
    Math.floor(playerPos.x / chunkSize),
    Math.floor(playerPos.y / chunkSize),
    Math.floor(playerPos.z / chunkSize)
  );

  const chunkPosStorage = castedState.components["chunkPos"];
  if(!chunkPosStorage)
    return castedState as any as T;

  chunkPosStorage.forEach((v, k) => {
    // let unload = false;
    // find chunkpos outside range and unload
    if(v.x < chunkPos.x - loadDistance)
      castedState = unloadChunk(castedState, v);
    if(v.x > chunkPos.x + loadDistance)
      castedState = unloadChunk(castedState, v);
    
    if(v.y < chunkPos.y - loadDistance)
      castedState = unloadChunk(castedState, v);
    if(v.y > chunkPos.y + loadDistance)
      castedState = unloadChunk(castedState, v);

    if(v.z < chunkPos.z - loadDistance)
      castedState = unloadChunk(castedState, v);
    if(v.z > chunkPos.z + loadDistance)
      castedState = unloadChunk(castedState, v);
    
    // castedState.queue.push({ type: "chunkUnload", data: v })
  });

  return castedState as any as T;
}
