"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var render_loop_1 = require("../../render-loop");
function set2dTranslation(element, vector) {
    render_loop_1.renderLoop.measure(function () {
        render_loop_1.renderLoop.mutate(function () { return new matrix_1.Matrix().translate(vector).applyToElementTransform(element); });
    });
}
exports.set2dTranslation = set2dTranslation;
//# sourceMappingURL=set-2d-translation.js.map