
import { Vector3  } from '@math.gl/core';
import { chunkId } from '../chunk/chunk';
import { naiveMeshing, sum, calculateAO } from '../chunk/mesh';
import { generateBlock, noise } from '../generation';

// mesh chunk
self.onmessage = (e: MessageEvent<any>) => {

  const chunkPos = e.data.pos; // passed in
  const structures = e.data.structures;
  const chunkFactory = e.data.chunkFactory;

  // generate mesh
  const mesh = naiveMeshing(chunkFactory, structures, chunkPos);
  
  self.postMessage(mesh);

  close();
};
