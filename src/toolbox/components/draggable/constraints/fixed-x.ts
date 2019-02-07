import {DraggableConstraint} from './base';
import {IDraggable} from "../interfaces";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {FixedXConstraint} from "../../../utils/math/geometry/2d-constraints/fixed-x";

const fixedXConstraint = new FixedXConstraint();

class DraggableFixedXConstraint extends DraggableConstraint {
  constrain(draggable: IDraggable, delta: Vector2d) {
    return fixedXConstraint.constrain(delta);
  }
}

export {DraggableFixedXConstraint};
