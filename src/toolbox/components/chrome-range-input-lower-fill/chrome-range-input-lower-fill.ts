import {Color} from "../../utils/dom/style/css-style-value/color";
import {UserAgent} from "../../utils/user-agent/user-agent";
import {Chrome} from "../../utils/user-agent/browser/chrome";
import {NumericRange} from "../../utils/math/numeric-range";

type ChromeRangeInputColor = Color|string;

class ChromeRangeInputLowerFill {
  private readonly backgroundColor_: string;
  private readonly fillColor_: string;
  private readonly element_: HTMLInputElement;
  private readonly inputHandler_: () => void;

  constructor(
    rangeInput: HTMLInputElement,
    backgroundColor: ChromeRangeInputColor,
    fillColor: ChromeRangeInputColor,
  ) {
    this.element_ = rangeInput;
    this.inputHandler_ = () => this.handleInput_();
    this.backgroundColor_ =
      ChromeRangeInputLowerFill.processColorParams_(backgroundColor);
    this.fillColor_ = ChromeRangeInputLowerFill.processColorParams_(fillColor);
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
  }

  private handleInput_() {
    const value  = parseFloat(this.element_.value);
    const min = parseFloat(this.element_.min) || 0;
    const max = parseFloat(this.element_.max) || 100;
    const percent = new NumericRange(min, max).getValueAsPercent(value) * 100;
    this.element_.style.background =
      'linear-gradient(' +
        `to right, ${this.fillColor_} 0%,` +
        `${this.fillColor_} ${percent}%, ` +
        `${this.backgroundColor_} ${percent}%, ` +
        `${this.backgroundColor_} 100%)`;
  }

  public destroy() {
    this.element_.removeEventListener('input', this.inputHandler_);
  }
}

export {ChromeRangeInputLowerFill};
