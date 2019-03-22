import {DistanceFunction} from "./distance-function";
import {IScrollEffectOptions} from "./types/i-scroll-effect-options";
import {renderLoop} from "../../utils/render-loop";
import {ArrayMap} from "../../utils/map/array";
import {NumericRange} from "../../utils/math/numeric-range";
import {IEffect} from "./effects/i-effect";
import {removeFirstInstance} from "../../utils/array/remove-first-instance";
import {GetDistanceFn} from "./types/get-distance-fn";
import {TScrollEffectCallbackMap} from "./types/t-scroll-effect-callback-map";
import {TScrollEffectCallback} from "./types/t-scroll-effect-callback";
import {flatten} from "../../utils/array/flatten";
import {TScrollEffectDistanceValue} from "./types/t-scroll-effect-distance-value";
import {Dimensions} from "../../utils/cached-vectors/dimensions";

/**
 * Dimensions of the window. Used to let scroll effects trigger on resize even
 * if they would otherwise be culled.
 * @hidden
 */
const windowDimensions = Dimensions.getSingleton();

/**
 * These are the default option values provided to ScrollEffect unless otherwise
 * overridden.
 * @hidden
 */
const defaultOptions: IScrollEffectOptions =
  {
    condition: null,
    distanceCallbacks: <TScrollEffectCallbackMap>[],
    percentCallbacks: <TScrollEffectCallbackMap>[],
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: () => Number.NEGATIVE_INFINITY,
    endDistance: () => Number.POSITIVE_INFINITY,
    effects: [],
  };

/**
 * Tracks active effects for better garbage collection.
 * @hidden
 */
const ActiveEffects: ArrayMap<IEffect, ScrollEffect> = new ArrayMap();

type TParsedCallbackMap = ArrayMap<NumericRange, TScrollEffectCallback>;

/** @hidden */
class ScrollEffectRunValue {
  public readonly distance: number;
  public readonly distanceAsPercent: number;
  public readonly lastRunDistance: number;
  public readonly lastRunDistanceAsPercent: number;

  constructor(
    distance: number,
    distanceAsPercent: number,
    lastRunDistance: number,
    lastRunDistanceAsPercent: number,
  ) {
    this.distance = distance;
    this.distanceAsPercent = distanceAsPercent;
    this.lastRunDistance = lastRunDistance;
    this.lastRunDistanceAsPercent = lastRunDistanceAsPercent;
  }

  public getRunRangeAsPercent(): NumericRange {
    return NumericRange.fromUnorderedValues(
      this.lastRunDistanceAsPercent, this.distanceAsPercent);
  }

  public getRunRange(): NumericRange {
    return NumericRange.fromUnorderedValues(this.lastRunDistance, this.distance);
  }
}

/**
 * Handles a scroll effect or scroll effects on a target element.
 *
 * Calculates the distance scrolled in pixels and as a percent of provided
 * ranges, before calling the run function on the provided effects.
 */
class ScrollEffect {
  private readonly condition_: () => boolean;
  private readonly distanceCallbacks_: TParsedCallbackMap;
  private readonly percentCallbacks_: TParsedCallbackMap;
  private readonly target_: HTMLElement;
  private readonly getDistanceFunction_: GetDistanceFn;
  private readonly startDistance_: TScrollEffectDistanceValue;
  private readonly endDistance_: TScrollEffectDistanceValue;
  private readonly effects_: Array<IEffect>;
  private destroyed_: boolean;
  private forceRun_: boolean;
  private lastRunDistance_: number;

  /**
   *
   * @param target The element to use for tracking distance scrolled.
   *
   * Normally this is also the same element to which effects are supplied,
   * but some effects such as Tween will allow you to provide separate
   * targets to apply effect styles to.
   *
   *
   * @param condition Effects will only run if this function evaluates to true.
   *
   * @param getDistanceFunction Method used to determine distance scrolled.
   *
   * This function defaults to calculating the distance between the center
   * of the given target element and the center of the viewport. Values are
   * negative when the element is below the center of the viewport and
   * positive when it is above the center of the viewport.
   *
   * Custom functions can be passed in here and should expect to receive the
   * target element as the sole parameter, and return a number indicating
   * the distance as it applies to the provided start and end distances.
   * Default functions assumes these are pixel values, but there's nothing
   * stopping you from getting weird with it.
   *
   * A small sample of default distance functions can be found in the
   * scroll-effect distance-function.ts module. Please see that module for
   * more details.
   *
   *
   * @param startDistance Returns distance at which effects should start.
   *
   * This parameter accepts a function that returns the distance at which
   * effects passed to this ScrollEffect instance should start being
   * applied.
   *
   * This function should expect no parameters and return a numeric value.
   * ScrollEffect and its supporting modules typically expect this to be a
   * value in pixels, but I'm not your Dad so do what you want.
   *
   *
   * @param endDistance Returns distance at which effects should end.
   *
   * This parameter accepts a function that returns the distance at which
   * effects passed to this ScrollEffect instance should stop being
   * applied.
   *
   * This function should expect no parameters and return a numeric value.
   * ScrollEffect and its supporting modules typically expect this to be a
   * value in pixels, but you're a grown person and I can't stop you from
   * making bad choices.
   *
   *
   * @param effects Array of effects to run when the user is scrolling.
   *
   * List of the effects that should run when the user is scrolling within
   * the provided ranges, as decided by the provided target and distance
   * function.
   *
   * Effects are run in order.
   *
   * @param distanceCallbacks Callbacks to run at certain scroll positions.
   *
   * TODO(Angus): Expand this documentation.
   *
   * @param percentCallbacks Callbacks to run at certain scroll positions.
   *
   * TODO(Angus): Expand this documentation.
   *
   */
  constructor(
    target: HTMLElement,
    {
      condition = defaultOptions.condition,
      distanceCallbacks = defaultOptions.distanceCallbacks,
      percentCallbacks = defaultOptions.percentCallbacks,
      getDistanceFunction = defaultOptions.getDistanceFunction,
      startDistance = defaultOptions.startDistance,
      endDistance = defaultOptions.endDistance,
      effects = defaultOptions.effects,
    }: IScrollEffectOptions = defaultOptions,
  ) {
    this.condition_ = condition;
    this.distanceCallbacks_ =
      ScrollEffect.mapCallbacksFromCallbackOptions_(distanceCallbacks);
    this.percentCallbacks_ =
      ScrollEffect.mapCallbacksFromCallbackOptions_(percentCallbacks);
    this.target_ = target;
    this.getDistanceFunction_ = getDistanceFunction;
    this.startDistance_ = startDistance;
    this.endDistance_ = endDistance;
    this.effects_ = effects;
    this.lastRunDistance_ = null;
    this.destroyed_ = false;
    this.forceRun_ = false;
    this.init_();
  }

  private init_(): void {
    this.effects_.forEach(
        (effect: IEffect) => ActiveEffects.get(effect).push(this));
    renderLoop.measure(() => {
      const runValue = this.getRunValue_();
      if (this.shouldRun_(runValue)) {
        this.runEffectsAndCallbacks_(runValue);
      }
      this.lastRunDistance_ = runValue.distance;
    });
    renderLoop.scrollMeasure(() => this.handleScroll_());

    // Setup a force run once we're loaded if we aren't already
    window.addEventListener('load', () => this.triggerRun());
  }

  private static mapCallbacksFromCallbackOptions_(
    callbacks: TScrollEffectCallbackMap
  ): ArrayMap<NumericRange, TScrollEffectCallback> {
    const values =
      callbacks instanceof ArrayMap ?
        Array.from(callbacks.entries()) : callbacks;

    const parsedValues: [NumericRange, TScrollEffectCallback[]][] =
      values
        .map(([key, value]) => {
          if (key instanceof NumericRange) {
            return <[NumericRange, TScrollEffectCallback[]]>[key, value];
          } else if (key instanceof Array) {
            return  <[NumericRange, TScrollEffectCallback[]]>(
              [new NumericRange(key[0], key[1]), value]);
          } else {
            return  <[NumericRange, TScrollEffectCallback[]]>(
              [new NumericRange(key, key), value]);
          }
        });
    return new ArrayMap(parsedValues);
  }

  /**
   * NOTE: Runs as part of the render measure loop.
   * @private
   */
  private handleScroll_(): void {
    if (this.destroyed_) {
      return;
    }

    this.triggerRun();
    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.handleScroll_());
    });
  }

  /**
   * Force the scroll effect to run on the next frame.
   *
   * Ignores scroll distance or provided condition evaluation.
   */
  public forceRun(): void {
    if (this.forceRun_) {
      return; // Run already being forced.
    }
    this.forceRun_ = true;
    this.triggerRun();
    renderLoop.cleanup(() => this.forceRun_ = false);
  }

  public triggerRun(): void {
    renderLoop.measure(() => {
      const runValue = this.getRunValue_();
      if (this.shouldRun_(runValue)) {
        this.runEffectsAndCallbacks_(runValue);
      }
      this.lastRunDistance_ = runValue.distance;
    });
  }

  private runEffectsAndCallbacks_(runValue: ScrollEffectRunValue): void {
    this.runEffects_(runValue);
    this.runCallbacksForPosition_(runValue);
  }

  /**
   * @param optionalRunValue Provided only as an option to improve performance.
   * By providing a run value a new one won't be instantiated.
   *
   * @private
   */
  private shouldRun_(optionalRunValue?: ScrollEffectRunValue): boolean {
    if (this.forceRun_) {
      return true;
    }

    // Always run if the windows dimensions have changed
    if (windowDimensions.hasChanged()) {
      return this.isConditionMet_(); // But still respect manual conditions
    }

    const runValue = optionalRunValue || this.getRunValue_();
    return runValue.distance !== runValue.lastRunDistance && (
      this.isConditionMet_());
  }

  private isConditionMet_() {
    return this.condition_ === null || this.condition_();
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

  private static getCallbacks(
    runRange: NumericRange, callbacksMap: TParsedCallbackMap
  ): TScrollEffectCallback[] {
    return flatten(
      Array.from(callbacksMap.entries())
        .filter(([triggerRange, callbacks]) => {
          return triggerRange.getOverlap(runRange) !== null;
        })
        .map(([triggerRange, callbacks]) => callbacks)
    );
  }

  private getRunValue_(): ScrollEffectRunValue {
    const distance = this.getRunDistance_();
    const lastRunDistance = this.lastRunDistance_;
    const percent = this.getDistanceRange_().getValueAsPercent(distance);
    const lastRunDistancePercent =
      lastRunDistance !== null ?
        this.getDistanceRange_().getValueAsPercent(lastRunDistance) : 0;

    return new ScrollEffectRunValue(
      distance,
      percent,
      lastRunDistance,
      lastRunDistancePercent
    )
  }

  private runCallbacks_(
    callbacks: TScrollEffectCallback[], runValue: ScrollEffectRunValue
  ): void {
    callbacks
      .forEach(
        (callback) => callback(
          this.target_,
          runValue.distance,
          runValue.distanceAsPercent,
          runValue.lastRunDistance,
          runValue.lastRunDistanceAsPercent,
        ));

  }

  private runCallbacksForPosition_(runValue: ScrollEffectRunValue) {
    const percentCallbacksToRun =
      ScrollEffect.getCallbacks(
        runValue.getRunRangeAsPercent(), this.percentCallbacks_);
    const distanceCallbacksToRun =
      ScrollEffect.getCallbacks(
        runValue.getRunRange(), this.distanceCallbacks_);

    const allCallbacks =
      flatten([percentCallbacksToRun, distanceCallbacksToRun]);

    this.runCallbacks_(allCallbacks, runValue);
  }

  private runEffects_(runValue: ScrollEffectRunValue) {
    const effectsRunFns =
      this.effects_.map((effect) => effect.run.bind(effect));

    this.runCallbacks_(effectsRunFns, runValue);
  }

  private getRunDistance_(): number {
    return this.getDistanceRange_()
      .clamp(this.getDistanceFunction_(this.target_));
  }

  /**
   * Destroy the instance.
   * Stops running the effects and calls the destroy on the effects if they are
   * not being used in any other ScrollEffect instances.
   */
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
