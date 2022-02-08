
import { Vector3, Matrix4 } from '@math.gl/core';

import { Player } from './player';
import { Entity, Components, StaticRenderObjectComponent } from './state';

export const initShaders = (gl: WebGL2RenderingContext, vshader: string, fshader: string): WebGLProgram => {

  const program = gl.createProgram();
  if(!program)
    throw new Error("WebGL failed to create program");
  
  const vertex = compileShader(gl, vshader, gl.VERTEX_SHADER);
  const fragment = compileShader(gl, fshader, gl.FRAGMENT_SHADER);
  
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
 
  gl.linkProgram(program);
 
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success)
      throw new Error("program failed to link:"); // + gl.getProgramInfoLog (program));
 
  return program;
};

const compileShader = (gl: WebGL2RenderingContext, source: string, type: number): WebGLShader => {

  const shader = gl.createShader(type);

  if(!shader)
    throw new Error("WebGL failed to create shader");

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success)
    throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);

  return shader;
}

export const renderStaticObjects = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {

  components.staticRenderObjects.forEach((v, k) => {
    
    gl.useProgram(v.program);
    
    const projection = gl.getUniformLocation(v.program, "projection");
    const view       = gl.getUniformLocation(v.program, "view");
    const model      = gl.getUniformLocation(v.program, "model");

    gl.uniformMatrix4fv(projection, false, player.projection);
    gl.uniformMatrix4fv(view, false, player.view);
    gl.uniformMatrix4fv(model, false, v.model);

    gl.bindVertexArray(v.vao);

    gl.drawArrays(gl.TRIANGLES, 0, v.count);
  });

}
