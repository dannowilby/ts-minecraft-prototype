
import { Vector3 } from "@math.gl/core";
import { ChunkFactory, chunkId, localBlockPosToIndex } from "./chunk/chunk";
import { Structure } from "./components/chunk";
import SimplexNoise from "simplex-noise";

// copy some noise code
export const noise = (x: number, y: number) => {
  return 0.5;
}

export const generateBlock = (chunkFactory: ChunkFactory, pos: Vector3): number => {
  const n = new SimplexNoise("test");
  const chunkSize = chunkFactory.chunkSize;

  const baseHeight = chunkSize / 2;
  const wavelength = chunkSize * 2;
  const height = chunkSize / 4;

  // check for already loaded chunks

  const h = baseHeight + height * n.noise2D(pos[0] / wavelength, pos[2] / wavelength);
  const ran = n.noise3D(pos[0] / wavelength, pos[1] / wavelength, pos[2] / wavelength);

  if(pos[1] < h && ran < 0.4) {

    if(pos[1] == h - 1)
      return 1;
    if(pos[1] > h - 3)
      return 2;

    return 3;
  }
  if(pos[1] > 4 * h)
    return 3;

  return 0;
}

export const generateStructure = (chunkFactory: ChunkFactory, pos: Vector3): Structure => {

  const output = new SharedArrayBuffer(8 * (chunkFactory.chunkSize ** 3))
  const t = new Float64Array(output);

  const entityId = chunkId(pos);
  const chunkSize = chunkFactory.chunkSize;

  const blockPos = new Vector3(pos[0] * chunkSize, pos[1] * chunkSize, pos[2] * chunkSize);

  // set the blocks
  for(let i = 0; i < chunkSize; i++) { // x
    for(let j = 0; j < chunkSize; j++) { // y
      for(let k = 0; k < chunkSize; k++) {  // z

        const gx = blockPos[0] + i;
        const gy = blockPos[1] + j;
        const gz = blockPos[2] + k;

        const l = localBlockPosToIndex(chunkFactory, i,j,k);
        t[l] = generateBlock(chunkFactory, new Vector3(gx, gy, gz));
      }
    }
  }

  return output;
}
