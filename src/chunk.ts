
import { Vector3, Matrix4 } from '@math.gl/core';

import { Entity, Components, StaticRenderObjectComponent } from './state';
import { initShaders } from './render';

const chunkSize = 8;

export const initChunks = (gl: WebGL2RenderingContext, entities: Entity[], components: Components) => {

  const program = initShaders(gl, chunkVertexShader, chunkFragmentShader);

  const component = createChunkRenderObject(gl, program)(new Vector3(0, 0, 0), new Float32Array([
    0.0, 0.0, 0.0,
    0.5, 0.5, 0.0,
    0.5, 0.0, 0.0
  ]));
  // component.model.translate([ 0, 0, 0.5 ]);

  const id = "chu-test-0-0-0";
  const componentName = "staticRenderObjects";

  entities.push({ id, components: [ componentName ] });
  components[componentName].set(id, component);

};


const chunkVertexShader = `#version 300 es

  in vec3 v_Position;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;

  void main() {
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }

`;

const chunkFragmentShader = `#version 300 es

  precision highp float;

  out vec4 frag_color;

  void main() {
    frag_color = vec4(1.0, 0.0, 0.0, 1.0);
  }

`;

const createChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram) => (pos: Vector3, mesh: Float32Array): StaticRenderObjectComponent => {

  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();

  if(!vao)
    throw new Error("Failed creating VAO");

  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

  const size   = 3;
  const stride = 4 * 3;
  const offset = 0;

  const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
  gl.vertexAttribPointer(positionAttributeLocation, size, gl.FLOAT, false, stride, offset);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const count = mesh.length / 3;

  const model = new Matrix4();
  model.identity().translate([ pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize ]);

  return {
    vao,
    program,
    model,
    count
  };
};
