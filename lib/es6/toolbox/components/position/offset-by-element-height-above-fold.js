import { renderLoop } from "../../utils/render-loop";
import { getVisibleHeight } from "../../utils/dom/position/vertical/get-visible-height";
import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { set2dTranslation } from "../../utils/dom/position/set-2d-translation";
var OffsetByElementHeightAboveFold = (function () {
    function OffsetByElementHeightAboveFold(targetElement, offsetElement) {
        this.targetElement_ = targetElement;
        this.offsetElement_ = offsetElement;
        this.init_();
    }
    OffsetByElementHeightAboveFold.prototype.init_ = function () {
        this.render_();
    };
    OffsetByElementHeightAboveFold.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var visibleHeight = getVisibleHeight(_this.offsetElement_);
            renderLoop.measure(function () {
                set2dTranslation(_this.targetElement_, new Vector2d(0, -visibleHeight));
            });
        });
    };
    return OffsetByElementHeightAboveFold;
}());
export { OffsetByElementHeightAboveFold };
//# sourceMappingURL=offset-by-element-height-above-fold.js.map