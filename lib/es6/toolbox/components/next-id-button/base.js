import { renderLoop } from "../../utils/render-loop";
import { getCurrentAnchorByVisibleOrSeen } from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
import { getNextAnchor } from "../../utils/dom/anchor/get-next-anchor";
import { isDisplayed } from "../../utils/dom/style/is-displayed";
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
            var nextAnchor = getNextAnchor(getCurrentAnchorByVisibleOrSeen, _this.getAnchorsFn_);
            if (nextAnchor) {
                var nextHref_1 = isDisplayed(nextAnchor) ?
                    "#" + nextAnchor.attributes.getNamedItem('id').value :
                    '';
                renderLoop.mutate(function () {
                    _this.element_.attributes.getNamedItem('href').value = nextHref_1;
                });
            }
        });
    };
    return NextIdButton;
}());
export { NextIdButton };
//# sourceMappingURL=base.js.map