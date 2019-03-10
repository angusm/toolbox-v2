"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var render_loop_1 = require("../../render-loop");
var dynamic_default_1 = require("../../map/dynamic-default");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
var translations = dynamic_default_1.DynamicDefaultMap.usingFunction(function (el) { return zero_vector_2d_1.ZERO_VECTOR_2D; });
var translatedElements = new Set();
var matrices = new Map();
function translate2d(element, vector) {
    var sourceMatrix = matrix_1.Matrix.fromElementTransform(element);
    matrices.set(element, sourceMatrix);
    translations.set(element, translations.get(element).add(vector));
    render_loop_1.renderLoop.anyMutate(function () {
        if (!translatedElements.has(element)) {
            matrices.get(element)
                .translate(translations.get(element))
                .applyToElementTransform(element);
        }
        translatedElements.add(element);
        render_loop_1.renderLoop.anyCleanup(function () {
            matrices.delete(element);
            translations.delete(element);
            translatedElements.delete(element);
        });
    });
}
exports.translate2d = translate2d;
//# sourceMappingURL=translate-2d.js.map