import {Dimensions2d} from "../../math/geometry/dimensions-2d";

function getAncestorDimensions(ancestor: HTMLElement = null): Dimensions2d {
  if (ancestor) {
    return Dimensions2d.fromElementOffset<Dimensions2d>(ancestor);
  } else {
    return Dimensions2d.fromScrollElementClient<Dimensions2d>();
  }
}
export {getAncestorDimensions};
