
import { Vector3, Matrix4 } from '@math.gl/core';

export type Player = {
  projection: Matrix4,
  view: Matrix4,
  position: Vector3,
  velocity: Vector3
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

export const createPlayer = (): Player => ({
  projection: projectionMatrix(window.innerWidth, window.innerHeight),
  view: new Matrix4().lookAt(
    [ 0, 0, 1 ],
    [ 0, 0, 0 ],
    [ 0, 1, 0 ]
  ),
  position: new Vector3(0, 0, 1),
  velocity: new Vector3(0, 0, 0)
});

