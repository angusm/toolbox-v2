import {Vector2d} from "../../utils/math/geometry/vector-2d";

interface IDraggableConstraint {
  constrain(draggable: IDraggable, delta: Vector2d): Vector2d;
}

interface IDraggable {
  getElement(): HTMLElement;
}

export {
  IDraggableConstraint,
  IDraggable,
};
