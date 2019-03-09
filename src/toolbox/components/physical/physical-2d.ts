import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {renderLoop} from "../../utils/render-loop";
import {IConstraint2d} from "../../utils/math/geometry/2d-constraints/interface";
import {Constraint2d} from "../../utils/math/geometry/2d-constraints/base";
import {eventHandler} from "../../utils/event/event-handler";
import {Move2d} from "./move-2d-event";
import {ZERO_VECTOR_2D} from "../../utils/math/geometry/zero-vector-2d";

/**
 * NOTE: Physical values are determined as such:
 *  - velocity: px/s
 *  - acceleration: px/s^2
 */
interface IPhysical2dConfig {
  acceleration?: Vector2d,
  breakForce?: number,
  constraints?: IConstraint2d[],
  enabled?: boolean,
  initialVelocity?: Vector2d,
  minVelocity?: number,
}

const defaultPhysical2dConfig = {
  acceleration: ZERO_VECTOR_2D,
  breakForce: .999,
  constraints: <IConstraint2d[]>[],
  decelerationExponent: .9,
  deceleration: ZERO_VECTOR_2D,
  enabled: true,
  initialVelocity: ZERO_VECTOR_2D,
  minVelocity: 10,
};

class PredictedPhysical2dState {
  private readonly distanceTraveled_: Vector2d;
  private readonly velocity_: Vector2d;

  constructor(distanceTraveled: Vector2d, velocity: Vector2d) {
    this.distanceTraveled_ = distanceTraveled;
    this.velocity_ = velocity;
  }

  public getDistanceTraveled(): Vector2d {
    return this.distanceTraveled_;
  }

  public getVelocity(): Vector2d {
    return this.velocity_;
  }
}

class Physical2d {
  private readonly constraints_: IConstraint2d[];

  private acceleration_: Vector2d;
  private breakForce_: number;
  private enabled_: boolean;
  private lastAppliedVelocity_: Vector2d;
  private minVelocity_: number;
  private velocity_: Vector2d;

  constructor(
    {
      acceleration = defaultPhysical2dConfig.acceleration,
      breakForce = defaultPhysical2dConfig.breakForce,
      constraints = defaultPhysical2dConfig.constraints,
      enabled = defaultPhysical2dConfig.enabled,
      initialVelocity = defaultPhysical2dConfig.initialVelocity,
      minVelocity = defaultPhysical2dConfig.minVelocity,
    }: IPhysical2dConfig = {}
  ) {
    this.constraints_ = constraints;

    this.acceleration_ = acceleration;
    this.breakForce_ = breakForce;
    this.enabled_ = enabled;
    this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
    this.minVelocity_ = minVelocity;
    this.velocity_ = initialVelocity;
    this.render_();
  }

  public setAcceleration(acceleration: Vector2d) {
    this.acceleration_ = acceleration;
  }

  public break(breakForce: number) {
    this.breakForce_ = breakForce;
  }

  public setDeceleration(deceleration: Vector2d) {
    this.setAcceleration(deceleration.invert());
  }

  public disable() {
    this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
    this.enabled_ = false;
  }

  public enable() {
    this.enabled_ = true;
  }

  public isEnabled() {
    return this.enabled_;
  }

  public getVelocity(): Vector2d {
    return this.velocity_;
  }

  public setVelocity(velocity: Vector2d) {
    this.velocity_ = Constraint2d.applyConstraints(velocity, this.constraints_);
  }

  private render_() {
    renderLoop.physics(() => {
      renderLoop.cleanup(() => this.render_());

      // Skip work if there's nothing to do
      if (
        !this.enabled_ ||
        (
          this.velocity_.getLength() === 0 &&
          this.acceleration_.getLength() === 0
        )
      ) {
        this.zeroLastAppliedVelocity_();
        return;
      }

      const elapsedMilliseconds = renderLoop.getElapsedMilliseconds();
      const newState = this.predictStateInXMilliseconds(elapsedMilliseconds);

      this.velocity_ = newState.getVelocity();

      // Skip work if there's nothing to do
      if (newState.getDistanceTraveled().getLength() === 0) {
        this.zeroLastAppliedVelocity_();
        return;
      }

      this.lastAppliedVelocity_ = newState.getDistanceTraveled();

      eventHandler.dispatchEvent(
        new Move2d(this, newState.getDistanceTraveled()));
    });
  }

  /**
   * NOTE: This code is intentionally a bit verbose for performance reasons.
   * @param milliseconds
   */
  public predictStateInXMilliseconds(
    milliseconds: number
  ): PredictedPhysical2dState {

    // Jump out early if velocity is below the minimum threshold
    if (
      this.velocity_.getLength() < this.minVelocity_ &&
      this.acceleration_.getLength() === 0
    ) {
      return new PredictedPhysical2dState(
        ZERO_VECTOR_2D, ZERO_VECTOR_2D);
    }

    /** NOTE: Left intentionally as reference for original formula that the
     * shorthand below was derived from.
     */
    // let velocity = this.velocity_;
    // let distance = ZERO_VECTOR_2D;
    //
    // for (let i = 0; i < milliseconds; i++) {
    //   velocity =
    //     Constraint2d
    //       .applyConstraints(
    //         velocity.add(accelPerMs).scale(this.breakForce_),
    //         this.constraints_);
    //   distance = distance.add(velocity.scale(1/1000));
    // }

    const breakFactor = // Using estimation formulas for exponent summation
      this.breakForce_ *
      (Math.pow(this.breakForce_, milliseconds) - 1) /
      (this.breakForce_ - 1);

    const scaledAccelPerMs = this.acceleration_.scale(breakFactor/1000);

    const velocity =
      Constraint2d.applyConstraints(
          this.velocity_.scale(Math.pow(this.breakForce_, milliseconds))
            .add(scaledAccelPerMs),
          this.constraints_);

    const distance =
      Constraint2d.applyConstraints(
          this.velocity_.add(this.acceleration_).scale(breakFactor/1000),
          this.constraints_);

    return new PredictedPhysical2dState(distance, velocity);
  }

  private zeroLastAppliedVelocity_(): void {
    this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
  }

  public getLastAppliedVelocity(): Vector2d {
    return this.lastAppliedVelocity_;
  }

  public getBreakForce(): number {
    return this.breakForce_;
  }
}

export {
  defaultPhysical2dConfig,
  Physical2d
};
