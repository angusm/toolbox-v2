"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepLinkByScroll = void 0;
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.windowScroll_ = scroll_1.Scroll.getSingleton(this);
        this.destroyed_ = false;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (_this.windowScroll_.getDelta().getLength() === 0) {
                return;
            }
            var currentAnchorId = "#" + _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            if (window.location.hash === currentAnchorId) {
                return;
            }
            render_loop_1.renderLoop.mutate(function () { return history.replaceState(undefined, undefined, currentAnchorId); });
        });
    };
    DeepLinkByScroll.prototype.destroy = function () {
        this.destroyed_ = true;
        this.windowScroll_.destroy(this);
    };
    return DeepLinkByScroll;
}());
exports.DeepLinkByScroll = DeepLinkByScroll;
//# sourceMappingURL=base.js.map