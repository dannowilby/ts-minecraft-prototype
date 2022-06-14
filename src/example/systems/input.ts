import { Vector3 } from '@math.gl/core';
import { ExampleState } from '../index';
import { State, System } from '../../engine/state';
import { freeCameraInput } from '../../engine/freeCamera';

export const cameraInput: System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  let castedState = state as any as ExampleState;

  castedState.player = {
    ...freeCameraInput(castedState.player, castedState, delta),
    ...castedState.player,
  };

  castedState.mouseMovement = [ 0, 0 ];

  if(castedState.activeInput.has("g"))
    console.log(castedState.player.position);

  return castedState as any as T;
}

