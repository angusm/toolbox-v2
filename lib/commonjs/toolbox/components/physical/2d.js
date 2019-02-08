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
    constraints: [],
    decelerationExponent: .9,
    deceleration: new vector_2d_1.Vector2d(0, 0),
    enabled: true,
    initialVelocity: new vector_2d_1.Vector2d(0, 0),
    maxVelocity: 6000,
};
exports.defaultPhysical2dConfig = defaultPhysical2dConfig;
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
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.enabled_) {
                return;
            }
            var elapsedTime = render_loop_1.renderLoop.getElapsedSeconds();
            _this.velocity_ =
                _this.velocity_
                    .add(_this.acceleration_.scale(elapsedTime))
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
    return Physical2d;
}());
exports.Physical2d = Physical2d;
//# sourceMappingURL=2d.js.map