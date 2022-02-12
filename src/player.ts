
import { Vector3, Matrix4 } from '@math.gl/core';
import { Entity, Components } from './state';

export type Player = {
  projection: Matrix4,
  view: Matrix4,
  position: Vector3,
  velocity: Vector3,
  direction: Vector3,
  pitch: number,
  yaw: number,
  locked: boolean
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

export const createPlayer = (): Player => {

  const player = {
    projection: projectionMatrix(window.innerWidth, window.innerHeight),
    view: new Matrix4().identity(),
    position: new Vector3(0, 0, 1),
    velocity: new Vector3(0, 0, 0),
    direction: new Vector3(0, 0, -1),
    pitch: 0,
    yaw: -90.0,
    locked: false
  };

  updateCamera(player);

  return player;
};

export const updateCamera = (player: Player) => {

  const pos = player.position;
  const dir = player.direction;

  const pitch = radians(player.pitch);
  const yaw = radians(player.yaw);

  dir.x = Math.cos(yaw) * Math.cos(pitch);
  dir.y = Math.sin(pitch);
  dir.z = Math.sin(yaw) * Math.cos(pitch);

  player.view.lookAt(
    [ pos.x, pos.y, pos.z ],
    [ pos.x + dir.x, pos.y + dir.y, pos.z + dir.z ],
    [ 0, 1.0, 0 ]
  );

};

const radians = (n: number) => {
  return (n * Math.PI) / 180.0;
}

const multiplyAndDestructVector3 = (vec: Vector3, m: number) => {
  return [ vec.x * m, vec.y * m, vec.z * m ];
}

const functionalCrossVector3 = (v1: Vector3, v2: Vector3) => {

  const v = new Vector3(v1.x, v1.y, v1.z);
  return v.cross([ v2.x, v2.y, v2.z ]).normalize();
};

export const cameraInput = (gl: WebGL2RenderingContext, player: Player, entities: Entity[], components: Components, delta: number) => {

  const speed = 10;

  const up = new Vector3(0, 1, 0);
  const move = multiplyAndDestructVector3(player.direction, speed * delta);
  const strafe = multiplyAndDestructVector3(functionalCrossVector3(player.direction, up), speed * delta);

  window.onkeydown = (e) => {
    
    if(e.key == "w")
      player.position.add(move);
    if(e.key == "s")
      player.position.subtract(move);
    if(e.key == "a")
      player.position.subtract(strafe);
    if(e.key == "d")
      player.position.add(strafe);

    updateCamera(player);
  }

  document.onmousemove = (e) => {
    if(player.locked) {
      player.yaw += e.movementX;
      player.pitch -= e.movementY;
    
      if(player.pitch > 89.0)
        player.pitch = 89.0;
      if(player.pitch < -89.0)
        player.pitch = -89.0;

      updateCamera(player);
    }
  }

};
