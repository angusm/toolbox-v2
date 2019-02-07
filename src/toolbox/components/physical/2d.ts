import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {renderLoop} from "../../utils/render-loop";
import {IConstraint2d} from "../../utils/math/geometry/2d-constraints/interface";
import {Constraint2d} from "../../utils/math/geometry/2d-constraints/base";
import {eventHandler} from "../../utils/event/event-handler";
import {Move} from "./move-event";

interface IPhysical2dConfig {
  acceleration?: Vector2d,
  accelerationExponent?: number,
  constraints?: IConstraint2d[],
  enabled?: boolean,
  initialVelocity?: Vector2d,
  maxVelocity?: number,
}

const defaultPhysical2dConfig = {
  acceleration: new Vector2d(0, 0),
  accelerationExponent: 1,
  constraints: <IConstraint2d[]>[],
  decelerationExponent: .9,
  deceleration: new Vector2d(0, 0),
  enabled: true,
  initialVelocity: new Vector2d(0, 0),
  maxVelocity: 10,
};

class Physical2D {
  readonly element_: HTMLElement;
  readonly constraints_: IConstraint2d[];

  private acceleration_: Vector2d;
  private accelerationExponent_: number;
  private enabled_: boolean;
  private maxVelocity_: number;
  private velocity_: Vector2d;

  constructor(
    element: HTMLElement,
    {
      acceleration = defaultPhysical2dConfig.acceleration,
      accelerationExponent = defaultPhysical2dConfig.accelerationExponent,
      constraints = defaultPhysical2dConfig.constraints,
      enabled = defaultPhysical2dConfig.enabled,
      initialVelocity = defaultPhysical2dConfig.initialVelocity,
      maxVelocity = defaultPhysical2dConfig.maxVelocity,
    }: IPhysical2dConfig
  ) {
    this.element_ = element;
    this.constraints_ = constraints;

    this.acceleration_ = acceleration;
    this.accelerationExponent_ = accelerationExponent;
    this.enabled_ = enabled;
    this.maxVelocity_ = maxVelocity;
    this.velocity_ = initialVelocity;
    this.render_();
  }

  public setAccelerationExponent(accelerationExponent: number) {
    this.accelerationExponent_ = accelerationExponent;
  }

  public accelerate(acceleration: Vector2d) {
    this.acceleration_ = acceleration;
  }

  public break(deceleration: Vector2d) {
    this.decelerate(deceleration);
  }

  public decelerate(deceleration: Vector2d) {
    this.accelerate(deceleration.invert());
  }

  public disable() {
    this.enabled_ = false;
  }

  public enable() {
    this.enabled_ = true;
  }

  public setVelocity(velocity: Vector2d) {
    this.velocity_ = velocity;
  }

  private render_() {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      if (!this.enabled_) {
        return;
      }

      const position = Vector2d.fromElementTransform(this.element_);
      this.velocity_ =
        this.velocity_
          .add(this.acceleration_)
          .toNthPower(this.accelerationExponent_)
          .clampLength(this.maxVelocity_);
      if (this.velocity_.getLength() < 1) {
        this.velocity_ = new Vector2d(0, 0);
      }

      eventHandler.dispatchEvent(new Move(this, this.element_, this.velocity_));

      const newPosition = position.add(this.velocity_);
      const constrainedPosition =
        Constraint2d.applyConstraints(newPosition, ...this.constraints_);

      renderLoop.mutate(
        () => constrainedPosition.positionElementByTranslation(this.element_));
    });
  }
}

export {Physical2D};
