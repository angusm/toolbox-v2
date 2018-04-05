"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var set_style_1 = require("../../utils/dom/style/set-style");
var fixed_position_1 = require("../../utils/dom/style/fixed-position");
var initialPosition = new fixed_position_1.FixedPosition('initial', 'initial', 'initial', 'initial');
var FixedToAbsoluteTransition = (function () {
    function FixedToAbsoluteTransition(conditionFn, getAbsolutePositionFn, targetElement) {
        this.conditionFn_ = conditionFn;
        this.getAbsolutePositionFn_ = getAbsolutePositionFn;
        this.targetElement_ = targetElement;
        this.init_();
    }
    FixedToAbsoluteTransition.prototype.init_ = function () {
        this.render_();
    };
    FixedToAbsoluteTransition.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (_this.conditionFn_()) {
                _this.absolutePosition_();
            }
            else {
                _this.fixPosition_();
            }
        });
    };
    FixedToAbsoluteTransition.prototype.absolutePosition_ = function () {
        set_style_1.setStyle(this.targetElement_, 'position', 'absolute');
        this.getAbsolutePositionFn_().positionElement(this.targetElement_);
    };
    FixedToAbsoluteTransition.prototype.fixPosition_ = function () {
        set_style_1.setStyle(this.targetElement_, 'position', 'fixed');
        initialPosition.positionElement(this.targetElement_);
    };
    return FixedToAbsoluteTransition;
}());
exports.FixedToAbsoluteTransition = FixedToAbsoluteTransition;
//# sourceMappingURL=fixed-to-absolute-transition.js.map