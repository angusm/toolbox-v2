import { Scroll } from '../../utils/cached-vectors/scroll';
import { renderLoop } from '../../utils/render-loop';
import { setScrollTop } from '../../utils/dom/position/set-scroll-top';
import { CommonSelector } from "../../utils/dom/common-selector";
var windowScroll = Scroll.getSingleton();
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (windowScroll.getDelta().getLength() === 0) {
                return;
            }
            var currentAnchorId = _this.getCurrentAnchor_(_this.querySelector_).id;
            if (window.location.hash === "#" + currentAnchorId) {
                return;
            }
            var currentScroll = windowScroll.getPosition().y;
            renderLoop.mutate(function () {
                window.location.hash = currentAnchorId;
                setScrollTop(currentScroll);
            });
        });
    };
    return DeepLinkByScroll;
}());
export { DeepLinkByScroll };
//# sourceMappingURL=base.js.map