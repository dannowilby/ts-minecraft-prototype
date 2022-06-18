import { Vector3 } from '@math.gl/core';
import { ExampleState } from '../index';
import { State, System } from '../../engine/state';
import { freeCameraInput } from '../../engine/freeCamera';

import { chunkId } from '../chunk';

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

