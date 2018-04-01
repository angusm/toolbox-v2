"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
var set_scroll_top_1 = require("../../utils/dom/position/set-scroll-top");
var update_class_modifiers_1 = require("../../utils/dom/update-class-modifiers");
var common_selector_1 = require("../../utils/dom/common-selector");
var windowScroll = scroll_1.Scroll.getSingleton();
var CLASS_NAME = 'deep-link-by-scroll';
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, querySelector, alterHash) {
        if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
        if (alterHash === void 0) { alterHash = true; }
        this.alterHash_ = alterHash;
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        render_loop_1.renderLoop.mutate(function () { return document.querySelector('html').classList.add(CLASS_NAME); });
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            render_loop_1.renderLoop.mutate(function () {
                var html = document.querySelector('html');
                update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, [currentAnchor.id]);
                if (!_this.alterHash_) {
                    return;
                }
                var currentScroll = windowScroll.getPosition().y;
                window.location.hash = currentAnchor.id;
                set_scroll_top_1.setScrollTop(currentScroll);
            });
        });
    };
    return DeepLinkByScroll;
}());
exports.DeepLinkByScroll = DeepLinkByScroll;
//# sourceMappingURL=base.js.map