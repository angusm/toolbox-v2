"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
var set_scroll_top_1 = require("../../utils/dom/position/set-scroll-top");
var windowScroll = scroll_1.Scroll.getSingleton();
var CLASS_NAME = 'deep-link-by-scroll';
function updateClassList(anchorId) {
    var classToAdd = CLASS_NAME + "--" + anchorId;
    var html = document.querySelector('html');
    var classesToRemove = Array.from(html.classList)
        .filter(function (className) {
        return className.indexOf(CLASS_NAME) !== -1 &&
            className !== CLASS_NAME &&
            className !== classToAdd;
    });
    classesToRemove.forEach(function (className) { return html.classList.remove(className); });
    if (!html.classList.contains(classToAdd)) {
        html.classList.add(classToAdd);
    }
}
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, alterHash) {
        if (alterHash === void 0) { alterHash = true; }
        this.alterHash_ = alterHash;
        this.getCurrentAnchor_ = getCurrentAnchorFn;
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
            var currentAnchor = _this.getCurrentAnchor_();
            render_loop_1.renderLoop.mutate(function () {
                updateClassList(currentAnchor.id);
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