import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {TbEvent} from "../../utils/event/events/tb-event";
import {Physical2d} from "./physical-2d";

class Move2d extends TbEvent {
  private readonly distanceMoved_: Vector2d;

  constructor(
    target: Physical2d,
    distanceMoved: Vector2d,
  ) {
    super(target);
    this.distanceMoved_ = distanceMoved;
  }

  getDistanceMoved(): Vector2d {
    return this.distanceMoved_;
  }
}

export {Move2d};
