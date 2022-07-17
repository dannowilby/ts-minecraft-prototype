import { Vector3 } from "@math.gl/core";

// air = null

interface Test<T> {

  data: T;
  full: boolean;

}

interface Node<T> {
  data: T;
  children: (Node<T> | null)[];
  full: boolean;
}
export { Node as Octree };

const createOctree = <T>(): Node<T> => {
  
  return {
    data: null,
    children: [],
    full: true,
  };
}

const isLeaf = <T>(node: Node<T>): boolean => {
  return node.children.filter(n => n != null).length == 0;
}

const traverse = <T>(tree: Node<T>, pos: Vector3, size: number, depth: number): Node<T> => {

  if(tree == null || isLeaf(tree) || depth == 0)
    return tree;

  const indexPos = new Vector3(
    Math.floor(pos.x / (size / 2)),
    Math.floor(pos.y / (size / 2)),
    Math.floor(pos.z / (size / 2))
  );

  const nextPos = new Vector3(
    pos.x,
    pos.y,
    pos.z
  );
  
  let index = 0;

  if(indexPos.y != 0) {
    index += 4;
    nextPos.y -= (size / 2);
  }

  if(indexPos.x != 0) {
    index += 1;
    nextPos.x -= (size / 2);
  }

  if(indexPos.z != 0) {
    index += 2;
    nextPos.z -= (size / 2);
  }
  
  const n = tree.children[index];
  
  return traverse(n, nextPos, size / 2, depth--);
}

const get = <T>(tree: Node<T>, pos: Vector3, size: number): T => {

  const { data } = traverse(tree, pos, size, 4);

  return data;
}

const set = <T>(tree: Node<T>, pos: Vector3, data: T) => {



}
