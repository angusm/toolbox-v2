import {TbEvent} from "../../utils/event/events/tb-event";
import {Sticky2ContainerPosition} from "./sticky-2-container-position";
import {Sticky2} from "./sticky-2";

class Sticky2Positioned extends TbEvent {
  private readonly position_: Sticky2ContainerPosition;

  constructor(
    target: Sticky2,
    position: Sticky2ContainerPosition,
  ) {
    super(target);
    this.position_ = Sticky2ContainerPosition;
  }

  getPosition(): Sticky2ContainerPosition{
    return this.position_;
  }
}

export {Sticky2Positioned};
