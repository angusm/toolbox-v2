import { Scroll } from '../../utils/cached-vectors/scroll';
import { renderLoop } from '../../utils/render-loop';
import { setScrollTop } from '../../utils/dom/position/set-scroll-top';
import { updateClassModifiers } from "../../utils/dom/update-class-modifiers";
import { CommonSelector } from "../../utils/dom/common-selector";
var windowScroll = Scroll.getSingleton();
var CLASS_NAME = 'deep-link-by-scroll';
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, querySelector, alterHash) {
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        if (alterHash === void 0) { alterHash = true; }
        this.alterHash_ = alterHash;
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        renderLoop.mutate(function () { return document.querySelector('html').classList.add(CLASS_NAME); });
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            renderLoop.mutate(function () {
                var html = document.querySelector('html');
                updateClassModifiers(html, CLASS_NAME, [currentAnchor.id]);
                if (!_this.alterHash_) {
                    return;
                }
                var currentScroll = windowScroll.getPosition().y;
                window.location.hash = currentAnchor.id;
                setScrollTop(currentScroll);
            });
        });
    };
    return DeepLinkByScroll;
}());
export { DeepLinkByScroll };
//# sourceMappingURL=base.js.map