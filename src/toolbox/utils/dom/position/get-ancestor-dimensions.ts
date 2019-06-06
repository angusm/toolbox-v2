import {Dimensions2d} from "../../math/geometry/dimensions-2d";

function getAncestorDimensions(ancestor: HTMLElement = null): Dimensions2d {
  if (ancestor) {
    return Dimensions2d.fromElementOffset<Dimensions2d>(ancestor);
  } else {
    return Dimensions2d.fromRootElement<Dimensions2d>();
  }
}
export {getAncestorDimensions};
