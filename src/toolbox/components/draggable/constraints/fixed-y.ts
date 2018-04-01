import {Constraint} from './base';
import {IDraggable} from "../interfaces";
import {Vector2d} from '../../../utils/math/geometry/vector-2d';

class FixedYConstraint extends Constraint {
  constrainDelta(draggable: IDraggable, delta: Vector2d) {
    return new Vector2d(0, delta.y);
  }
}

export {FixedYConstraint};
