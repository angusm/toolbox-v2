"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
var set_scroll_top_1 = require("../../utils/dom/position/set-scroll-top");
var common_selector_1 = require("../../utils/dom/common-selector");
var windowScroll = scroll_1.Scroll.getSingleton();
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (windowScroll.getDelta().getLength() === 0) {
                return;
            }
            var currentAnchorId = "#" + _this.getCurrentAnchor_(_this.querySelector_).id;
            if (window.location.hash === currentAnchorId) {
                return;
            }
            var currentScroll = windowScroll.getPosition().y;
            render_loop_1.renderLoop.mutate(function () {
                history.replaceState(undefined, undefined, currentAnchorId);
                set_scroll_top_1.setScrollTop(currentScroll);
            });
        });
    };
    return DeepLinkByScroll;
}());
exports.DeepLinkByScroll = DeepLinkByScroll;
//# sourceMappingURL=base.js.map