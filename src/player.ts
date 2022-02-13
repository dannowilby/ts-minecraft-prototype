
import { Vector3, Matrix4 } from '@math.gl/core';
import { Entity, Components } from './state';
import { loadTexture } from './render';

export type Player = {
  projection: Matrix4,
  view: Matrix4,

  position: Vector3,
  direction: Vector3,
  speed: number,

  pitch: number,
  yaw: number,

  atlas: WebGLTexture,

  locked: boolean,
  activeInput: Set<string>
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

export const createPlayer = (gl: WebGL2RenderingContext, atlasUrl: string): Player => {

  const player = {
    projection: projectionMatrix(window.innerWidth, window.innerHeight),
    view: new Matrix4().identity(),
    
    position: new Vector3(0, 0, 1),
    direction: new Vector3(0, 0, -1),
    speed: 10,

    pitch: 0,
    yaw: -90.0,
     
    atlas: loadTexture(gl, atlasUrl),
    
    locked: false,
    activeInput: new Set<string>()
  };

  const lockChangeAlert = () => {
    if (document.pointerLockElement === gl.canvas)
      player.locked = true;
    else
      player.locked = false;
  }
  document.addEventListener('pointerlockchange', lockChangeAlert, false);

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

  window.onkeyup = (e) => {
    player.activeInput.delete(e.key.toLowerCase());
  }

  window.onkeydown = (e) => {
    if(player.locked)
      player.activeInput.add(e.key.toLowerCase());
  }

  if(player.activeInput.has("w"))
      player.position.add(move);
  if(player.activeInput.has("s"))
    player.position.subtract(move);
  if(player.activeInput.has("a"))
    player.position.subtract(strafe);
  if(player.activeInput.has("d"))
    player.position.add(strafe);
  if(player.activeInput.has(" "))
    player.position.add(multiplyAndDestructVector3(up, delta * speed))
  if(player.activeInput.has("shift"))
    player.position.subtract(multiplyAndDestructVector3(up, delta * speed))

  document.onmousemove = (e) => {
    if(player.locked) {
      player.yaw += e.movementX;
      player.pitch -= e.movementY;
    
      if(player.pitch > 89.0)
        player.pitch = 89.0;
      if(player.pitch < -89.0)
        player.pitch = -89.0;
    }
  }

  updateCamera(player);
};
