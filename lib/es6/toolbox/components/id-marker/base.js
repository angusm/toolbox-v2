import { renderLoop } from "../../utils/render-loop";
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
import { CommonSelector } from "../../utils/dom/common-selector";
import { isAbove } from "../../utils/dom/position/is-above";
var CLASS_NAME = 'tb-id-marker';
var IdMarker = (function () {
    function IdMarker(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    IdMarker.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.querySelector_))
                .filter(function (element) { return isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; });
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            renderLoop.cleanup(function () { return _this.init_(); });
        });
    };
    return IdMarker;
}());
export { IdMarker };
//# sourceMappingURL=base.js.map