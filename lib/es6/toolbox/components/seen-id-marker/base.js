import { CommonSelector } from "../../utils/dom/common-selector";
import { isAbove } from "../../utils/dom/position/is-above";
import { renderLoop } from "../../utils/render-loop";
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
var CLASS_NAME = 'tb-id-marker';
var SeenIdMarker = (function () {
    function SeenIdMarker(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    SeenIdMarker.prototype.init_ = function () {
        this.render_();
    };
    SeenIdMarker.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.querySelector_))
                .filter(function (element) { return isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return SeenIdMarker;
}());
export { SeenIdMarker };
//# sourceMappingURL=base.js.map