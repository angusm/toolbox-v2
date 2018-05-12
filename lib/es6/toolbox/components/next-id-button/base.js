import { renderLoop } from "../../utils/render-loop";
import { getCurrentAnchorByVisibleOrSeen } from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
var NextIdButton = (function () {
    function NextIdButton(element, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
        this.element_ = element;
        this.getAnchorsFn_ = getAnchorsFn;
        this.render_();
    }
    NextIdButton.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var anchors = _this.getAnchorsFn_();
            var currentAnchor = getCurrentAnchorByVisibleOrSeen(_this.getAnchorsFn_);
            var nextIndex = anchors.indexOf(currentAnchor) + 1;
            var nextId = anchors[nextIndex].attributes.getNamedItem('id').value;
            if (nextIndex < anchors.length) {
                renderLoop.mutate(function () {
                    _this.element_.attributes.getNamedItem('href').value = '#' + nextId;
                });
            }
        });
    };
    return NextIdButton;
}());
export { NextIdButton };
//# sourceMappingURL=base.js.map