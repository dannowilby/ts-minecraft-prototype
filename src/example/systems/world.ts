import { Vector3 } from '@math.gl/core';

import { ExampleState } from '../index';
import { State, System } from '../../engine/state';

import { loadChunk, unloadChunk } from '../chunk';

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

  for(let i = 0; i < loadDistance * 2; i++)
    for(let j = 0; j < loadDistance * 2; j++) {
      castedState = loadChunk(gl, castedState, new Vector3(
        Math.floor(pos.x / chunkSize) - loadDistance + i, 
        0,
        Math.floor(pos.z / chunkSize) - loadDistance + j
      ));
      castedState.queue.push({ type: "chunkLoad", data: chunkPos })
    }

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

  chunkPosStorage.forEach((v) => {
    if(chunkPos.distance(v) > loadDistance) {
      castedState = unloadChunk(castedState, v);
      castedState.queue.push({ type: "chunkUnload", data: chunkPos })
    }
  });

  return castedState as any as T;
}
