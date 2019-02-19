import {DistanceFunction} from "./distance-function";
import {
  IScrollEffectOptions,
  TScrollEffectDistanceValue
} from "./types/scroll-effect-options";
import {renderLoop} from "../../utils/render-loop";
import {ArrayMap} from "../../utils/map/array";
import {NumericRange} from "../../utils/math/numeric-range";
import {IEffect} from "./effects/ieffect";
import {removeFirstInstance} from "../../utils/array/remove-first-instance";
import {GetDistanceFn} from "./types/get-distance-fn";

const defaultOptions: IScrollEffectOptions =
  {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: () => Number.NEGATIVE_INFINITY,
    endDistance: () => Number.POSITIVE_INFINITY,
    effects: [],
  };

const ActiveEffects: ArrayMap<IEffect, ScrollEffect> = new ArrayMap();

class ScrollEffect {
  readonly target_: HTMLElement;
  readonly getDistanceFunction_: GetDistanceFn;
  readonly startDistance_: TScrollEffectDistanceValue;
  readonly endDistance_: TScrollEffectDistanceValue;
  readonly effects_: Array<IEffect>;
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
    this.startDistance_ = startDistance;
    this.endDistance_ = endDistance;
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

  private getDistanceValue_(value: TScrollEffectDistanceValue): number {
    if (typeof value === 'number') {
      return value;
    } else {
      return value(this.target_);
    }
  }

  private getStartDistance_(): number {
    return this.getDistanceValue_(this.startDistance_);
  }

  private getEndDistance_(): number {
    return this.getDistanceValue_(this.endDistance_);
  }

  private getDistanceRange_(): NumericRange {
    return new NumericRange(this.getStartDistance_(), this.getEndDistance_());
  }

  private runEffect_() {
    const distance = this.getRunDistance_();
    if (distance === this.lastRunDistance_) {
      return; // Do nothing if there've been no real changes.
    }
    this.lastRunDistance_ = distance;

    const percent = this.getDistanceRange_().getValueAsPercent(distance);
    this.effects_
      .forEach((effect) => effect.run(this.target_, distance, percent));
  }

  private getRunDistance_(): number {
    return this.getDistanceRange_()
      .clamp(this.getDistanceFunction_(this.target_));
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
