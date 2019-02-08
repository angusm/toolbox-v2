import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { renderLoop } from "../../utils/render-loop";
import { Constraint2d } from "../../utils/math/geometry/2d-constraints/base";
import { eventHandler } from "../../utils/event/event-handler";
import { Move } from "./move-event";
import { translate2d } from "../../utils/dom/position/translate-2d";
var MINIMUM_VELOCITY = 10;
var defaultPhysical2dConfig = {
    acceleration: new Vector2d(0, 0),
    constraints: [],
    decelerationExponent: .9,
    deceleration: new Vector2d(0, 0),
    enabled: true,
    initialVelocity: new Vector2d(0, 0),
    maxVelocity: 6000,
};
var Physical2d = (function () {
    function Physical2d(element, _a) {
        var _b = _a.acceleration, acceleration = _b === void 0 ? defaultPhysical2dConfig.acceleration : _b, _c = _a.constraints, constraints = _c === void 0 ? defaultPhysical2dConfig.constraints : _c, _d = _a.enabled, enabled = _d === void 0 ? defaultPhysical2dConfig.enabled : _d, _e = _a.initialVelocity, initialVelocity = _e === void 0 ? defaultPhysical2dConfig.initialVelocity : _e, _f = _a.maxVelocity, maxVelocity = _f === void 0 ? defaultPhysical2dConfig.maxVelocity : _f;
        this.element_ = element;
        this.constraints_ = constraints;
        this.acceleration_ = acceleration;
        this.enabled_ = enabled;
        this.maxVelocity_ = maxVelocity;
        this.velocity_ = initialVelocity;
        this.render_();
    }
    Physical2d.prototype.accelerate = function (acceleration) {
        this.acceleration_ = acceleration;
    };
    Physical2d.prototype.break = function (deceleration) {
        this.decelerate(deceleration);
    };
    Physical2d.prototype.decelerate = function (deceleration) {
        this.accelerate(deceleration.invert());
    };
    Physical2d.prototype.disable = function () {
        this.enabled_ = false;
    };
    Physical2d.prototype.enable = function () {
        this.enabled_ = true;
    };
    Physical2d.prototype.setVelocity = function (velocity) {
        this.velocity_ = velocity;
    };
    Physical2d.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.enabled_) {
                return;
            }
            var elapsedTime = renderLoop.getElapsedSeconds();
            _this.velocity_ =
                _this.velocity_
                    .add(_this.acceleration_.scale(elapsedTime))
                    .clampLength(_this.maxVelocity_);
            if (_this.velocity_.getLength() < MINIMUM_VELOCITY) {
                _this.velocity_ = new Vector2d(0, 0);
            }
            _this.velocity_ = Constraint2d.applyConstraints.apply(Constraint2d, [_this.velocity_].concat(_this.constraints_));
            var velocityToApply = _this.velocity_.scale(elapsedTime);
            eventHandler
                .dispatchEvent(new Move(_this, _this.element_, velocityToApply, _this.velocity_));
            renderLoop.mutate(function () { return translate2d(_this.element_, velocityToApply); });
        });
    };
    return Physical2d;
}());
export { defaultPhysical2dConfig, Physical2d };
//# sourceMappingURL=2d.js.map