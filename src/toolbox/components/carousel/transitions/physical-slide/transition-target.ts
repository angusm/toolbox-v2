import {NumericRange} from "../../../../utils/math/numeric-range";

class TransitionTarget {
  private readonly target_: HTMLElement;
  private readonly timeRange_: NumericRange;
  private readonly translationRange_: NumericRange;

  constructor(
    target: HTMLElement,
    timeRange: NumericRange,
    translationRange: NumericRange,
  ) {
    this.translationRange_ = translationRange;
    this.target_ = target;
    this.timeRange_ = timeRange;
  }

  public getTarget(): HTMLElement {
    return this.target_;
  }

  public getEndTime(): number {
    return this.timeRange_.getMax();
  }

  public getTranslationRange(): NumericRange {
    return this.translationRange_;
  }

  public getTimeRange(): NumericRange {
    return this.timeRange_;
  }

  public getTargetTime(): number {
    console.warn('TransitionTarget.getTargetTime() is deprecated.');
    return this.getEndTime();
  }
}

export {TransitionTarget}
