
export type System = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any) => T;
export type Systems = Map<string, System[]>;
export type Event = {
  type: string,
  data: any,
};

export interface State {

  systems: Map<string, System[]>,

  activeInput: Set<string>;
  mouseMovement: [ number, number ];
  queue: Array<Event>;
  lock: boolean;
};

export const createState = (gl: WebGL2RenderingContext): State => {

  const state: State = {
    systems: new Map<string, System[]>(),

    activeInput: new Set<string>(),
    mouseMovement: [ 0, 0 ],
    queue: [],
    lock: false,
  };


  return state;
};

export const addSystem = <T extends State>(state: T, type: string, system: System): T => {

  const systems = state.systems;
  const systemContainer = systems.get(type);

  if(!systemContainer) {
    systems.set(type, [ system ]);

    return state;
  }

  systemContainer?.push(system);

  return state;
};

export const dispatch = <T extends State>(gl: WebGL2RenderingContext, state: T, type: string, delta: number) => (data: any): T => {

  const systems = state.systems;
  const system = systems.get(type);
  
  if(!system)
    return state;
    //throw Error("Dispatch: System not registered");

  for(let i = 0; i < system.length; i++)
    state = system[i](gl, state, delta)(data);

  return state;
}

// need to create addSystem and seperate components/entities into another file


