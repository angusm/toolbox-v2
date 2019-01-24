import {DistanceFunction} from "./distance-function";
import {IScrollEffectOptions} from "./types/scroll-effect-options";
import {renderLoop} from "../../utils/render-loop";
import {ArrayMap} from "../../utils/map/array";
import {Range} from "../../utils/math/range";
import {IEffect} from "./effects/ieffect";
import {removeFirstInstance} from "../../utils/array/remove-first-instance";

// Type definition
type GetDistanceFn = (a: HTMLElement, b?: HTMLElement) => number;

const defaultOptions: IScrollEffectOptions =
  {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: Number.NEGATIVE_INFINITY,
    endDistance: Number.POSITIVE_INFINITY,
    effects: [],
  };

const ActiveEffects: ArrayMap<IEffect, ScrollEffect> = new ArrayMap();

class ScrollEffect {
  private target_: HTMLElement;
  private getDistanceFunction_: GetDistanceFn;
  private distanceRange_: Range;
  private effects_: Array<IEffect>;
  private lastRunDistance_: number;
  private destroyed_: boolean;

  constructor(
    target: HTMLElement,
    {
      getDistanceFunction = defaultOptions.getDistanceFunction,
      startDistance = defaultOptions.startDistance,
      endDistance = defaultOptions.endDistance,
      effects = defaultOptions.effects,
    }: IScrollEffectOptions = defaultOptions,
  ) {
    this.target_ = target;
    this.getDistanceFunction_ = getDistanceFunction;
    this.distanceRange_ = new Range(startDistance, endDistance);
    this.effects_ = effects;
    this.lastRunDistance_ = null;
    this.destroyed_ = false;
    this.init_();
  }

  private init_(): void {
    this.effects_.forEach(
        (effect: IEffect) => ActiveEffects.get(effect).push(this));
    renderLoop.measure(() => this.runEffect_());
    renderLoop.scrollMeasure(() => this.handleScroll_());
  }

  /**
   * NOTE: Runs as part of the render measure loop.
   * @private
   */
  private handleScroll_(): void {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.handleScroll_());
      this.runEffect_();
    });
  }

  private runEffect_() {
    const distance = this.getRunDistance_();
    if (distance === this.lastRunDistance_) {
      return; // Do nothing if there've been no real changes.
    }
    this.lastRunDistance_ = distance;

    const percent = this.distanceRange_.getValueAsPercent(distance);
    this.effects_
      .forEach((effect) => effect.run(this.target_, distance, percent));
  }

  private getRunDistance_(): number {
    return this.distanceRange_.clamp(this.getDistanceFunction_(this.target_));
  }

  public destroy() {
    this.destroyed_ = true;
    this.effects_
      .forEach(
        (effect) => {
            removeFirstInstance(ActiveEffects.get(effect), this);
            if (ActiveEffects.get(effect).length === 0) {
              ActiveEffects.delete(effect);
              effect.destroy();
            }
        });
  }
}

export {ScrollEffect};
