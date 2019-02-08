/**
 * Version of draggable that accommodates velocity, sliding, breaking.
 */
import {IDraggable, IDraggableConstraint} from "./interfaces";
import {Draggable} from "./base";
import {Physical2D} from "../physical/2d";
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {IConstraint2d} from "../../utils/math/geometry/2d-constraints/interface";
import {eventHandler} from "../../utils/event/event-handler";
import {DragStart} from "./events/drag-start";
import {DragEnd} from "./events/drag-end";
import {Drag} from "./events/drag";
import {Move} from "../physical/move-event";

interface IPhysicallyDraggableConfig {
  acceleration?: Vector2d,
  draggableConstraints?: IDraggableConstraint[],
  maxVelocity?: number,
  physicalConstraints?: IConstraint2d[],
}

const defaultPhysicallyDraggableConfig: IPhysicallyDraggableConfig =
  {
    acceleration: new Vector2d(0, 0),
    draggableConstraints: [],
    maxVelocity: 10,
    physicalConstraints: [],
  };

class PhysicallyDraggable implements IDraggable {
  readonly draggable_: Draggable;
  readonly physical2d_: Physical2D;

  constructor(
    target: HTMLElement,
    {
      acceleration = defaultPhysicallyDraggableConfig.acceleration,
      draggableConstraints =
        defaultPhysicallyDraggableConfig.draggableConstraints,
      maxVelocity = defaultPhysicallyDraggableConfig.maxVelocity,
      physicalConstraints = defaultPhysicallyDraggableConfig.physicalConstraints,
    }: IPhysicallyDraggableConfig = {},
  ) {
    this.physical2d_ =
      new Physical2D(
        target,
        {
          acceleration: acceleration,
          constraints: physicalConstraints,
          maxVelocity: maxVelocity,
        }
      );
    this.draggable_ =
      new Draggable(target, {constraints: draggableConstraints});
    this.init_();
  }

  private init_() {
    eventHandler.addListener(
      this.draggable_,
      DragStart,
      (event: DragStart) => {
        this.physical2d_.disable();
        eventHandler.dispatchEvent(new DragStart(this));
      });
    eventHandler.addListener(
      this.draggable_,
      Drag,
      (event: Drag) => {
        this.physical2d_.setVelocity(event.getDelta());
        eventHandler
          .dispatchEvent(new Drag(this, this.getElement(), event.getDelta()));
      });
    eventHandler.addListener(
      this.physical2d_,
      Move,
      (event: Move) => {
        return eventHandler
          .dispatchEvent(
            new Move(
              this,
              this.getElement(),
              event.getDistanceMoved(),
              event.getVelocity()));
      });
    eventHandler.addListener(
      this.draggable_,
      DragEnd,
      (event: DragEnd) => {
        this.physical2d_.enable();
        this.setVelocity(event.getEndVelocity());
        eventHandler.dispatchEvent(new DragEnd(this, event.getEndVelocity()));
      });
  }

  public disablePhysicality(): void {
    this.physical2d_.disable();
  }

  public getElement(): HTMLElement {
    return this.draggable_.getElement();
  }

  public setVelocity(velocity: Vector2d): void {
    this.physical2d_.setVelocity(velocity);
  }
}

export {PhysicallyDraggable};
