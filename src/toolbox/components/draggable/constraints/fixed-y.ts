import {DraggableConstraint} from './base';
import {IDraggable} from "../interfaces";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {FixedYConstraint} from "../../../utils/math/geometry/2d-constraints/fixed-y";

const fixedYConstraint = new FixedYConstraint();

class DraggableFixedYConstraint extends DraggableConstraint {
  constrain(draggable: IDraggable, delta: Vector2d) {
    return fixedYConstraint.constrain(delta);
  }
}

export {DraggableFixedYConstraint};
