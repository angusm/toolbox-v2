import {IConstraint2d} from './interface';
import {Vector2d} from '../vector-2d';

class FixedYConstraint implements IConstraint2d {
  constrain(delta: Vector2d) {
    return new Vector2d(delta.x, 0);
  }
}

export {FixedYConstraint};
