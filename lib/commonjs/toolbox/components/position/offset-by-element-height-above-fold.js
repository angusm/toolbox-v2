"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var get_visible_height_1 = require("../../utils/dom/position/get-visible-height");
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var set_2d_translation_1 = require("../../utils/dom/position/set-2d-translation");
var OffsetByElementHeightAboveFold = (function () {
    function OffsetByElementHeightAboveFold(targetElement, offsetElement) {
        this.targetElement_ = targetElement;
        this.offsetElement_ = offsetElement;
        this.init_();
    }
    OffsetByElementHeightAboveFold.prototype.init_ = function () {
        this.render_();
    };
    OffsetByElementHeightAboveFold.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var visibleHeight = get_visible_height_1.getVisibleHeight(_this.offsetElement_);
            render_loop_1.renderLoop.measure(function () {
                set_2d_translation_1.set2dTranslation(_this.targetElement_, new vector_2d_1.Vector2d(0, -visibleHeight));
            });
        });
    };
    return OffsetByElementHeightAboveFold;
}());
exports.OffsetByElementHeightAboveFold = OffsetByElementHeightAboveFold;
//# sourceMappingURL=offset-by-element-height-above-fold.js.map