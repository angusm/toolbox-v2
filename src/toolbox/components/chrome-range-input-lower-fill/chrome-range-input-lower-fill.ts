import {Color} from "../../utils/dom/style/css-style-value/color";
import {UserAgent} from "../../utils/user-agent/user-agent";
import {Chrome} from "../../utils/user-agent/browser/chrome";
import {NumericRange} from "../../utils/math/numeric-range";
import {renderLoop} from "../../utils/render-loop";

type ChromeRangeInputColor = Color|string;

class ChromeRangeInputLowerFill {
  private readonly backgroundColor_: string;
  private readonly fillColor_: string;
  private readonly element_: HTMLInputElement;
  private readonly inputHandler_: () => void;
  private lastValue_: number;
  private lastMin_: number;
  private lastMax_: number;
  private destroyed_: boolean;

  constructor(
    rangeInput: HTMLInputElement,
    backgroundColor: ChromeRangeInputColor,
    fillColor: ChromeRangeInputColor,
  ) {
    this.element_ = rangeInput;
    this.inputHandler_ = () => this.updateSliderStyle_();
    this.backgroundColor_ =
      ChromeRangeInputLowerFill.processColorParams_(backgroundColor);
    this.fillColor_ = ChromeRangeInputLowerFill.processColorParams_(fillColor);
    this.lastValue_ = null;
    this.destroyed_ = false;
  }

  private static processColorParams_(color: ChromeRangeInputColor): string {
    return color instanceof Color ? color.toStyleString() : color;
  }

  public init() {
    // Only ever do Chrome
    if (UserAgent.getBrowser() !== Chrome) {
      return;
    }

    this.element_.addEventListener('input', this.inputHandler_);
    this.renderLoop_();
  }

  private renderLoop_() {
    if (this.destroyed_) {
      return;
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.renderLoop_());
      this.updateSliderStyle_();
    });
  }

  private updateSliderStyle_() {
    const value  = parseFloat(this.element_.value);
    const min = parseFloat(this.element_.min) || 0;
    const max = parseFloat(this.element_.max) || 100;

    if (
      this.lastValue_ === value &&
      this.lastMin_ === min &&
      this.lastMax_ === max
    ) {
      return; // Don't waste time with no update updates
    }

    // Track last values so updates can be culled next run
    this.lastValue_ = value;
    this.lastMin_ = min;
    this.lastMax_ = max;

    const percent = new NumericRange(min, max).getValueAsPercent(value) * 100;

    renderLoop.anyMutate(() => {
      this.element_.style.background =
        'linear-gradient(' +
        `to right, ${this.fillColor_} 0%,` +
        `${this.fillColor_} ${percent}%, ` +
        `${this.backgroundColor_} ${percent}%, ` +
        `${this.backgroundColor_} 100%)`;
    });
  }

  public destroy() {
    this.element_.removeEventListener('input', this.inputHandler_);
    this.destroyed_ = true;
  }
}

export {ChromeRangeInputLowerFill};
