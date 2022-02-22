
import { Vector3, Matrix4 } from '@math.gl/core';

import { BlockStructureComponent, StaticRenderObjectComponent } from '../state';
import { chunkSize } from './chunk'; 

export const chunkVertexShader = `#version 300 es

  in vec3 v_Position;
  in vec3 v_Normal;
  in vec2 uv_Coords;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;

  out vec2 text_coords;
  out vec3 n_color;

  void main() {
    text_coords = uv_Coords;
    n_color = v_Normal;
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }

`;

export const chunkFragmentShader = `#version 300 es

  precision highp float;

  in vec2 text_coords;
  in vec3 n_color;

  uniform sampler2D texture_atlas;
  uniform int displayNormals;
  uniform int displayLighting;

  out vec4 frag_color;

  void main() {
    if(displayNormals == 1)
      frag_color = vec4(abs(n_color.xyz), 1.0);
    else
      frag_color = texture(texture_atlas, text_coords);
  }

`;

const vertexLength = 8;

export const createChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram) => (pos: Vector3, mesh: Float32Array): StaticRenderObjectComponent => {

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
  const normalSize = 3;
  const uvSize = 2;

  const stride = 4 * 8;
  
  const vertexOffset = 0;
  const normalOffset = 4 * 3;
  const uvOffset = 6 * 4;

  const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
  gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const normalAttributeLocation = gl.getAttribLocation(program, 'v_Normal');
  gl.vertexAttribPointer(normalAttributeLocation, normalSize, gl.FLOAT, false, stride, normalOffset);
  gl.enableVertexAttribArray(normalAttributeLocation);

  const uvAttributeLocation = gl.getAttribLocation(program, 'uv_Coords');
  gl.vertexAttribPointer(uvAttributeLocation, uvSize, gl.FLOAT, false, stride, uvOffset);
  gl.enableVertexAttribArray(uvAttributeLocation);

  const count = mesh.length / vertexLength;

  const model = new Matrix4();
  model.identity().translate([ pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize ]);

  return {
    vao,
    vbo,
    program,
    model,
    count
  };
};

export const updateChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram) => (previous: StaticRenderObjectComponent, mesh: Float32Array) => {

  const { vao, vbo, program, model, count } = previous;

  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

  previous.count = mesh.length / vertexLength;
};

import { dictionary } from './block';

// pass in all the block data and then return the vertex array
// In the future may implement a greedy algorithm to cut down on
// vertex count
// This sets the vertices/textures/ambient occlusion
export const naiveMeshing = (blockStructure: BlockStructureComponent): Float32Array => {

  // TODO: replace type with more concrete type
  const output: any[] = [];

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {
      for(let k = 0; k < chunkSize; k++) {

        if(blockStructure[i][j][k] == 0)
          continue;

        const block = dictionary[blockStructure[i][j][k]];

        // skip over special blocks for now
        if(block.type != 'fullBlock' || block.type == 'none')
          continue;

        const mesh = fullBlockMeshWithNormals;

        if(i == 0 || blockStructure[i - 1][j][k] == 0)
          output.push(...mesh.westFace(i, j, k, block.u, block.v))
        if(i == chunkSize - 1 || blockStructure[i + 1][j][k] == 0)
          output.push(...mesh.eastFace(i, j, k, block.u, block.v))

        if(j == 0 || blockStructure[i][j - 1][k] == 0)
          output.push(...mesh.bottomFace(i, j, k, block.u, block.v))
        if(j == chunkSize - 1 || blockStructure[i][j + 1][k] == 0)
          output.push(...mesh.topFace(i, j, k, block.u, block.v))

        if(k == 0 || blockStructure[i][j][k - 1] == 0)
          output.push(...mesh.southFace(i, j, k, block.u, block.v))
        if(k == chunkSize - 1 || blockStructure[i][j][k + 1] == 0)
          output.push(...mesh.northFace(i, j, k, block.u, block.v))

      }
    }
  }
  return new Float32Array(output);
}


// TODO: replace 0.0625 with texel dimensions
export const fullBlockMesh = {

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

// TODO: replace 0.0625 with texel dimensions
export const fullBlockMeshWithNormals = {

  southFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u, v,
    1.0 + x, 1.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u + 0.0625, v,
    0.0 + x, 0.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u, v,
    0.0 + x, 1.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u, v + 0.0625,
    1.0 + x, 1.0 + y, 0.0 + z, 0.0, 0.0, -1.0, u + 0.0625, v + 0.0625
  ]),

  northFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u, v,
    1.0 + x, 0.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u, v + 0.0625,
    1.0 + x, 1.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u + 0.0625, v + 0.0625,
    0.0 + x, 1.0 + y, 1.0 + z, 0.0, 0.0, 1.0, u, v + 0.0625
  ]),

  westFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, -1.0, 0.0, 0.0, u, v,
    0.0 + x, 0.0 + y, 1.0 + z, -1.0, 0.0, 0.0, u, v + 0.0625,
    0.0 + x, 1.0 + y, 1.0 + z, -1.0, 0.0, 0.0, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 0.0 + z, -1.0, 0.0, 0.0, u, v,
    0.0 + x, 1.0 + y, 1.0 + z, -1.0, 0.0, 0.0, u + 0.0625, v + 0.0625,
    0.0 + x, 1.0 + y, 0.0 + z, -1.0, 0.0, 0.0, u + 0.0625, v
  ]),

  eastFace: (x, y, z, u, v) => ([
    1.0 + x, 0.0 + y, 0.0 + z, 1.0, 0.0, 0.0, u, v,
    1.0 + x, 1.0 + y, 0.0 + z, 1.0, 0.0, 0.0, u + 0.0625, v,
    1.0 + x, 1.0 + y, 1.0 + z, 1.0, 0.0, 0.0, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 0.0 + z, 1.0, 0.0, 0.0, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, 1.0, 0.0, 0.0, u + 0.0625, v + 0.0625,
    1.0 + x, 0.0 + y, 1.0 + z, 1.0, 0.0, 0.0, u, v + 0.0625 
  ]),

  topFace: (x, y, z, u, v) => ([
    0.0 + x, 1.0 + y, 0.0 + z, 0.0, 1.0, 0.0, u, v,
    1.0 + x, 1.0 + y, 1.0 + z, 0.0, 1.0, 0.0, u + 0.0625, v + 0.0625,
    1.0 + x, 1.0 + y, 0.0 + z, 0.0, 1.0, 0.0, u + 0.0625, v,
    0.0 + x, 1.0 + y, 0.0 + z, 0.0, 1.0, 0.0, u, v,
    0.0 + x, 1.0 + y, 1.0 + z, 0.0, 1.0, 0.0, u, v + 0.0625,
    1.0 + x, 1.0 + y, 1.0 + z, 0.0, 1.0, 0.0, u + 0.0625, v + 0.0625
  ]),

  bottomFace: (x, y, z, u, v) => ([
    0.0 + x, 0.0 + y, 0.0 + z, 0.0, -1.0, 0.0, u, v,
    1.0 + x, 0.0 + y, 0.0 + z, 0.0, -1.0, 0.0, u + 0.0625, v,
    1.0 + x, 0.0 + y, 1.0 + z, 0.0, -1.0, 0.0, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 0.0 + z, 0.0, -1.0, 0.0, u, v,
    1.0 + x, 0.0 + y, 1.0 + z, 0.0, -1.0, 0.0, u + 0.0625, v + 0.0625,
    0.0 + x, 0.0 + y, 1.0 + z, 0.0, -1.0, 0.0, u, v + 0.0625
  ]),
};
