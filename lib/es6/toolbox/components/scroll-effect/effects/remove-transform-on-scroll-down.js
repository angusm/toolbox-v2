import { Scroll } from "../../../utils/cached-vectors/scroll";
import { setStyle } from "../../../utils/dom/style/set-style";
var RemoveTransformOnScrollDown = (function () {
    function RemoveTransformOnScrollDown(minimumScrollDistance) {
        if (minimumScrollDistance === void 0) { minimumScrollDistance = 0; }
        this.minimumScrollDistance_ = minimumScrollDistance;
    }
    RemoveTransformOnScrollDown.prototype.run = function (target, distance, distanceAsPercent) {
        if (distance > this.minimumScrollDistance_ &&
            Scroll.getSingleton().isScrollingDown()) {
            setStyle(target, 'transform', 'none');
        }
        else {
            setStyle(target, 'transform', '');
        }
    };
    RemoveTransformOnScrollDown.prototype.destroy = function () { };
    return RemoveTransformOnScrollDown;
}());
export { RemoveTransformOnScrollDown };
//# sourceMappingURL=remove-transform-on-scroll-down.js.map