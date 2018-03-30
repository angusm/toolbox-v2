import {Vector2d} from './vector-2d';

class Vector3d extends Vector2d {
  constructor(x: number = 0, y: number = 0, z: number = 0, ...args: number[]) {
    super(x, y, z, ...args);
  }

  get z(): number {
    return this.getValues()[2];
  }
}

export {Vector3d};