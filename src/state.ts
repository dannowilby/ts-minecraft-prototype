
import { MinHeap } from './MinHeap';
import { Vector3, Matrix4 } from '@math.gl/core';

/*
 * COMPONENTS
 */

// this is a pretty static way of component storage,
// that said, more dynamic ways are going to take too long to
// implement, and I'm not looking for this to be able to have
// 3rd party additions... yet
export type MotionComponent = { pos: Vector3, vel: Vector3 };
export type BlockStructureComponent = number[][][];
export type StaticRenderObjectComponent = { vao: WebGLVertexArrayObject, vbo: WebGLBuffer, program: WebGLProgram, model: Matrix4, count: number, wireframe: boolean };
import { FluidPoint } from './fluid';
// creates the storages for the different components
// to add a component, directly modify the object
// (it's not the best pattern, but it works for now)
export type Components = {
  [key: string]: Map<EntityId, any>
};
export const createComponents = () => ({
  motions:             new Map<EntityId, MotionComponent>(), 
  blockStructures:     new Map<EntityId, BlockStructureComponent>(), 
  staticRenderObjects: new Map<EntityId, StaticRenderObjectComponent>(),
  fluidPoints:         new Map<EntityId, MinHeap<FluidPoint>>(),
});


/*
 * ENTITIES
 */

export type EntityId = string;

export type Entity = {
  id: EntityId,
  components: string[]
};

// in a similar vein to the components,
// direct modification will be used for now,
// just push the entity to the array directly
export const createEntities = (): Entity[] => ([]);

