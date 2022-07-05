import { Matrix4, Vector3 } from '@math.gl/core';
import { ExampleState } from '../index';
import { State, System } from '../../engine/state';
import { freeCameraInput } from '../../engine/freeCamera';

import { chunkId, chunkPosFromBlockPos, generateBlock, getBlock, setBlock, updateChunk } from '../chunk';
import { drawSelectionBox, rayCast } from '../player';
import {floorVector} from '../../lib/math';

export const cameraInput: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  castedState.player = {
    ...freeCameraInput(castedState.player, castedState, delta),
    ...castedState.player,
  };

  castedState.mouseMovement = [ 0, 0 ];

  if(castedState.activeInput.has("g"))
    console.log(castedState.player.position);

  if(castedState.activeInput.has("v")) {
    const pos = castedState.player.position;
    const chunkSize = castedState.chunkFactory.chunkSize;
    const chunkPos = new Vector3(
      Math.floor(pos.x / chunkSize),
      Math.floor(pos.y / chunkSize),
      Math.floor(pos.z / chunkSize),
    );

    const eid = chunkId(chunkPos);

    const chunk = castedState.components["renderObjects"]?.get(eid);

    if(chunk) {
      chunk.wireframe = !chunk.wireframe;
      castedState.components["renderObjects"].set(eid, chunk);
    }
  }

  return castedState as any as T;
}

// FIXME: build surrounding chunks so no missing faces on chunk borders
export const blockInput: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  const chunkSize = castedState.chunkFactory.chunkSize;

  const which = data?.which;
  const { position, direction, rayStep, rayMaxLength } = castedState.player;

  const hit = rayCast(gl, castedState, position, direction, rayStep, rayMaxLength);
  if(!hit)
    return castedState as any as T;

  const blockPos = floorVector(hit.position);
  const chunkPos = chunkPosFromBlockPos(castedState, blockPos);

  const prevPos = floorVector(hit.previous);
  const prevChunkPos = chunkPosFromBlockPos(castedState, prevPos);

  // left click - remove block
  if(which == 1) {
    // set the block
    castedState = setBlock(castedState, blockPos, 0);
    
    // update the mesh
    castedState = updateChunk(gl, castedState, chunkPos);

    const modulo = new Vector3(
        ((blockPos.x % chunkSize) + chunkSize) % chunkSize,
        ((blockPos.y % chunkSize) + chunkSize) % chunkSize,
        ((blockPos.z % chunkSize) + chunkSize) % chunkSize
    );

    if(modulo.x % chunkSize == 0)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x - 1, chunkPos.y, chunkPos.z));
    if(modulo.x % chunkSize == chunkSize - 1)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x + 1, chunkPos.y, chunkPos.z));

    if(modulo.y % chunkSize == 0)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x, chunkPos.y - 1, chunkPos.z));
    if(modulo.y % chunkSize == chunkSize - 1)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x, chunkPos.y + 1, chunkPos.z));

    if(modulo.z % chunkSize == 0)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x, chunkPos.y, chunkPos.z - 1));
    if(modulo.z % chunkSize == chunkSize - 1)
      castedState = updateChunk(gl, castedState, new Vector3(chunkPos.x, chunkPos.y, chunkPos.z + 1));
  }
  // right click - add block
  if(which == 3) {
    // set the block
    castedState = setBlock(castedState, prevPos, 1);
    
    // update the mesh
    castedState = updateChunk(gl, castedState, prevChunkPos);

  }

  return castedState as any as T;
}

export const renderSelectionBox: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  const which = data?.which;
  const { position, direction, rayStep, rayMaxLength } = castedState.player;

  const hit = rayCast(gl, castedState, position, direction, rayStep, rayMaxLength);
  if(!hit)
    return castedState as any as T;

  const pos = floorVector(hit.position);

  castedState.player.selectionBox.model = castedState.player.selectionBox.model.identity().translate([pos.x, pos.y, pos.z]);
  castedState = drawSelectionBox(gl, castedState);

  return castedState as any as T;
}

