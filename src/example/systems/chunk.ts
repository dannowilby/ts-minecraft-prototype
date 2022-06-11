
import { ExampleState } from '../index';
import { State } from '../../engine/state';

import { RenderObject } from '../components/chunk';

// just renders all render objects right now
export const renderChunks = <T extends State>(gl: WebGL2RenderingContext, state: T, delta: number) => (data: any): T => {

  const castedState = state as unknown as ExampleState;

  const renderObjects = castedState.components["renderObjects"];
  
  if(!renderObjects)
    throw Error("RenderChunks: RenderObjects component not registered!"); 

  renderObjects.forEach((v: RenderObject, k) => {

    gl.useProgram(v.program);

    const projection = gl.getUniformLocation(v.program, "projection");
    const view = gl.getUniformLocation(v.program, "view");
    const model = gl.getUniformLocation(v.program, "model");

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, castedState.atlas);

    gl.uniformMatrix4fv(projection, false, castedState.player.projection);
    gl.uniformMatrix4fv(view, false, castedState.player.view);
    gl.uniformMatrix4fv(model, false, v.model);

    gl.bindVertexArray(v.vao);
    gl.drawArrays(v.wireframe ? gl.LINES : gl.TRIANGLES, 0, v.vertexCount);

  });

  return state;
}


