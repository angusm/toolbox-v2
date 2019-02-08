import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {renderLoop} from "../../utils/render-loop";
import {IConstraint2d} from "../../utils/math/geometry/2d-constraints/interface";
import {Constraint2d} from "../../utils/math/geometry/2d-constraints/base";
import {eventHandler} from "../../utils/event/event-handler";
import {Move} from "./move-event";
import {translate2d} from "../../utils/dom/position/translate-2d";

/**
 * NOTE: Physical values are determined as such:
 *  - velocity: px/s
 *  - acceleration: px/s^2
 */

const MINIMUM_VELOCITY: number = 10;

interface IPhysical2dConfig {
  acceleration?: Vector2d,
  constraints?: IConstraint2d[],
  enabled?: boolean,
  initialVelocity?: Vector2d,
  maxVelocity?: number,
}

const defaultPhysical2dConfig = {
  acceleration: new Vector2d(0, 0),
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
  private enabled_: boolean;
  private maxVelocity_: number;
  private velocity_: Vector2d;

  constructor(
    element: HTMLElement,
    {
      acceleration = defaultPhysical2dConfig.acceleration,
      constraints = defaultPhysical2dConfig.constraints,
      enabled = defaultPhysical2dConfig.enabled,
      initialVelocity = defaultPhysical2dConfig.initialVelocity,
      maxVelocity = defaultPhysical2dConfig.maxVelocity,
    }: IPhysical2dConfig
  ) {
    this.element_ = element;
    this.constraints_ = constraints;

    this.acceleration_ = acceleration;
    this.enabled_ = enabled;
    this.maxVelocity_ = maxVelocity;
    this.velocity_ = initialVelocity;
    this.render_();
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

      const elapsedTime = renderLoop.getElapsedSeconds();
      this.velocity_ =
        this.velocity_
          .add(this.acceleration_.scale(elapsedTime))
          .clampLength(this.maxVelocity_);
      if (this.velocity_.getLength() < MINIMUM_VELOCITY) {
        this.velocity_ = new Vector2d(0, 0);
      }

      this.velocity_ =
        Constraint2d.applyConstraints(this.velocity_, ...this.constraints_);

      const velocityToApply = this.velocity_.scale(elapsedTime);

      eventHandler
        .dispatchEvent(
          new Move(this, this.element_, velocityToApply, this.velocity_));

      renderLoop.mutate(
        () => translate2d(this.element_, velocityToApply));
    });
  }
}

export {Physical2D};
