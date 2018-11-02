"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../../utils/cached-vectors/scroll");
var set_style_1 = require("../../../utils/dom/style/set-style");
var RemoveTransformOnScrollDown = (function () {
    function RemoveTransformOnScrollDown(minimumScrollDistance) {
        if (minimumScrollDistance === void 0) { minimumScrollDistance = 0; }
        this.minimumScrollDistance_ = minimumScrollDistance;
    }
    RemoveTransformOnScrollDown.prototype.run = function (target, distance, distanceAsPercent) {
        if (distance > this.minimumScrollDistance_ &&
            scroll_1.Scroll.getSingleton().isScrollingDown()) {
            set_style_1.setStyle(target, 'transform', 'none');
        }
        else {
            set_style_1.setStyle(target, 'transform', '');
        }
    };
    RemoveTransformOnScrollDown.prototype.destroy = function () { };
    return RemoveTransformOnScrollDown;
}());
exports.RemoveTransformOnScrollDown = RemoveTransformOnScrollDown;
//# sourceMappingURL=remove-transform-on-scroll-down.js.map