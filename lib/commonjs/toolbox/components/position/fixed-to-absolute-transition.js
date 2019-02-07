"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var set_style_1 = require("../../utils/dom/style/set-style");
var fixed_position_1 = require("../../utils/dom/style/fixed-position");
var initialPosition = new fixed_position_1.FixedPosition('', '', '', '');
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
        var _this = this;
        var position = this.getAbsolutePositionFn_();
        render_loop_1.renderLoop.mutate(function () {
            set_style_1.setStyle(_this.targetElement_, 'position', 'absolute');
            position.positionElement(_this.targetElement_);
        });
    };
    FixedToAbsoluteTransition.prototype.fixPosition_ = function () {
        var _this = this;
        render_loop_1.renderLoop.mutate(function () {
            set_style_1.setStyle(_this.targetElement_, 'position', 'fixed');
            initialPosition.positionElement(_this.targetElement_);
        });
    };
    return FixedToAbsoluteTransition;
}());
exports.FixedToAbsoluteTransition = FixedToAbsoluteTransition;
//# sourceMappingURL=fixed-to-absolute-transition.js.map