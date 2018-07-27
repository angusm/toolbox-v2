import {TParallaxEffectFunction} from "../types/parallax-effect-function";
import {set2dTranslation} from "../../../utils/dom/position/set-2d-translation";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

function generateBasicParallaxEffect(ratio: number): TParallaxEffectFunction {
  return function(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ) {
    const offset = distance * ratio;
    set2dTranslation(target, new Vector2d(0, offset));
  }
}

export {generateBasicParallaxEffect};
