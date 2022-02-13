
import { fullBlockMesh } from './mesh';

export const dictionary = {

  0: {
    name: 'air',
    type: 'none',
    mesh: fullBlockMesh,
    u: 0,
    v: 0
  },

  1: {
    name: 'dirt',
    type: 'fullBlock',
    mesh: fullBlockMesh,
    u: 0.125,
    v: 0
  },

  2: {
    name: 'stone',
    type: 'fullBlock',
    mesh: fullBlockMesh,
    u: 0.0625,
    v: 0
  },

};

