
import { Entity, Components } from './state';
import { Player } from './player';

export const cameraInput = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {

  window.onkeydown = (e) => {
    
    if(e.key == "w")
      player.view.translate([ 0, 0, delta * 2.0 ]);
    if(e.key == "s")
      player.view.translate([ 0, 0, delta * -2.0 ]);
  }

};
