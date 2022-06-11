
import { Player } from './player';
import { Components, Entity } from './state'

export type System = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => void;
export type Systems = Map<string, System[]>;

export const createSystems = () => (
  new Map<string, System[]>()
);

export const addSystem = (systems: Systems, event: string, system: System) => {
  
  const s = systems.get(event);
  
  if(!s)
    systems.set(event, [ system ]);
  else
    s.push(system);
};

export const dispatch_event = 
  (gl: WebGL2RenderingContext) => 
  (player: Player, entities: Entity[], components: Components, systems: Systems) => 
  (event: string, delta: number) => {
  
  const s = systems.get(event);
  if(!s)
    return;

  s.forEach(f => f(gl, player, entities, components, delta));
};

