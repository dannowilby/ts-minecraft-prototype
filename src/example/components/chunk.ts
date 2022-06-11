
import { Matrix4, Vector3 } from '@math.gl/core';

export type RenderObject = {
  lod: number,
  vertexCount: number,

  program: WebGLProgram,
  vao: WebGLVertexArrayObject,
  model: Matrix4,

  wireframe: boolean,
};

export type Structure = number[][][];

export type ChunkPos = Vector3;
