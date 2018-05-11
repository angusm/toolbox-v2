import { renderLoop } from "../../utils/render-loop";
import { getCurrentAnchorByVisibleOrSeen } from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";
var NextIdButton = (function () {
    function NextIdButton(element, querySelector) {
        this.element_ = element;
        this.querySelector_ = querySelector;
        this.render_();
    }
    NextIdButton.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var anchors = Array.from(document.querySelectorAll(_this.querySelector_));
            var currentAnchor = getCurrentAnchorByVisibleOrSeen(_this.querySelector_);
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