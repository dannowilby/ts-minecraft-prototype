

import { Mesh } from './mesh';

export type Block = {
  name: string,
  type: string,
  mesh: Mesh,
  u: number,
  v: number,
};

export type BlockDictionary = Block[];
