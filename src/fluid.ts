
import { Vector3, Vector4 } from '@math.gl/core';

import { Entity, EntityId, Components } from './state';
import { Player } from './player';

// might want some randomizing factor
export type Fluid = {
  direction: Vector3,
  type: string,
  color: Vector4,
};

export type FluidPoint = {
  position: Vector3,
  pressure: Vector3,
  type: string,
};


// Fairly naive implementation of a simulation
export const simulateFluid = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {

  components.fluidPoints.forEach((v, k) => {
  
    const containingChunk = components.blockStructures.get(k);
/*    
    v.elements.forEach((v, k) => {
      const pointAtDirection = someMethodToGetTheFluidPointAt(v.position + fluidTypes[v.type].direction);
      
      if(pointAtDirection == air)
        v.position = v.position + fluidTypes[v.type].direction;
      if(pointAtDirection == fluid) // needs to not limit to infinity
        pointAtDirection.pressure = pointAtDirection.pressure + fluidTypes[v.type].direction;
      if(pointAtDirection == solidBlock)
        v.pressure = v.pressure - v.direction;

    });
*/
  });

};

export const renderFluid = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {


};
