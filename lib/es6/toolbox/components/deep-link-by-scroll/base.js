import { Scroll } from '../../utils/cached-vectors/scroll';
import { renderLoop } from '../../utils/render-loop';
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.windowScroll_ = Scroll.getSingleton();
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (_this.windowScroll_.getDelta().getLength() === 0) {
                return;
            }
            var currentAnchorId = "#" + _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            if (window.location.hash === currentAnchorId) {
                return;
            }
            renderLoop.mutate(function () { return history.replaceState(undefined, undefined, currentAnchorId); });
        });
    };
    return DeepLinkByScroll;
}());
export { DeepLinkByScroll };
//# sourceMappingURL=base.js.map