
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

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, player.atlas);

    gl.uniformMatrix4fv(projection, false, player.projection);
    gl.uniformMatrix4fv(view, false, player.view);
    gl.uniformMatrix4fv(model, false, v.model);

    gl.bindVertexArray(v.vao);

    gl.drawArrays(gl.TRIANGLES, 0, v.count);
  });

}

/*
 * Assumes the texture size is a power of 2. Generates mipmaps
 */
export const loadTexture = (gl: WebGL2RenderingContext, url: string): WebGLTexture => {

  const texture = gl.createTexture();
  if(!texture)
    throw new Error("WebGL couldn't create needed textures");

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([ 255, 0, 255, 255 ]);
  
  gl.texImage2D(
    gl.TEXTURE_2D, 
    level, 
    internalFormat,
    width, 
    height, 
    border, 
    srcFormat, 
    srcType,
    pixel
  );

  const image = new Image();
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    // gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    // gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    gl.generateMipmap(gl.TEXTURE_2D);
  }
  image.src = url;

  return texture;
}


