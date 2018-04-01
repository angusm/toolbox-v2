import {Vector2d} from "../../utils/math/geometry/vector-2d";

interface IConstraint {
  constrainDelta(draggable: IDraggable, delta: Vector2d): Vector2d;
}

interface IDraggable {
  getElement(): HTMLElement;
}

export {
  IConstraint,
  IDraggable,
};
