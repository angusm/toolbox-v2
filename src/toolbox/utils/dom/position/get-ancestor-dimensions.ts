import {Dimensions2d} from "../../math/geometry/dimensions-2d";
import {frameMemoize} from "../../frame-memoize";

function getAncestorDimensions_(ancestor: HTMLElement = null): Dimensions2d {
  if (ancestor) {
    return Dimensions2d.fromElementOffset<Dimensions2d>(ancestor);
  } else {
    return Dimensions2d.fromInnerWindow<Dimensions2d>();
  }
}

const getAncestorDimensions = frameMemoize(getAncestorDimensions_);

export {getAncestorDimensions};
