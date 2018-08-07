import { Matrix } from "../../../utils/dom/position/matrix";
import { renderLoop } from "../../../utils/render-loop";
import { Vector2d } from "../../../utils/math/geometry/vector-2d";
var Parallax = (function () {
    function Parallax(ratio) {
        this.ratio_ = ratio;
    }
    Parallax.prototype.run = function (target, distance, distanceAsPercent) {
        var offset = distance * this.ratio_;
        var originalMatrix = Matrix.fromElementTransform(target);
        var translation = originalMatrix.set2dTranslation(new Vector2d(0, offset));
        renderLoop.scrollMutate(function () { return translation.applyToElementTransform(target); });
    };
    Parallax.prototype.destroy = function () { };
    return Parallax;
}());
export { Parallax };
//# sourceMappingURL=parallax.js.map