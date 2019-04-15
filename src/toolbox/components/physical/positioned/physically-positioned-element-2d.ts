import {Physical2d} from "../physical-2d";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {renderLoop} from "../../../utils/render-loop";
import {translate2d} from "../../../utils/dom/position/translate-2d";

class PhysicallyPositionedElement2d {
  private readonly target_: HTMLElement;
  private readonly physical2d_: Physical2d;

  constructor(target: HTMLElement, physical2d: Physical2d) {
    this.target_ = target;
    this.physical2d_ = physical2d;

    this.init_();
  }

  public adjustNextFrame(adjustment: Vector2d): void {
    renderLoop.measure(() => translate2d(this.target_, adjustment));
  }

  private init_() {
    this.render_();
  }

  private render_() {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const velocity = this.physical2d_.getLastAppliedVelocity();
      translate2d(this.target_, velocity);
    });
  }

  public disablePhysics(): void {
    this.physical2d_.disable();
  }

  public enablePhysics(): void {
    this.physical2d_.enable();
  }

  public setAcceleration(acceleration: Vector2d): void {
    this.physical2d_.setAcceleration(acceleration);
  }

  public getVelocity(): Vector2d {
    return this.physical2d_.getVelocity();
  }

  public getBreakForce(): number {
    return this.physical2d_.getBreakForce();
  }

  public setVelocity(velocity: Vector2d): void {
    this.physical2d_.setVelocity(velocity);
  }

  public getPhysical2d(): Physical2d {
    return this.physical2d_;
  }
}

export {PhysicallyPositionedElement2d};
