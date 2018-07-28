import {Matrix} from "../../../utils/dom/position/matrix";
import {renderLoop} from "../../../utils/render-loop";
import {TEffectFunction} from "../types/timed-effect-function";

function generateScaleEffect(
  startScale: number, endScale: number, applyAsChange: boolean = true
): TEffectFunction {
  return function(
    target: HTMLElement, distanceAsPercent: number
  ) {
    const scale = startScale + ((endScale - startScale) * distanceAsPercent);
    const originalMatrix = Matrix.fromElementTransform(target);
    const scaleMatrix = originalMatrix.setScale(scale);

    if (applyAsChange) {
      scaleMatrix.applyToElementTransformAsChange(target, originalMatrix);
    } else {
      renderLoop.mutate(() => {
        scaleMatrix.applyToElementTransform(target)
      });
    }
  }
}

export {generateScaleEffect};
