"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var render_loop_1 = require("../../render-loop");
function translate2d(element, vector) {
    render_loop_1.renderLoop.measure(function () {
        var targetMatrix = matrix_1.Matrix.fromElementTransform(element).translate(vector);
        render_loop_1.renderLoop.mutate(function () { return targetMatrix.applyToElementTransform(element); });
    });
}
exports.translate2d = translate2d;
//# sourceMappingURL=translate-2d.js.map