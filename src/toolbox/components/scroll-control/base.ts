import {DistanceFunction} from "../scroll-effect/distance-function";
import {GetDistanceFn} from "./types/get-distance-fn";
import {IScrollControlOptions} from "./types/scroll-control-options";
import {NumericRange} from "../../utils/math/numeric-range";
import {getVisibleDistanceBetweenElementCenters} from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import {renderLoop} from "../../utils/render-loop";
import {getScrollElement} from "../../utils/dom/position/get-scroll-element";
import {getSign} from "../../utils/math/get-sign";

const defaultOptions: IScrollControlOptions =
  {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: Number.NEGATIVE_INFINITY,
    endDistance: Number.POSITIVE_INFINITY,
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
  readonly control_: HTMLInputElement;
  readonly frame_: HTMLElement;
  readonly getDistanceFunction_: GetDistanceFn;
  readonly distanceRange_: NumericRange;
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
    this.distanceRange_ = new NumericRange(startDistance, endDistance);
    this.interacting_ = false;
    this.destroyed_ = false;
    this.lastValue_ = parseFloat(this.control_.value);
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
      const targetDistance = this.getFrameRange_().getPercentAsValue(percent);
      const currentDistance = this.getFrameRange_().clamp(this.getDistance_());
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
    return this.getFrameRange_().getValueAsPercent(this.getDistance_());
  }

  private getFrameRange_(): NumericRange {
    const range = this.frame_.offsetHeight / 2;
    return this.distanceRange_.getOverlap(new NumericRange(-range, range));
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {ScrollControl};
