"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScaleEffect = void 0;
var matrix_1 = require("../../../utils/dom/position/matrix");
var render_loop_1 = require("../../../utils/render-loop");
function generateScaleEffect(startScale, endScale, applyAsChange) {
    if (applyAsChange === void 0) { applyAsChange = true; }
    return function (target, distanceAsPercent) {
        var scale = startScale + ((endScale - startScale) * distanceAsPercent);
        var originalMatrix = matrix_1.Matrix.fromElementTransform(target);
        var scaleMatrix = originalMatrix.setScale(scale);
        if (applyAsChange) {
            scaleMatrix.applyToElementTransformAsChange(target, originalMatrix);
        }
        else {
            render_loop_1.renderLoop.mutate(function () { return scaleMatrix.applyToElementTransform(target); });
        }
    };
}
exports.generateScaleEffect = generateScaleEffect;
//# sourceMappingURL=scale.js.map