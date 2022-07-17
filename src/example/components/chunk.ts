
import { Matrix4, Vector3 } from '@math.gl/core';

export type RenderObject = {
  lod: number,
  vertexCount: number,

  program: WebGLProgram,
  vao: WebGLVertexArrayObject,
  model: Matrix4,

  wireframe: boolean,
};

// if we use numbers as block types
// then the structure will be chunkSize^3 * 8 = 2048 bytes
// since a js number is 8 bytes
export type Structure = SharedArrayBuffer;
export type Mesh = Float32Array;

export type ChunkPos = Vector3;
