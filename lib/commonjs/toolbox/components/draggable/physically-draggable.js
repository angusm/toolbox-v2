"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicallyDraggable = exports.defaultPhysicallyDraggableConfig = void 0;
var draggable_1 = require("./draggable");
var physical_2d_1 = require("../physical/physical-2d");
var event_handler_1 = require("../../utils/event/event-handler");
var drag_start_1 = require("./events/drag-start");
var drag_end_1 = require("./events/drag-end");
var drag_1 = require("./events/drag");
var physically_positioned_element_2d_1 = require("../physical/positioned/physically-positioned-element-2d");
var defaultPhysicallyDraggableConfig = {
    draggableConstraints: [],
    physical2d: null,
};
exports.defaultPhysicallyDraggableConfig = defaultPhysicallyDraggableConfig;
var PhysicallyDraggable = (function () {
    function PhysicallyDraggable(target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.DraggableClass, DraggableClass = _c === void 0 ? draggable_1.Draggable : _c, _d = _b.draggableConstraints, draggableConstraints = _d === void 0 ? defaultPhysicallyDraggableConfig.draggableConstraints : _d, _e = _b.physical2d, physical2d = _e === void 0 ? defaultPhysicallyDraggableConfig.physical2d : _e;
        var finalPhysical2d = physical2d === null ? new physical_2d_1.Physical2d() : physical2d;
        this.positioned2d_ =
            new physically_positioned_element_2d_1.PhysicallyPositionedElement2d(target, finalPhysical2d);
        this.draggable_ =
            new DraggableClass(target, { constraints: draggableConstraints });
        this.init_();
    }
    PhysicallyDraggable.prototype.init_ = function () {
        var _this = this;
        event_handler_1.eventHandler.addListener(this.draggable_, drag_start_1.DragStart, function (event) {
            _this.disablePhysics();
            event_handler_1.eventHandler.dispatchEvent(new drag_start_1.DragStart(_this));
        });
        event_handler_1.eventHandler.addListener(this.draggable_, drag_1.Drag, function (event) {
            event_handler_1.eventHandler
                .dispatchEvent(new drag_1.Drag(_this, _this.getElement(), event.getDelta()));
        });
        event_handler_1.eventHandler.addListener(this.draggable_, drag_end_1.DragEnd, function (event) {
            _this.enablePhysics();
            _this.setVelocity(event.getEndVelocity());
            event_handler_1.eventHandler
                .dispatchEvent(new drag_end_1.DragEnd(_this, event.getDelta(), event.getEndVelocity()));
        });
    };
    PhysicallyDraggable.prototype.disablePhysics = function () {
        this.positioned2d_.disablePhysics();
    };
    PhysicallyDraggable.prototype.enablePhysics = function () {
        this.positioned2d_.enablePhysics();
    };
    PhysicallyDraggable.prototype.getElement = function () {
        return this.draggable_.getElement();
    };
    PhysicallyDraggable.prototype.setAcceleration = function (acceleration) {
        this.positioned2d_.setAcceleration(acceleration);
    };
    PhysicallyDraggable.prototype.getVelocity = function () {
        return this.positioned2d_.getVelocity();
    };
    PhysicallyDraggable.prototype.getBreakForce = function () {
        return this.positioned2d_.getBreakForce();
    };
    PhysicallyDraggable.prototype.setVelocity = function (velocity) {
        this.positioned2d_.setVelocity(velocity);
    };
    PhysicallyDraggable.prototype.adjustNextFrame = function (adjustment) {
        this.positioned2d_.adjustNextFrame(adjustment);
    };
    PhysicallyDraggable.prototype.getPhysical2d = function () {
        return this.positioned2d_.getPhysical2d();
    };
    return PhysicallyDraggable;
}());
exports.PhysicallyDraggable = PhysicallyDraggable;
//# sourceMappingURL=physically-draggable.js.map