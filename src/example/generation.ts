
import { Vector3 } from "@math.gl/core";
import { ChunkFactory, chunkId, localBlockPosToIndex } from "./chunk/chunk";
import { Structure } from "./components/chunk";


// copy some noise code
export const noise = (x: number, y: number) => {
  return 0.5;
}

export const generateBlock = (chunkFactory: ChunkFactory, pos: Vector3): number => {
  const chunkSize = chunkFactory.chunkSize;

  const baseHeight = chunkSize / 2;
  const wavelength = chunkSize * 2;
  const height = chunkSize / 4;

  // check for already loaded chunks

  const h = baseHeight + height * noise(pos[0] / wavelength, pos[2] / wavelength);

  if(pos[1] < 0)
    return 1;
  if(pos[1] < h || pos[1] > 2 * h)
    return 2;

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
        //console.log(l);
        t[l] = generateBlock(chunkFactory, new Vector3(gx, gy, gz));
      }
    }
  }

  return output;
}
