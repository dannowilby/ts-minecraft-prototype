import { State, createState } from './state';

/*
 * COMPONENTS
 */

// this is a pretty static way of component storage,
// that said, more dynamic ways are going to take too long to
// implement, and I'm not looking for this to be able to have
// 3rd party additions... yet

// export type MotionComponent = { pos: Vector3, vel: Vector3 };
// export type BlockStructureComponent = number[][][];
// export type StaticRenderObjectComponent = { vao: WebGLVertexArrayObject, vbo: WebGLBuffer, program: WebGLProgram, model: Matrix4, count: number };

// creates the storages for the different components
// to add a component, directly modify the object
// (it's not the best pattern, but it works for now)
export type Components = {
  [key: string]: Map<EntityId, any>
};

export const registerComponent = <T>(components: Components, componentName: string): Components => ({
  ...components,
  [componentName]: new Map<EntityId, T>(),
});

/*
 * ENTITIES
 * in a similar vein to the components,
 * direct modification will be used for now,
 * just push the entity to the array directly
 */

export type EntityId = string;
export type Entities = Map<EntityId, string[]>;

export const newEntity = (entities: Entities, entityId: EntityId): Entities => {

  entities.set(entityId, []);

  return entities;
}

export const addComponent = <T, K extends ECState>(state: K, entityId: EntityId, storage: string, component: T): K => {

  const entities = state.entities;
  const components = state.components;
  
  const componentStorage = components[storage];
  const entity = entities.get(entityId);

  if(!entity)
    throw Error("Add Component: Entity does not exist!");

  if(!componentStorage)
    throw Error("Add Component: No registered component storage!");

  components[storage].set(entityId, component);
  entities.set(entityId, [ ...entity, storage ]);

  state.entities = entities;
  state.components = components;

  return state;
}

export const removeComponent = <K extends ECState>(state: K, entityId: EntityId, storage: string): K => {

  const entities = state.entities;
  const components = state.components;

  const componentStorage = components[storage];
  const entity = entities.get(entityId);

  if(!entity)
    return state;
    //throw Error("Remove Component: Entity does not exist!");

  if(!componentStorage)
    return state;
    // throw Error("Remove Component: No registered component storage!");

  components[storage].delete(entityId);
  const edges = entity.filter(v => v !== storage);
  entities.set(entityId, edges);

  state.entities = entities;
  state.components = components;

  return state;
};

export const removeEntity = <K extends ECState>(state: K, entityId: EntityId): K => {

  const entities = state.entities;
  const components = state.components;

  const entity = entities.get(entityId);
  if(!entity)
    return state;

  const componentList = [ ...entity ];
  for(let i = 0; i < componentList.length; i++)
    state = removeComponent(state, entityId, componentList[i]);
 
  entities.delete(entityId);

  state.entities = entities;
  state.components = components;

  return state;
}

export interface ECState extends State {
  entities: Map<EntityId, string[]>;
  components: Components;
};

export const createECState = (gl: WebGL2RenderingContext): ECState => {

  const state = createState(gl);

  return {
    ...state,
    entities: new Map<EntityId, string[]>(),
    components: {},
  };

}
