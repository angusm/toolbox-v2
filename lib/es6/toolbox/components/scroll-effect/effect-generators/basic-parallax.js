import { Matrix } from "../../../utils/dom/position/matrix";
import { renderLoop } from "../../../utils/render-loop";
import { Vector2d } from "../../../utils/math/geometry/vector-2d";
function generateBasicParallaxEffect(ratio, applyAsChange) {
    if (applyAsChange === void 0) { applyAsChange = false; }
    return function (target, distance, distanceAsPercent) {
        var offset = distance * ratio;
        var originalMatrix = Matrix.fromElementTransform(target);
        var translation = originalMatrix.set2dTranslation(new Vector2d(0, offset));
        renderLoop.mutate(function () {
            if (applyAsChange) {
                translation.applyToElementTransformAsChange(target, originalMatrix);
            }
            else {
                translation.applyToElementTransform(target);
            }
        });
    };
}
export { generateBasicParallaxEffect };
//# sourceMappingURL=basic-parallax.js.map