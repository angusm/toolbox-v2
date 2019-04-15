import {sumOffsetWidthsFromArray} from "./sum-offset-widths-from-array";

function sumOffsetWidths(...els: HTMLElement[]): number {
  return sumOffsetWidthsFromArray(els);
}

export {sumOffsetWidths};
