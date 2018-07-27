import { Matrix } from "../../../utils/dom/position/matrix";
import { renderLoop } from "../../../utils/render-loop";
function generateScaleEffect(startScale, endScale, applyAsChange) {
    if (applyAsChange === void 0) { applyAsChange = true; }
    return function (target, distanceAsPercent) {
        var scale = startScale + ((endScale - startScale) * distanceAsPercent);
        var originalMatrix = Matrix.fromElementTransform(target);
        var scaleMatrix = originalMatrix.setScale(scale);
        renderLoop.mutate(function () {
            if (applyAsChange) {
                scaleMatrix.applyToElementTransformAsChange(target, originalMatrix);
            }
            else {
                scaleMatrix.applyToElementTransform(target);
            }
        });
    };
}
export { generateScaleEffect };
//# sourceMappingURL=scale.js.map