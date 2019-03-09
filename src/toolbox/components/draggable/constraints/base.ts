import {IDraggable, IDraggableConstraint} from "../interfaces";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class DraggableConstraint implements IDraggableConstraint {
  constrain(draggable: IDraggable, delta: Vector2d) {
    console.warn('constrain is not overridden from base case');
    return delta;
  }

  static applyConstraints(
    draggable: IDraggable,
    delta: Vector2d,
    constraints: IDraggableConstraint[]
  ) {
    return constraints.reduce(
      (result, constraint) => constraint.constrain(draggable, result), delta);
  }
}

export {DraggableConstraint};
