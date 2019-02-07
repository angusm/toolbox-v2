import {IConstraint2d} from './interface';
import {Vector2d} from '../vector-2d';

class FixedXConstraint implements IConstraint2d {
  public constrain(delta: Vector2d) {
    return new Vector2d(0, delta.y);
  }
}

export {FixedXConstraint};
