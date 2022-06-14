
import { Vector3, Matrix4 } from '@math.gl/core';

import { ExampleState } from './index';
import { Structure } from './components/chunk';
import { ChunkFactory, chunkId, generateStructure, generateBlock } from './chunk';
import { RenderObject } from './components/chunk';
import {addComponent, newEntity} from '../engine/ec';

export const chunkVertexShader = `#version 300 es
  in vec3 v_Position;
  in vec2 uv_Coords;
  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;
  out vec2 text_coords;
  void main() {
    text_coords = uv_Coords;
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;

export const chunkFragmentShader = `#version 300 es
  precision highp float;
  in vec2 text_coords;
  uniform sampler2D texture_atlas;
  out vec4 frag_color;
  void main() {
    frag_color = texture(texture_atlas, text_coords);
  }
`;

export const createChunkRenderObject = (gl: WebGL2RenderingContext, chunkFactory: ChunkFactory, pos: Vector3, mesh: Float32Array): RenderObject => {

  const chunkSize = chunkFactory.chunkSize;
  const program = chunkFactory.program;

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
  const uvSize = 2;

  const stride = 4 * 5;
  
  const vertexOffset = 0;
  const uvOffset = 4 * 3;

  const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
  gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const uvAttributeLocation = gl.getAttribLocation(program, 'uv_Coords');
  gl.vertexAttribPointer(uvAttributeLocation, uvSize, gl.FLOAT, false, stride, uvOffset);
  gl.enableVertexAttribArray(uvAttributeLocation);

  const count = mesh.length / 5;

  const model = new Matrix4();
  model.identity().translate([ pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize ]);

  return {
    lod: 0,
    vao,
    program,
    model,
    vertexCount: count,

    wireframe: false
  };
};

/*
export const updateChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram) => (previous: StaticRenderObjectComponent, mesh: Float32Array) => {

  const { vao, vbo, program, model, count } = previous;

  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

  previous.count = mesh.length / 5;
};
*/

const sum = (a: Vector3, b: number[]): Vector3 => {
  return new Vector3([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
}

// pass in all the block data and then return the vertex array
// In the future may implement a greedy algorithm to cut down on
// vertex count
// This sets the vertices/textures/ambient occlusion
export const naiveMeshing = (state: ExampleState, pos: Vector3): Float32Array => {

  const output: any[] = [];

  const chunkSize = state.chunkFactory.chunkSize;
  const structures = state.components["structures"];
  const blockStructure = structures.get(chunkId(pos));

  const dict = state.blockDictionary;

  const startPos = new Vector3(pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize);

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {
      for(let k = 0; k < chunkSize; k++) {

        if(blockStructure[i][j][k] == 0)
          continue;

        const blockPos = sum(startPos, ([i, j, k]));

        if(generateBlock(state, blockPos) == 0)
          continue;

        const block = dict[generateBlock(state, blockPos)];

        if(generateBlock(state, sum(blockPos, ([ 1, 0, 0 ]))) == 0)
          output.push(...block.mesh.eastFace(i, j, k, block.u, block.v));

        if(generateBlock(state, sum(blockPos, ([ -1, 0, 0 ]))) == 0)
          output.push(...block.mesh.westFace(i, j, k, block.u, block.v));

        if(generateBlock(state, sum(blockPos, ([ 0, 1, 0 ]))) == 0)
          output.push(...block.mesh.topFace(i, j, k, block.u, block.v));

        if(generateBlock(state, sum(blockPos, ([ 0, -1, 0 ]))) == 0)
          output.push(...block.mesh.bottomFace(i, j, k, block.u, block.v));

        if(generateBlock(state, sum(blockPos, ([ 0, 0, 1 ]))) == 0)
          output.push(...block.mesh.northFace(i, j, k, block.u, block.v));

        if(generateBlock(state, sum(blockPos, ([ 0, 0, -1 ]))) == 0)
          output.push(...block.mesh.southFace(i, j, k, block.u, block.v));

        // skip over special blocks for now
        // if(block.type != 'fullBlock' || block.type == 'none')
        //  continue;
      }
    }
  }
  return new Float32Array(output);
}

export type Mesh = {
  southFace: (x: number, y: number, z: number, u: number, v:number) => number[],
  northFace: (x: number, y: number, z: number, u: number, v:number) => number[],
  eastFace: (x: number, y: number, z: number, u: number, v:number) => number[],
  westFace: (x: number, y: number, z: number, u: number, v:number) => number[],
  topFace: (x: number, y: number, z: number, u: number, v:number) => number[],
  bottomFace: (x: number, y: number, z: number, u: number, v:number) => number[],
};

// TODO: replace 0.0625 with texel dimensions
export const fullBlockMesh: Mesh = {

  southFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    1.0 + x, 1.0 + y, 0.0 + z, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 0.0 + z, u + 0.0625, v,
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    0.0 + x, 1.0 + y, 0.0 + z, u, v + 0.0625,
    1.0 + x, 1.0 + y, 0.0 + z, u + 0.0625, v + 0.0625
  ]),

  northFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 1.0 + z, u, v,
    1.0 + x, 0.0 + y, 1.0 + z, u, v + 0.0625,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 1.0 + z, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 1.0 + y, 1.0 + z, u, v + 0.0625
  ]),

  westFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    0.0 + x, 0.0 + y, 1.0 + z, u, v + 0.0625,
    0.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    0.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 1.0 + y, 0.0 + z, u + 0.0625, v
  ]),

  eastFace: (x, y, z, u, v) => ([
    1.0 + x, 0.0 + y, 0.0 + z, u, v,
    1.0 + x, 1.0 + y, 0.0 + z, u + 0.0625, v,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 0.0 + z, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 1.0 + z, u, v + 0.0625 
  ]),

  topFace: (x, y, z, u, v) => ([
    0.0 + x, 1.0 + y, 0.0 + z, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    1.0 + x, 1.0 + y, 0.0 + z, u + 0.0625, v,
    0.0 + x, 1.0 + y, 0.0 + z, u, v,
    0.0 + x, 1.0 + y, 1.0 + z, u, v + 0.0625,
    1.0 + x, 1.0 + y, 1.0 + z, u + 0.0625, v + 0.0625
  ]),

  bottomFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    1.0 + x, 0.0 + y, 0.0 + z, u + 0.0625, v,
    1.0 + x, 0.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 0.0 + z, u, v,
    1.0 + x, 0.0 + y, 1.0 + z, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 1.0 + z, u, v + 0.0625
  ]),
};
