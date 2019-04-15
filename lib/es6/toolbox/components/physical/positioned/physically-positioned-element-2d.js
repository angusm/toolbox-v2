import { renderLoop } from "../../../utils/render-loop";
import { translate2d } from "../../../utils/dom/position/translate-2d";
var PhysicallyPositionedElement2d = (function () {
    function PhysicallyPositionedElement2d(target, physical2d) {
        this.target_ = target;
        this.physical2d_ = physical2d;
        this.init_();
    }
    PhysicallyPositionedElement2d.prototype.adjustNextFrame = function (adjustment) {
        var _this = this;
        renderLoop.measure(function () { return translate2d(_this.target_, adjustment); });
    };
    PhysicallyPositionedElement2d.prototype.init_ = function () {
        this.render_();
    };
    PhysicallyPositionedElement2d.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var velocity = _this.physical2d_.getLastAppliedVelocity();
            translate2d(_this.target_, velocity);
        });
    };
    PhysicallyPositionedElement2d.prototype.disablePhysics = function () {
        this.physical2d_.disable();
    };
    PhysicallyPositionedElement2d.prototype.enablePhysics = function () {
        this.physical2d_.enable();
    };
    PhysicallyPositionedElement2d.prototype.setAcceleration = function (acceleration) {
        this.physical2d_.setAcceleration(acceleration);
    };
    PhysicallyPositionedElement2d.prototype.getVelocity = function () {
        return this.physical2d_.getVelocity();
    };
    PhysicallyPositionedElement2d.prototype.getBreakForce = function () {
        return this.physical2d_.getBreakForce();
    };
    PhysicallyPositionedElement2d.prototype.setVelocity = function (velocity) {
        this.physical2d_.setVelocity(velocity);
    };
    PhysicallyPositionedElement2d.prototype.getPhysical2d = function () {
        return this.physical2d_;
    };
    return PhysicallyPositionedElement2d;
}());
export { PhysicallyPositionedElement2d };
//# sourceMappingURL=physically-positioned-element-2d.js.map