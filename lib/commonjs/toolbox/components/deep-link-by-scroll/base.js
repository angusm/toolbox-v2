"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
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
            render_loop_1.renderLoop.mutate(function () { return history.replaceState(undefined, undefined, currentAnchorId); });
        });
    };
    return DeepLinkByScroll;
}());
exports.DeepLinkByScroll = DeepLinkByScroll;
//# sourceMappingURL=base.js.map