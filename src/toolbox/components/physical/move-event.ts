import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {TbEvent} from "../../utils/event/events/tb-event";

class Move extends TbEvent {
  readonly element_: HTMLElement;
  readonly distanceMoved_: Vector2d;
  readonly velocity_: Vector2d;

  constructor(
    target: any,
    element: HTMLElement,
    distanceMoved: Vector2d,
    velocity: Vector2d,
  ) {
    super(target);
    this.element_ = element;
    this.distanceMoved_ = distanceMoved;
    this.velocity_ = velocity;
  }

  getElement(): HTMLElement {
    return this.element_;
  }

  getDistanceMoved(): Vector2d {
    return this.distanceMoved_;
  }

  getVelocity(): Vector2d {
    return this.velocity_;
  }
}

export {Move};
