/**
 * Version of draggable that accommodates velocity, sliding, breaking.
 */
import {IDraggable, IDraggableConstraint} from "./interfaces";
import {Draggable} from "./draggable";
import {Physical2d} from "../physical/physical-2d";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {eventHandler} from "../../utils/event/event-handler";
import {DragStart} from "./events/drag-start";
import {DragEnd} from "./events/drag-end";
import {Drag} from "./events/drag";
import {PhysicallyPositionedElement2d} from "../physical/positioned/physically-positioned-element-2d";

interface IPhysicallyDraggableConfig {
  draggableConstraints?: IDraggableConstraint[],
  physical2d?: Physical2d,
}

const defaultPhysicallyDraggableConfig: IPhysicallyDraggableConfig =
  {
    draggableConstraints: [],
    physical2d: null,
  };

class PhysicallyDraggable implements IDraggable {
  readonly draggable_: Draggable;
  private positioned2d_: PhysicallyPositionedElement2d;

  constructor(
    target: HTMLElement,
    {
      draggableConstraints =
        defaultPhysicallyDraggableConfig.draggableConstraints,
      physical2d = defaultPhysicallyDraggableConfig.physical2d,
    }: IPhysicallyDraggableConfig = {},
  ) {
    const finalPhysical2d = physical2d === null ? new Physical2d() : physical2d;
    this.positioned2d_ =
      new PhysicallyPositionedElement2d(target, finalPhysical2d);
    this.draggable_ =
      new Draggable(target, {constraints: draggableConstraints});
    this.init_();
  }

  private init_() {
    eventHandler.addListener(
      this.draggable_,
      DragStart,
      (event: DragStart) => {
        this.disablePhysics();
        eventHandler.dispatchEvent(new DragStart(this));
      });
    eventHandler.addListener(
      this.draggable_,
      Drag,
      (event: Drag) => {
        eventHandler
          .dispatchEvent(new Drag(this, this.getElement(), event.getDelta()));
      });
    eventHandler.addListener(
      this.draggable_,
      DragEnd,
      (event: DragEnd) => {
        this.enablePhysics();
        this.setVelocity(event.getEndVelocity());
        eventHandler
          .dispatchEvent(
            new DragEnd(this, event.getDelta(), event.getEndVelocity()));
      });
  }

  public disablePhysics(): void {
    this.positioned2d_.disablePhysics();
  }

  public enablePhysics(): void {
    this.positioned2d_.enablePhysics();
  }

  public getElement(): HTMLElement {
    return this.draggable_.getElement();
  }

  public setAcceleration(acceleration: Vector2d): void {
    this.positioned2d_.setAcceleration(acceleration);
  }

  public getVelocity(): Vector2d {
    return this.positioned2d_.getVelocity();
  }

  public getBreakForce(): number {
    return this.positioned2d_.getBreakForce();
  }

  public setVelocity(velocity: Vector2d): void {
    this.positioned2d_.setVelocity(velocity);
  }

  public adjustNextFrame(adjustment: Vector2d): void {
    this.positioned2d_.adjustNextFrame(adjustment);
  }

  public getPhysical2d(): Physical2d {
    return this.positioned2d_.getPhysical2d();
  }
}

export {
  defaultPhysicallyDraggableConfig,
  PhysicallyDraggable
};
