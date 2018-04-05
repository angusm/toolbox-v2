import { renderLoop } from "../../utils/render-loop";
import { setStyle } from "../../utils/dom/style/set-style";
import { FixedPosition } from "../../utils/dom/style/fixed-position";
var initialPosition = new FixedPosition('', '', '', '');
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
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
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
        renderLoop.mutate(function () {
            setStyle(_this.targetElement_, 'position', 'absolute');
            position.positionElement(_this.targetElement_);
        });
    };
    FixedToAbsoluteTransition.prototype.fixPosition_ = function () {
        var _this = this;
        renderLoop.mutate(function () {
            setStyle(_this.targetElement_, 'position', 'fixed');
            initialPosition.positionElement(_this.targetElement_);
        });
    };
    return FixedToAbsoluteTransition;
}());
export { FixedToAbsoluteTransition };
//# sourceMappingURL=fixed-to-absolute-transition.js.map