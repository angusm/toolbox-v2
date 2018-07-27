import {TParallaxEffectFunction} from "../types/parallax-effect-function";
import {Matrix} from "../../../utils/dom/position/matrix";
import {renderLoop} from "../../../utils/render-loop";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

function generateBasicParallaxEffect(
  ratio: number, applyAsChange: boolean = false
): TParallaxEffectFunction {
  return function(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ) {
    const offset = distance * ratio;
    const originalMatrix = Matrix.fromElementTransform(target);
    const translation =
      originalMatrix.set2dTranslation(new Vector2d(0, offset));
    renderLoop.mutate(() => {
      if (applyAsChange) {
        translation.applyToElementTransformAsChange(target, originalMatrix);
      } else {
        translation.applyToElementTransform(target)
      }
    });
  }
}

export {generateBasicParallaxEffect};