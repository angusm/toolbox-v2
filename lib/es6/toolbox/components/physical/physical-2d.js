import { renderLoop } from "../../utils/render-loop";
import { Constraint2d } from "../../utils/math/geometry/2d-constraints/base";
import { eventHandler } from "../../utils/event/event-handler";
import { Move2d } from "./move-2d-event";
import { ZERO_VECTOR_2D } from "../../utils/math/geometry/zero-vector-2d";
var defaultPhysical2dConfig = {
    acceleration: ZERO_VECTOR_2D,
    breakForce: .99975,
    constraints: [],
    decelerationExponent: .95,
    deceleration: ZERO_VECTOR_2D,
    enabled: true,
    initialVelocity: ZERO_VECTOR_2D,
    minVelocity: 10,
};
var PredictedPhysical2dState = (function () {
    function PredictedPhysical2dState(distanceTraveled, velocity) {
        this.distanceTraveled = distanceTraveled;
        this.velocity = velocity;
    }
    return PredictedPhysical2dState;
}());
var Physical2d = (function () {
    function Physical2d(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? defaultPhysical2dConfig.acceleration : _c, _d = _b.breakForce, breakForce = _d === void 0 ? defaultPhysical2dConfig.breakForce : _d, _e = _b.constraints, constraints = _e === void 0 ? defaultPhysical2dConfig.constraints : _e, _f = _b.enabled, enabled = _f === void 0 ? defaultPhysical2dConfig.enabled : _f, _g = _b.initialVelocity, initialVelocity = _g === void 0 ? defaultPhysical2dConfig.initialVelocity : _g, _h = _b.minVelocity, minVelocity = _h === void 0 ? defaultPhysical2dConfig.minVelocity : _h;
        this.constraints_ = constraints;
        this.acceleration_ = acceleration;
        this.breakForce_ = breakForce;
        this.enabled_ = enabled;
        this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
        this.minVelocity_ = minVelocity;
        this.velocity_ = initialVelocity;
        this.render_();
    }
    Physical2d.prototype.setAcceleration = function (acceleration) {
        this.acceleration_ = acceleration;
    };
    Physical2d.prototype.break = function (breakForce) {
        this.breakForce_ = breakForce;
    };
    Physical2d.prototype.setDeceleration = function (deceleration) {
        this.setAcceleration(deceleration.invert());
    };
    Physical2d.prototype.disable = function () {
        this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
        this.enabled_ = false;
    };
    Physical2d.prototype.enable = function () {
        this.enabled_ = true;
    };
    Physical2d.prototype.isEnabled = function () {
        return this.enabled_;
    };
    Physical2d.prototype.getVelocity = function () {
        return this.velocity_;
    };
    Physical2d.prototype.setVelocity = function (velocity) {
        this.velocity_ = Constraint2d.applyConstraints(velocity, this.constraints_);
    };
    Physical2d.prototype.render_ = function () {
        var _this = this;
        renderLoop.physics(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.enabled_ ||
                (!_this.velocity_.getLength() && !_this.acceleration_.getLength())) {
                _this.lastAppliedVelocity_ = ZERO_VECTOR_2D;
                return;
            }
            var newState = _this.predictStateInXMilliseconds(renderLoop.getElapsedMilliseconds());
            _this.velocity_ = newState.velocity;
            _this.lastAppliedVelocity_ = newState.distanceTraveled;
            if (newState.distanceTraveled.getLength()) {
                eventHandler.dispatchEvent(new Move2d(_this, newState.distanceTraveled));
            }
        });
    };
    Physical2d.prototype.predictStateInXMilliseconds = function (milliseconds) {
        if (this.velocity_.getLength() < this.minVelocity_ &&
            this.acceleration_.getLength() === 0) {
            return new PredictedPhysical2dState(ZERO_VECTOR_2D, ZERO_VECTOR_2D);
        }
        var raisedBreakforce = Math.pow(this.breakForce_, milliseconds);
        var breakFactor = this.breakForce_ * (raisedBreakforce - 1) / (this.breakForce_ - 1);
        var scaledAccelPerMs = this.acceleration_.scale(breakFactor / 1000);
        var velocity = Constraint2d.applyConstraints(this.velocity_.scale(raisedBreakforce).add(scaledAccelPerMs), this.constraints_);
        var distance = Constraint2d.applyConstraints(this.velocity_.add(this.acceleration_).scale(breakFactor / 1000), this.constraints_);
        return new PredictedPhysical2dState(distance, velocity);
    };
    Physical2d.prototype.getLastAppliedVelocity = function () {
        return this.lastAppliedVelocity_;
    };
    Physical2d.prototype.getBreakForce = function () {
        return this.breakForce_;
    };
    return Physical2d;
}());
export { defaultPhysical2dConfig, Physical2d };
//# sourceMappingURL=physical-2d.js.map