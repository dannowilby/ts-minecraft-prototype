
import { ExampleState } from "./index";
import { getBlock } from "./chunk/chunk";
import { Matrix4, Vector3 } from "@math.gl/core";
import { System } from "../engine/state";
import { Camera, createCamera } from '../engine/freeCamera';
import {initShaders} from "./render";

export interface SelectionBox {

  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  vertexCount: number;
  model: Matrix4;

};

export interface Player extends Camera {
  rayStep: number;
  rayMaxLength: number;
  selectionBox: SelectionBox;
  previousPosition: Vector3;
};

export const createPlayer = (gl: WebGL2RenderingContext): Player => { 
  const camera = createCamera(gl);
  camera.position = new Vector3(0, 10, 0)
  return ({ 
      rayStep: 0.1,
      rayMaxLength: 5,
      ...camera,
      selectionBox: createSelectionBox(gl),
      previousPosition: new Vector3(-1,-1,-1),
  });
}

export interface RayCastHit {
  position: Vector3;
  previous: Vector3;
};

const createSelectionBox = (gl: WebGL2RenderingContext): SelectionBox => {

  const program = initShaders(gl, boxVertexShader, boxFragmentShader);

  const mesh = new Float32Array([

    0.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
      
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    0.0, 0.0, 0.0,
    0.0, 0.0, 1.0,

    1.0, 1.0, 1.0,
    0.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    1.0, 0.0, 1.0,

    1.0, 1.0, 1.0,
    1.0, 1.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 1.0, 1.0,

    1.0, 0.0, 0.0,
    1.0, 0.0, 1.0,

    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    
    0.0, 1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,

    0.0, 0.0, 1.0,
    0.0, 1.0, 1.0,

  ]);

  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();

  if(!vao)
    throw new Error("Failed creating VAO");
  if(!vbo)
    throw new Error("Failed creating VBO");

  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

  const vertexSize = 3;

  const stride = 4 * 3;
  
  const vertexOffset = 0;

  const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
  gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const vertexCount = mesh.length / 3;

  const model = (new Matrix4()).identity();

  return {
    program,
    vao,
    vertexCount,
    model
  };
};

export const drawSelectionBox = (gl:WebGL2RenderingContext, state: ExampleState): ExampleState => {

    const { program, vao, vertexCount, model: modelMatrix } = state.player.selectionBox;
    const { projection: projectionMatrix, view: viewMatrix } = state.player;

    gl.useProgram(program);

    const projection = gl.getUniformLocation(program, "projection");
    const view = gl.getUniformLocation(program, "view");
    const model = gl.getUniformLocation(program, "model");

    gl.uniformMatrix4fv(projection, false, projectionMatrix);
    gl.uniformMatrix4fv(view, false, viewMatrix);
    gl.uniformMatrix4fv(model, false, modelMatrix);

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.LINES, 0, vertexCount);

    return state;
}

export const rayCast = (gl: WebGL2RenderingContext, state: ExampleState, pos: Vector3, dir: Vector3, rayStep: number, rayMaxLength: number): RayCastHit | null => {

  let ray = new Vector3(pos.x, pos.y, pos.z);

  const step = new Vector3(rayStep * dir.x, rayStep * dir.y, rayStep * dir.z);

  const numSteps = rayMaxLength / rayStep;

  for(let i = 0; i < numSteps; i++) {

    const previous = new Vector3(ray.x, ray.y, ray.z);

    ray.x += step[0];
    if(getBlock(state.chunkFactory, state.components["structures"], ray) != 0)
        return {
          position: ray,
          previous: previous,
        };
    previous.x += step[0];

    ray.y += step[1];
    if(getBlock(state.chunkFactory, state.components["structures"], ray) != 0)
        return {
          position: ray,
          previous: previous,
        };
    previous.y += step[1];

    ray.z += step[2];
    if(getBlock(state.chunkFactory, state.components["structures"], ray) != 0)
        return {
          position: ray,
          previous: previous,
        };

  }

  return null;
}

const boxVertexShader = `#version 300 es
  in vec3 v_Position;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;
  
  void main() {
    
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;

const boxFragmentShader = `#version 300 es
  precision highp float;
  
  out vec4 frag_color;

  void main() {
    frag_color = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;
