import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { renderLoop } from "../../utils/render-loop";
import { Constraint2d } from "../../utils/math/geometry/2d-constraints/base";
import { eventHandler } from "../../utils/event/event-handler";
import { Move } from "./move-event";
var MINIMUM_VELOCITY = 10;
var defaultPhysical2dConfig = {
    acceleration: new Vector2d(0, 0),
    accelerationExponent: 1,
    constraints: [],
    decelerationExponent: .9,
    deceleration: new Vector2d(0, 0),
    enabled: true,
    initialVelocity: new Vector2d(0, 0),
    maxVelocity: 10,
};
var Physical2D = (function () {
    function Physical2D(element, _a) {
        var _b = _a.acceleration, acceleration = _b === void 0 ? defaultPhysical2dConfig.acceleration : _b, _c = _a.accelerationExponent, accelerationExponent = _c === void 0 ? defaultPhysical2dConfig.accelerationExponent : _c, _d = _a.constraints, constraints = _d === void 0 ? defaultPhysical2dConfig.constraints : _d, _e = _a.enabled, enabled = _e === void 0 ? defaultPhysical2dConfig.enabled : _e, _f = _a.initialVelocity, initialVelocity = _f === void 0 ? defaultPhysical2dConfig.initialVelocity : _f, _g = _a.maxVelocity, maxVelocity = _g === void 0 ? defaultPhysical2dConfig.maxVelocity : _g;
        this.element_ = element;
        this.constraints_ = constraints;
        this.acceleration_ = acceleration;
        this.accelerationExponent_ = accelerationExponent;
        this.enabled_ = enabled;
        this.maxVelocity_ = maxVelocity;
        this.velocity_ = initialVelocity;
        this.render_();
    }
    Physical2D.prototype.setAccelerationExponent = function (accelerationExponent) {
        this.accelerationExponent_ = accelerationExponent;
    };
    Physical2D.prototype.accelerate = function (acceleration) {
        this.acceleration_ = acceleration;
    };
    Physical2D.prototype.break = function (deceleration) {
        this.decelerate(deceleration);
    };
    Physical2D.prototype.decelerate = function (deceleration) {
        this.accelerate(deceleration.invert());
    };
    Physical2D.prototype.disable = function () {
        this.enabled_ = false;
    };
    Physical2D.prototype.enable = function () {
        this.enabled_ = true;
    };
    Physical2D.prototype.setVelocity = function (velocity) {
        this.velocity_ = velocity;
    };
    Physical2D.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.enabled_) {
                return;
            }
            var position = Vector2d.fromElementTransform(_this.element_);
            var elapsedTime = renderLoop.getElapsedSeconds();
            _this.velocity_ =
                _this.velocity_
                    .add(_this.acceleration_.scale(elapsedTime))
                    .toNthPower(_this.accelerationExponent_)
                    .clampLength(_this.maxVelocity_);
            if (_this.velocity_.getLength() < MINIMUM_VELOCITY) {
                _this.velocity_ = new Vector2d(0, 0);
            }
            _this.velocity_ = Constraint2d.applyConstraints.apply(Constraint2d, [_this.velocity_].concat(_this.constraints_));
            var velocityToApply = _this.velocity_.scale(elapsedTime);
            var updatedPosition = position.add(velocityToApply);
            eventHandler
                .dispatchEvent(new Move(_this, _this.element_, velocityToApply));
            renderLoop.mutate(function () { return updatedPosition.positionElementByTranslation(_this.element_); });
        });
    };
    return Physical2D;
}());
export { Physical2D };
//# sourceMappingURL=2d.js.map