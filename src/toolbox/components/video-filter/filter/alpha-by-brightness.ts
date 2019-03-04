import {IFilter} from "../video-filter-interface";
import {NumericRange} from "../../../utils/math/numeric-range";

const DEFAULT_RANGE = new NumericRange(0, 255);

class AlphaByBrightness implements IFilter {
  private readonly validRange_: NumericRange;

  constructor(validRange: NumericRange = DEFAULT_RANGE) {
    this.validRange_ = validRange;
  }

  public filter(imageData: ImageData): ImageData {
    const colorValues = imageData.data;
    const length = colorValues.length;
    for (let i = 0; i < length; i +=4) {
      // Convert brightness to alpha and replace in-array
      colorValues[i+3] =
        255 *
        this.validRange_.getValueAsPercent(
          3 * colorValues[i] + 4 * colorValues[i+1] + colorValues[i+2] >>> 3);
    }
    return imageData;
  }
}

export {AlphaByBrightness};
