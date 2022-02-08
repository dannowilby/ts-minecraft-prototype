
import { Vector3, Matrix4 } from '@math.gl/core';

export type Player = {
  projection: Matrix4,
  view: Matrix4,
  position: Vector3,
  velocity: Vector3
};

export const createPlayer = (w: number, h: number): Player => ({
  projection: new Matrix4().perspective({
    fov: 70,
    fovy: (Math.PI * 70) / 180,
    aspect: w / h,
    near: 0.1,
    far: 100.0
  }),
  view: new Matrix4().lookAt(
    [ 0, 0, 1 ],
    [ 0, 0, 0 ],
    [ 0, 1, 0 ]
  ),
  position: new Vector3(0, 0, 1),
  velocity: new Vector3(0, 0, 0)
});

