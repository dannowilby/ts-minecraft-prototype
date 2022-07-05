
import { Matrix4, Vector3 } from '@math.gl/core';

export const radians = (n: number) => {
  return (n * Math.PI) / 180.0;
}

export const multiplyAndDestructVector3 = (vec: Vector3, m: number) => {
  return [ vec.x * m, vec.y * m, vec.z * m ];
}

export const functionalCrossVector3 = (v1: Vector3, v2: Vector3) => {

  const v = new Vector3(v1.x, v1.y, v1.z);
  return v.cross([ v2.x, v2.y, v2.z ]).normalize();
};

export const projectionMatrix = (w: number, h: number): Matrix4 => (
  new Matrix4().perspective({
      fov: 70,
      fovy: (Math.PI * 70) / 180,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 100.0
    })
); 

export const floorVector = (pos: Vector3) => (
  new Vector3(
    Math.floor(pos.x),
    Math.floor(pos.y),
    Math.floor(pos.z)
  )
)
