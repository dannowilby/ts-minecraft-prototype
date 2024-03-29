
import { Vector3, Matrix4 } from '@math.gl/core';

import { ExampleState } from '../index';
import { Structure } from '../components/chunk';
import { ChunkFactory, chunkId, getBlock, localBlockPosToIndex } from './chunk';
import { RenderObject } from '../components/chunk';
import { addComponent, newEntity, EntityId } from '../../engine/ec';

export const chunkVertexShader = `#version 300 es
  in vec3 v_Position;
  in vec2 uv_Coords;
  in float ao_Coords;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;
  
  out float ao;
  out vec3 fog_depth;
  out vec2 text_coords;
  
  void main() {
    
    text_coords = uv_Coords;
    ao = ao_Coords;
    
    fog_depth = (view * model * vec4(v_Position, 1.0)).xyz;

    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;

export const chunkFragmentShader = `#version 300 es
  precision highp float;
  
  in vec2 text_coords;
  in float ao;
  in vec3 fog_depth;
  
  uniform sampler2D texture_atlas;
  
  out vec4 frag_color;

  void main() {
    
    float aoIntensity = ao / 2.0;
    float darkenAmount = 1.0 / (aoIntensity + 1.0);
    
    vec4 atlas = texture(texture_atlas, text_coords);

    float fog_near = 18.0;
    float fog_far = 24.0;
    float fog_amount = smoothstep(fog_near, fog_far, length(fog_depth));
    vec4 fog_color = vec4(1.0);

    frag_color = mix(vec4(darkenAmount * atlas.xyz, atlas.w), fog_color, fog_amount);
  }
`;

export const createChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram, chunkFactory: ChunkFactory, pos: Vector3, mesh: Float32Array): RenderObject => {

  const chunkSize = chunkFactory.chunkSize;

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
  const aoSize = 1;

  const stride = 4 * (vertexSize + uvSize + aoSize);
  
  const vertexOffset = 0;
  const uvOffset = 4 * 3;
  const aoOffset = 4 * 5;

  const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
  gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
  gl.enableVertexAttribArray(positionAttributeLocation);

  const uvAttributeLocation = gl.getAttribLocation(program, 'uv_Coords');
  gl.vertexAttribPointer(uvAttributeLocation, uvSize, gl.FLOAT, false, stride, uvOffset);
  gl.enableVertexAttribArray(uvAttributeLocation);

  const aoAttributeLocation = gl.getAttribLocation(program, 'ao_Coords');
  gl.vertexAttribPointer(aoAttributeLocation, aoSize, gl.FLOAT, false, stride, aoOffset);
  gl.enableVertexAttribArray(aoAttributeLocation);

  const count = mesh.length / 6;

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

export const sum = (a: Vector3, b: number[]): Vector3 => {
  return new Vector3([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
}


export const calculateAO = (side1: number, corner1: number, side2: number, corner2: number, side3: number, corner3: number, side4: number, corner4: number) => {

 let v1 = (side1 && 1) + (side2 && 1) + (corner1 && 1);
 let v2 = (side2 && 1) + (side3 && 1) + (corner2 && 1);
 let v3 = (side3 && 1) + (side4 && 1) + (corner3 && 1);
 let v4 = (side4 && 1) + (side1 && 1) + (corner4 && 1);

 return [ v1, v2, v3, v4 ];
};

// pass in all the block data and then return the vertex array
// In the future may implement a greedy algorithm to cut down on
// vertex count
// This sets the vertices/textures/ambient occlusion
export const naiveMeshing = (chunkFactory: ChunkFactory, structures: Map<EntityId, Structure>, pos: Vector3): Float32Array => {

  const output: any[] = [];
  //console.log(structures);

  const cId = `chu-${pos[0]}-${pos[1]}-${pos[2]}`;
  //console.log(cId);
  const chunkSize = chunkFactory.chunkSize;
  const blockStructure = structures.get(cId);

  if(!blockStructure) {
    return new Float32Array();
  }

  const dict = chunkFactory.blockDictionary;

  const startPos = new Vector3(pos[0] * chunkSize, pos[1] * chunkSize, pos[2] * chunkSize);

  for(let i = 0; i < chunkSize; i++) {
    for(let j = 0; j < chunkSize; j++) {
      for(let k = 0; k < chunkSize; k++) {

        //if(i == 0 && j == 0 && k == 0)
        //  console.log("Did we get here? 1")
        
        const blockPos = sum(startPos, ([i, j, k]));

        if(getBlock(chunkFactory, structures, blockPos) == 0)
          continue;

        if(getBlock(chunkFactory, structures, blockPos) == 0)
          continue;

        const blockId = getBlock(chunkFactory, structures, blockPos);
        const block = dict[blockId];

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ 1, 0, 0 ]))) == 0)
          output.push(
            ...fullBlockMesh.eastFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v,
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 0, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 0,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1,-1 ])) // corner
              )
            ));

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ -1, 0, 0 ]))) == 0)
          output.push(
            ...fullBlockMesh.westFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v,
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 0, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 0,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1,-1 ])) // corner
              )
        ));

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ 0, 1, 0 ]))) == 0)
          output.push(
            ...fullBlockMesh.topFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v, 
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0, 1, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0, 1,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1,-1 ])) // corner
              )
            ));

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ 0, -1, 0 ]))) == 0)
          output.push(
            ...fullBlockMesh.bottomFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v, 
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0,-1, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1, 0 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0,-1,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1,-1 ])) // corner
              )
            ));

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ 0, 0, 1 ]))) == 0)
          output.push(
            ...fullBlockMesh.northFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v,
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 0, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0, 1, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 0, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1, 1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0,-1, 1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1, 1 ])) // corner
              )


            ));

        if(getBlock(chunkFactory, structures, sum(blockPos, ([ 0, 0, -1 ]))) == 0)
          output.push(
            ...fullBlockMesh.southFace(
              i, 
              j, 
              k, 
              block.u, 
              block.v,
              calculateAO(
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 0,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1, 1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0, 1,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [-1, 0,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [-1,-1,-1 ])), // corner
                getBlock(chunkFactory, structures, sum(blockPos, [ 0,-1,-1 ])), // side
                getBlock(chunkFactory, structures, sum(blockPos, [ 1,-1,-1 ])) // corner
              )


            ));

        // skip over special blocks for now
        // if(block.type != 'fullBlock' || block.type == 'none')
        //  continue;
      }
    }
  }

  //console.log("In meshing");
  //console.log(output);

  return new Float32Array(output);
}

export type Mesh = {
  southFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
  northFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
  eastFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
  westFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
  topFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
  bottomFace: (x: number, y: number, z: number, u: number, v:number, ao: number[]) => number[],
};

// texture offsets so that there are no borders from how sampling the texture
const textureWidthOffset = 0.0625;
const textureWidthStart = 0.00;

// TODO: replace textureWidthOffset with texel dimensions
export const fullBlockMesh: Mesh = {

  southFace: (x, y, z, u, v, ao) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1],
    1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0]
  ]),

  northFace: (x, y, z, u, v, ao) => ([
    0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[3],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
  ]),

  westFace: (x, y, z, u, v, ao) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1],
    0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3]
  ]),

  eastFace: (x, y, z, u, v, ao) => ([
    1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
  ]),

  topFace: (x, y, z, u, v, ao) => ([
    0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2], // ao[1],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0], // ao[3],
    1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3], // ao[0],
    0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2], // ao[1],
    0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1], // ao[2],
    1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0] // ao[3]
  ]),

  bottomFace: (x, y, z, u, v, ao) => ([
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
    1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
    1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2], 
    1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
    0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
  ]),
};
