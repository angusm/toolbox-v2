"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveTransformOnScrollDown = void 0;
var scroll_1 = require("../../../utils/cached-vectors/scroll");
var set_style_1 = require("../../../utils/dom/style/set-style");
var render_loop_1 = require("../../../utils/render-loop");
var RemoveTransformOnScrollDown = (function () {
    function RemoveTransformOnScrollDown(minimumScrollDistance) {
        if (minimumScrollDistance === void 0) { minimumScrollDistance = 0; }
        this.scroll_ = scroll_1.Scroll.getSingleton(this);
        this.minimumScrollDistance_ = minimumScrollDistance;
    }
    RemoveTransformOnScrollDown.prototype.run = function (target, distance, distanceAsPercent) {
        if (distance > this.minimumScrollDistance_ &&
            this.scroll_.isScrollingDown()) {
            render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(target, 'transform', 'none'); });
        }
        else {
            render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(target, 'transform', ''); });
        }
    };
    RemoveTransformOnScrollDown.prototype.destroy = function () {
        this.scroll_.destroy(this);
    };
    return RemoveTransformOnScrollDown;
}());
exports.RemoveTransformOnScrollDown = RemoveTransformOnScrollDown;
//# sourceMappingURL=remove-transform-on-scroll-down.js.map