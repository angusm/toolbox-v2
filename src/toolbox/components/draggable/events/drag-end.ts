import {TbEvent} from '../../../utils/event/events/tb-event';
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class DragEnd extends TbEvent {
  private readonly delta_: Vector2d;
  private readonly endVelocity_: Vector2d;

  constructor(target: any, delta: Vector2d, endVelocity: Vector2d) {
    super(target);
    this.delta_ = delta;
    this.endVelocity_ = endVelocity;
  }

  public getDelta(): Vector2d {
    return this.delta_;
  }

  public getEndVelocity(): Vector2d {
    return this.endVelocity_;
  }
}

export {DragEnd};
