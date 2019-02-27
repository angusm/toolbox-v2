import {DistanceFunction} from "../scroll-effect/distance-function";
import {GetDistanceFn} from "./types/get-distance-fn";
import {IScrollControlOptions} from "./types/scroll-control-options";
import {NumericRange} from "../../utils/math/numeric-range";
import {renderLoop} from "../../utils/render-loop";
import {getScrollElement} from "../../utils/dom/position/get-scroll-element";
import {TScrollEffectDistanceValue} from "../scroll-effect/types/t-scroll-effect-distance-value";
import {TScrollControlDistanceValue} from "./types/t-scroll-control-distance-value";

const defaultOptions: IScrollControlOptions =
  {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: (frame: HTMLElement) => frame.offsetHeight / -2,
    endDistance: (frame: HTMLElement) => frame.offsetHeight / 2,
  };

const INTERACTION_START_EVENTS = [
  'mousedown',
  'touchstart',
];

const INTERACTION_END_EVENTS = [
  'mouseup',
  'touchend',
];

class ScrollControl {
  private readonly control_: HTMLInputElement;
  private readonly frame_: HTMLElement;
  private readonly getDistanceFunction_: GetDistanceFn;
  private readonly startDistance_: TScrollControlDistanceValue;
  private readonly endDistance_: TScrollControlDistanceValue;
  private lastValue_: number;
  private interacting_: boolean;
  private destroyed_: boolean;

  /**
   * `frame` defaults to body if not provided.
   */
  constructor(
    control: HTMLInputElement,
    frame: HTMLElement = null,
    {
      getDistanceFunction = defaultOptions.getDistanceFunction,
      startDistance = defaultOptions.startDistance,
      endDistance = defaultOptions.endDistance,
    }: IScrollControlOptions = defaultOptions,
  ) {
    this.control_ = control;
    this.frame_ = frame === null ? document.body : frame;
    this.getDistanceFunction_ = getDistanceFunction;
    this.interacting_ = false;
    this.destroyed_ = false;
    this.lastValue_ = parseFloat(this.control_.value);
    this.startDistance_ = startDistance;
    this.endDistance_ = endDistance;
    this.init_();
  }

  private init_(): void {
    INTERACTION_START_EVENTS
      .forEach(
        (event) => {
          this.control_.addEventListener(event, () => this.interacting_ = true);
        });
    INTERACTION_END_EVENTS
      .forEach(
        (event) => {
          document.addEventListener(event, () => this.interacting_ = false);
        });
    this.onFrameLoop_();
    this.onScrollLoop_();
  }

  private onScrollLoop_() {
    if (this.destroyed_) {
      return;
    }

    renderLoop.scrollMeasure(() => {
      renderLoop.scrollCleanup(() => this.onScrollLoop_());
      if (this.interacting_) { // Do nothing if the slider is being used
        return;
      }

      const value = this.getControlValueFromScroll_();
      renderLoop.scrollMutate(() => {
        this.control_.value = `${value}`;
        this.lastValue_ = value;
      });
    });
  }

  private onFrameLoop_() {
    if (this.destroyed_) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.onFrameLoop_());
      if (!this.interacting_) { // Only update if the slider is being used
        return;
      }

      const scrollTop = getScrollElement().scrollTop;
      const currentValue = parseFloat(this.control_.value);

      // Do nothing if values match
      if (this.lastValue_ === currentValue) {
        return;
      }

      const percent =
        this.getValueRange_().getValueAsPercent(currentValue);
      const targetDistance =
        this.getDistanceRange_().getPercentAsValue(percent);
      const currentDistance =
        this.getDistanceRange_().clamp(this.getDistance_());
      const scrollDifference = targetDistance - currentDistance;

      // Don't fuss over tiny differences
      if (Math.abs(scrollDifference) < 1) {
        return;
      }

      renderLoop.mutate(() => {
        getScrollElement().scrollTop = scrollTop + scrollDifference;
      });
    });
  }

  private getControlValueFromScroll_(): number {
    const percent: number = this.getDistanceAsPercent_();
    const range: NumericRange = this.getValueRange_();
    return range.getPercentAsValue(percent);
  }

  private getValueRange_(): NumericRange {
    return NumericRange.fromRangeInput(this.control_);
  }

  private getDistance_(): number {
    return this.getDistanceFunction_(this.frame_);
  }

  private getDistanceAsPercent_(): number {
    return this.getDistanceRange_().getValueAsPercent(this.getDistance_());
  }

  private getDistanceRange_() {
    return new NumericRange(
      this.getDistanceValue_(this.startDistance_),
      this.getDistanceValue_(this.endDistance_)
    );
  }

  private getDistanceValue_(value: TScrollEffectDistanceValue): number {
    if (typeof value === 'number') {
      return value;
    } else {
      return value(this.frame_);
    }
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {ScrollControl};
