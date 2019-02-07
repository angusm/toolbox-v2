import {TbEvent} from '../../../utils/event/events/tb-event';
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class DragEnd extends TbEvent {
  readonly endVelocity_: Vector2d;

  constructor(target: any, endVelocity: Vector2d) {
    super(target);
    this.endVelocity_ = endVelocity;
  }

  public getEndVelocity(): Vector2d {
    return this.endVelocity_;
  }
}

export {DragEnd};
