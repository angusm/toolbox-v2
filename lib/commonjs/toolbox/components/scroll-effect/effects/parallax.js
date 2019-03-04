"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("../../../utils/dom/position/matrix");
var render_loop_1 = require("../../../utils/render-loop");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
var Parallax = (function () {
    function Parallax(ratio) {
        this.ratio_ = ratio;
    }
    Parallax.prototype.run = function (target, distance, distanceAsPercent) {
        var offset = distance * this.ratio_;
        var originalMatrix = matrix_1.Matrix.fromElementTransform(target);
        var translation = originalMatrix.set2dTranslation(new vector_2d_1.Vector2d(0, offset));
        render_loop_1.renderLoop.anyMutate(function () { return translation.applyToElementTransform(target); });
    };
    Parallax.prototype.destroy = function () { };
    return Parallax;
}());
exports.Parallax = Parallax;
//# sourceMappingURL=parallax.js.map