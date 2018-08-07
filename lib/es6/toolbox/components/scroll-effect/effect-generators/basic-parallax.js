import { Matrix } from "../../../utils/dom/position/matrix";
import { renderLoop } from "../../../utils/render-loop";
import { Vector2d } from "../../../utils/math/geometry/vector-2d";
function generateBasicParallaxEffect(ratio) {
    return function (target, distance, distanceAsPercent) {
        var offset = distance * ratio;
        var originalMatrix = Matrix.fromElementTransform(target);
        var translation = originalMatrix.set2dTranslation(new Vector2d(0, offset));
        renderLoop.scrollMutate(function () { return translation.applyToElementTransform(target); });
    };
}
export { generateBasicParallaxEffect };
//# sourceMappingURL=basic-parallax.js.map