import {RunOnScroll} from "../run-on-condition/scroll";
import {ParallaxDistanceFunction} from "./parallax-distance-function";
import {IParallaxOptions} from "./types/parallax-options";
import {renderLoop} from "../../utils/render-loop";
import {Range} from "../../utils/math/range";
import {generateBasicParallaxEffect} from "./effect-generators/basic-parallax";
import {isDisplayed} from "../../utils/dom/style/is-displayed";

// Type definition
type GetDistanceFn = (a: HTMLElement, b?: HTMLElement) => number;

const defaultOptions: IParallaxOptions =
  {
    getDistanceFunction: ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: -Number.MAX_VALUE,
    endDistance: Number.MAX_VALUE,
    effectFunctions: [generateBasicParallaxEffect(-.1)],
  };

class Parallax {
  private target_: HTMLElement;
  private getDistanceFunction_: GetDistanceFn;
  private distanceRange_: Range;
  private effectFunctions_: Array<
      (target: HTMLElement, distance: number, distancePercent: number) => void>;
  private lastRunDistance_: number;
  private runLoop_: RunOnScroll;

  constructor(
    target: HTMLElement,
    {
      getDistanceFunction = defaultOptions.getDistanceFunction,
      startDistance = defaultOptions.startDistance,
      endDistance = defaultOptions.endDistance,
      effectFunctions = defaultOptions.effectFunctions,
    }: IParallaxOptions = defaultOptions,
  ) {
    this.target_ = target;
    this.getDistanceFunction_ = getDistanceFunction;
    this.distanceRange_ = new Range(startDistance, endDistance);
    this.effectFunctions_ = effectFunctions;
    this.lastRunDistance_ = null;
    this.runLoop_ = null;
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => this.runEffect_());
    this.runLoop_ = new RunOnScroll(() => this.runEffect_());
  }

  /**
   * NOTE: Runs as part of the render measure loop.
   * @private
   */
  private runEffect_(): void {
    const distance = this.getRunDistance_();
    if (distance === this.lastRunDistance_) {
      return; // Do nothing if there've been no real changes.
    }
    this.lastRunDistance_ = distance;

    const percent = this.distanceRange_.getValueAsPercent(distance);
    this.effectFunctions_
      .forEach(
        (effectFunction) => effectFunction(this.target_, distance, percent));
  }

  private getRunDistance_(): number {
    return this.distanceRange_.clamp(this.getDistanceFunction_(this.target_));
  }

  public destroy() {
    this.runLoop_.destroy();
  }
}

export {Parallax};
