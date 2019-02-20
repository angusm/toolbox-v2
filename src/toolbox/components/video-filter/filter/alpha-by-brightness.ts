import {IFilter} from "../video-filter-interface";

class AlphaByBrightness implements IFilter {
  constructor() {}

  public filter(imageData: ImageData): ImageData {
    const colorValues = imageData.data;
    const length = colorValues.length;
    for (let i = 0; i < length; i +=4) {
      // Convert brightness to alpha and replace in-array
      colorValues[i+3] =
          3 * colorValues[i] + 4 * colorValues[i+1] + colorValues[i+2] >>> 3;
    }
    return imageData;
  }
}

export {AlphaByBrightness};
