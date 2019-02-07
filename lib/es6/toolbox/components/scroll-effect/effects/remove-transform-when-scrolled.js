import { setStyle } from "../../../utils/dom/style/set-style";
import { renderLoop } from "../../../utils/render-loop";
var RemoveTransformWhenScrolled = (function () {
    function RemoveTransformWhenScrolled(minimumScrollDistance) {
        if (minimumScrollDistance === void 0) { minimumScrollDistance = 0; }
        this.minimumScrollDistance_ = minimumScrollDistance;
    }
    RemoveTransformWhenScrolled.prototype.run = function (target, distance, distanceAsPercent) {
        if (distance > this.minimumScrollDistance_) {
            renderLoop.scrollMutate(function () { return setStyle(target, 'transform', 'none'); });
        }
        else {
            renderLoop.scrollMutate(function () { return setStyle(target, 'transform', ''); });
        }
    };
    RemoveTransformWhenScrolled.prototype.destroy = function () { };
    return RemoveTransformWhenScrolled;
}());
export { RemoveTransformWhenScrolled };
//# sourceMappingURL=remove-transform-when-scrolled.js.map