import { renderLoop } from "../../utils/render-loop";
import { isScrolledPast } from "../../utils/dom/position/is-scrolled-past";
import { updateClassModifiers } from "../../utils/dom/update-class-modifiers";
import { CommonSelector } from "../../utils/dom/common-selector";
var CLASS_NAME = 'tb-id-marker';
var IdMarker = (function () {
    function IdMarker(selector) {
        if (selector === void 0) { selector = CommonSelector.DEEP_LINK_TARGETS; }
        this.selector_ = selector;
        this.init_();
    }
    IdMarker.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.selector_))
                .filter(function (element) { return isScrolledPast(element); })
                .map(function (element) { return element.id; });
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            renderLoop.cleanup(function () { return _this.init_(); });
        });
    };
    return IdMarker;
}());
export { IdMarker };
//# sourceMappingURL=base.js.map