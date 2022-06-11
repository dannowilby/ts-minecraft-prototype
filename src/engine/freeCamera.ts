
import { Vector3, Matrix4 } from '@math.gl/core';
import { radians, multiplyAndDestructVector3, functionalCrossVector3 } from '../lib/math';

import { loadTexture } from '../render';
import { State } from './state';

export type Camera = {
  projection: Matrix4,
  view: Matrix4,

  position: Vector3,
  direction: Vector3,
  speed: number,

  pitch: number,
  yaw: number,

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

export const createCamera = (gl: WebGL2RenderingContext): Camera => {

  const camera = {
    projection: projectionMatrix(window.innerWidth, window.innerHeight),
    view: new Matrix4().identity(),
    
    position: new Vector3(0, 0, 1),
    direction: new Vector3(0, 0, -1),
    speed: 10,

    pitch: 0,
    yaw: -90.0,
     
    // atlas: loadTexture(gl, atlasUrl),
    
    // activeInput: new Set<string>()
  };

  // updateCamera(player);
  window.onresize = onResize(gl, camera);

  return camera;
};

const onResize = (gl: WebGLRenderingContext, camera: Camera) => () => {
  const w = window.innerWidth, h = window.innerHeight;
  
  gl.canvas.width = w;
  gl.canvas.height = h;
  gl.viewport(0, 0, w, h);
  
  camera.projection = projectionMatrix(w, h);
}


export const recalculateView = (camera: Camera): Camera => {

  const pos = camera.position;
  const dir = camera.direction;

  const pitch = radians(camera.pitch);
  const yaw = radians(camera.yaw);

  dir.x = Math.cos(yaw) * Math.cos(pitch);
  dir.y = Math.sin(pitch);
  dir.z = Math.sin(yaw) * Math.cos(pitch);

  camera.view.lookAt(
    [ pos.x, pos.y, pos.z ],
    [ pos.x + dir.x, pos.y + dir.y, pos.z + dir.z ],
    [ 0, 1.0, 0 ]
  );

  return camera;
};

/*
const rayTrace = (entities: Entity[], components: Components, player: Player) => (stepValue: number, numSteps: number) => (onHit: (pos: Vector3) => void) => {

  const step = multiplyAndDestructVector3(player.direction, stepValue);
  const ray = new Vector3(player.position.x, player.position.y, player.position.z);

  for(let i = 0; i < numSteps; i++) {
    
    if(getBlock(entities, components)(ray) != 0) {
      onHit(ray);
      return;
    }

    ray.x = ray.x + step[0];
    ray.y = ray.y + step[1];
    ray.z = ray.z + step[2];
  }

};
*/


export const freeCameraInput = (camera: Camera, state: State, delta: number): Camera => {

  const activeInput = state.activeInput;
  const mouseMovement = state.mouseMovement;
  const lock = state.lock;

  if(!lock)
    return camera;

  const speed = camera.speed;

  const up = new Vector3(0, 1, 0);
  const move = multiplyAndDestructVector3(camera.direction, speed * delta);
  const strafe = multiplyAndDestructVector3(functionalCrossVector3(camera.direction, up), speed * delta);

  if(activeInput.has("w"))
    camera.position.add(move);
  if(activeInput.has("s"))
    camera.position.subtract(move);
  if(activeInput.has("a"))
    camera.position.subtract(strafe);
  if(activeInput.has("d"))
    camera.position.add(strafe);
  if(activeInput.has(" "))
    camera.position.add(multiplyAndDestructVector3(up, delta * speed))
  if(activeInput.has("shift"))
    camera.position.subtract(multiplyAndDestructVector3(up, delta * speed))

  camera.yaw += mouseMovement[0];
  camera.pitch -= mouseMovement[1];
    
  if(camera.pitch > 89.0)
    camera.pitch = 89.0;
  if(camera.pitch < -89.0)
    camera.pitch = -89.0;

  return recalculateView(camera);

  /*
  document.onclick = (e) => {

    rayTrace(entities, components, player)(0.05, 100)((pos: Vector3) => {
      setBlock(entities, components)(pos, 0);
      updateChunk(gl, entities, components)(pos);
    });
  }
  */

};
