import { isAbove } from "../../utils/dom/position/is-above";
import { renderLoop } from "../../utils/render-loop";
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
var CLASS_NAME = 'tb-id-marker';
var SeenIdMarker = (function () {
    function SeenIdMarker(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    SeenIdMarker.prototype.init_ = function () {
        this.render_();
    };
    SeenIdMarker.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchor = _this.getCurrentAnchor_(_this.getAnchorsFn_);
            var html = document.querySelector('html');
            var scrolledPastIds = _this.getAnchorsFn_()
                .filter(function (element) { return isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
        });
    };
    return SeenIdMarker;
}());
export { SeenIdMarker };
//# sourceMappingURL=base.js.map