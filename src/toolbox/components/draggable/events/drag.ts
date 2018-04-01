import {IDraggable} from "../interfaces";
import {TbEvent} from '../../../utils/event/tb-event';
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class Drag extends TbEvent {
  private element_: HTMLElement;
  private delta_: Vector2d;

  constructor(target: IDraggable, element: HTMLElement, delta: Vector2d) {
    super(target);
    this.element_ = element;
    this.delta_ = delta;
  }

  public getDelta(): Vector2d {
    return this.delta_;
  }

  public getElement(): HTMLElement {
    return this.element_;
  }
}

export {Drag};
