"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var render_loop_1 = require("../../render-loop");
function translate2dOnScrollLoop(element, vector) {
    render_loop_1.renderLoop.scrollMeasure(function () {
        var targetMatrix = matrix_1.Matrix.fromElementTransform(element).translate(vector);
        render_loop_1.renderLoop.anyMutate(function () { return targetMatrix.applyToElementTransform(element); });
    });
}
exports.translate2dOnScrollLoop = translate2dOnScrollLoop;
//# sourceMappingURL=translate-2d-on-scroll-loop.js.map