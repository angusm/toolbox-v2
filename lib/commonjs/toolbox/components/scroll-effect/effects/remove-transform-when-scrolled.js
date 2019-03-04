"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var set_style_1 = require("../../../utils/dom/style/set-style");
var render_loop_1 = require("../../../utils/render-loop");
var RemoveTransformWhenScrolled = (function () {
    function RemoveTransformWhenScrolled(minimumScrollDistance) {
        if (minimumScrollDistance === void 0) { minimumScrollDistance = 0; }
        this.minimumScrollDistance_ = minimumScrollDistance;
    }
    RemoveTransformWhenScrolled.prototype.run = function (target, distance, distanceAsPercent) {
        if (distance > this.minimumScrollDistance_) {
            render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(target, 'transform', 'none'); });
        }
        else {
            render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(target, 'transform', ''); });
        }
    };
    RemoveTransformWhenScrolled.prototype.destroy = function () { };
    return RemoveTransformWhenScrolled;
}());
exports.RemoveTransformWhenScrolled = RemoveTransformWhenScrolled;
//# sourceMappingURL=remove-transform-when-scrolled.js.map