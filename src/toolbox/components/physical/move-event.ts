import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {TbEvent} from "../../utils/event/events/tb-event";

class Move extends TbEvent {
  readonly element_: HTMLElement;
  readonly vector_: Vector2d;

  constructor(target: any, element: HTMLElement, vector: Vector2d) {
    super(target);
    this.element_ = element;
    this.vector_ = vector;
  }

  getElement(): HTMLElement {
    return this.element_;
  }

  getVector(): Vector2d {
    return this.vector_;
  }
}

export {Move};
