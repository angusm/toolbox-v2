import {IConstraint, IDraggable} from "../interfaces";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class Constraint implements IConstraint{
  constrainDelta(draggable: IDraggable, delta: Vector2d) {
    console.warn('constrainDelta is not overridden from base case');
    return delta;
  }
}

export {Constraint};
