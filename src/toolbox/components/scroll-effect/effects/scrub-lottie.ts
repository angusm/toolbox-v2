import {IEffect} from "./i-effect";
import {AnimationItem} from "lottie-web/build/player/lottie";
import {NumericRange} from "../../../utils/math/numeric-range";

/**
 * Will scrub through a Lottie animation based on the scroll percent
 */
class ScrubLottie implements IEffect {
  private readonly animationItem_: AnimationItem;

  /**
   * @param animationItem Lottie AnimationItem to scrub.
   */
  constructor(animationItem: AnimationItem) {
    this.animationItem_ = animationItem;
    this.animationItem_.stop();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const duration =
      new NumericRange(0, this.animationItem_.getDuration() * 1000);
    const targetTime = duration.getPercentAsValue(distanceAsPercent);
    this.animationItem_.goToAndStop(targetTime);
  }

  /**
   * Destroys the effect.
   */
  destroy() {}
}

export {ScrubLottie}
