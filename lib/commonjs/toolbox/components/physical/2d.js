"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var render_loop_1 = require("../../utils/render-loop");
var base_1 = require("../../utils/math/geometry/2d-constraints/base");
var event_handler_1 = require("../../utils/event/event-handler");
var move_event_1 = require("./move-event");
var translate_2d_1 = require("../../utils/dom/position/translate-2d");
var MINIMUM_VELOCITY = 10;
var defaultPhysical2dConfig = {
    acceleration: new vector_2d_1.Vector2d(0, 0),
    accelerationExponent: 1,
    constraints: [],
    decelerationExponent: .9,
    deceleration: new vector_2d_1.Vector2d(0, 0),
    enabled: true,
    initialVelocity: new vector_2d_1.Vector2d(0, 0),
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
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.enabled_) {
                return;
            }
            var position = vector_2d_1.Vector2d.fromElementTransform(_this.element_);
            var elapsedTime = render_loop_1.renderLoop.getElapsedSeconds();
            _this.velocity_ =
                _this.velocity_
                    .add(_this.acceleration_.scale(elapsedTime))
                    .toNthPower(_this.accelerationExponent_)
                    .clampLength(_this.maxVelocity_);
            if (_this.velocity_.getLength() < MINIMUM_VELOCITY) {
                _this.velocity_ = new vector_2d_1.Vector2d(0, 0);
            }
            _this.velocity_ = base_1.Constraint2d.applyConstraints.apply(base_1.Constraint2d, [_this.velocity_].concat(_this.constraints_));
            var velocityToApply = _this.velocity_.scale(elapsedTime);
            event_handler_1.eventHandler
                .dispatchEvent(new move_event_1.Move(_this, _this.element_, velocityToApply, _this.velocity_));
            render_loop_1.renderLoop.mutate(function () { return translate_2d_1.translate2d(_this.element_, velocityToApply); });
        });
    };
    return Physical2D;
}());
exports.Physical2D = Physical2D;
//# sourceMappingURL=2d.js.map