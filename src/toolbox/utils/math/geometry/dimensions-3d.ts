import {Vector2d} from'./vector-2d';

class Dimensions3D extends Vector2d {
  constructor(width: number, height: number, depth: number) {
    super(width, height, depth);
  }

  get depth(): number {
    return this.getValues()[2];
  }
}

export {Dimensions3D};
