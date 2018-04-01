import { renderLoop } from "../../utils/render-loop";
import { isScrolledPast } from "../../utils/dom/position/is-scrolled-past";
import { updateClassModifiers } from "../../utils/dom/update-class-modifiers";
var CLASS_NAME = 'tb-id-marker';
var IdMarker = (function () {
    function IdMarker(elements) {
        this.elements_ = elements;
        this.init_();
    }
    IdMarker.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(_this.elements_)
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