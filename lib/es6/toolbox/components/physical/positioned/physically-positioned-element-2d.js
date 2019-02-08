import { renderLoop } from "../../../utils/render-loop";
import { Vector2d } from "../../../utils/math/geometry/vector-2d";
import { Matrix } from "../../../utils/dom/position/matrix";
var PhysicallyPositionedElement2d = (function () {
    function PhysicallyPositionedElement2d(target, physical2d) {
        this.target_ = target;
        this.physical2d_ = physical2d;
        this.nextFrameAdjustment_ = new Vector2d(0, 0);
        this.init_();
    }
    PhysicallyPositionedElement2d.prototype.adjustNextFrame = function (adjustment) {
        this.nextFrameAdjustment_ = this.nextFrameAdjustment_.add(adjustment);
    };
    PhysicallyPositionedElement2d.prototype.init_ = function () {
        this.render_();
    };
    PhysicallyPositionedElement2d.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () {
                _this.nextFrameAdjustment_ = new Vector2d(0, 0);
                _this.render_();
            });
            var targetMatrix = Matrix.fromElementTransform(_this.target_);
            renderLoop.mutate(function () {
                var velocity = _this.physical2d_.getLastAppliedVelocity();
                var adjustedDelta = velocity.add(_this.nextFrameAdjustment_);
                if (adjustedDelta.getLength() !== 0) {
                    targetMatrix
                        .translate(adjustedDelta)
                        .applyToElementTransform(_this.target_);
                }
            });
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