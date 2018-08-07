"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("../../../utils/dom/position/matrix");
var render_loop_1 = require("../../../utils/render-loop");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
function generateBasicParallaxEffect(ratio) {
    return function (target, distance, distanceAsPercent) {
        var offset = distance * ratio;
        var originalMatrix = matrix_1.Matrix.fromElementTransform(target);
        var translation = originalMatrix.set2dTranslation(new vector_2d_1.Vector2d(0, offset));
        render_loop_1.renderLoop.scrollMutate(function () { return translation.applyToElementTransform(target); });
    };
}
exports.generateBasicParallaxEffect = generateBasicParallaxEffect;
//# sourceMappingURL=basic-parallax.js.map