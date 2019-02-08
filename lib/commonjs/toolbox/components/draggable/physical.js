"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var _2d_1 = require("../physical/2d");
var event_handler_1 = require("../../utils/event/event-handler");
var drag_start_1 = require("./events/drag-start");
var drag_end_1 = require("./events/drag-end");
var drag_1 = require("./events/drag");
var move_event_1 = require("../physical/move-event");
var defaultPhysicallyDraggableConfig = {
    acceleration: _2d_1.defaultPhysical2dConfig.acceleration,
    draggableConstraints: [],
    maxVelocity: _2d_1.defaultPhysical2dConfig.maxVelocity,
    physicalConstraints: _2d_1.defaultPhysical2dConfig.constraints,
};
var PhysicallyDraggable = (function () {
    function PhysicallyDraggable(target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? defaultPhysicallyDraggableConfig.acceleration : _c, _d = _b.draggableConstraints, draggableConstraints = _d === void 0 ? defaultPhysicallyDraggableConfig.draggableConstraints : _d, _e = _b.maxVelocity, maxVelocity = _e === void 0 ? defaultPhysicallyDraggableConfig.maxVelocity : _e, _f = _b.physicalConstraints, physicalConstraints = _f === void 0 ? defaultPhysicallyDraggableConfig.physicalConstraints : _f;
        this.physical2d_ =
            new _2d_1.Physical2d(target, {
                acceleration: acceleration,
                constraints: physicalConstraints,
                maxVelocity: maxVelocity,
            });
        this.draggable_ =
            new base_1.Draggable(target, { constraints: draggableConstraints });
        this.init_();
    }
    PhysicallyDraggable.prototype.init_ = function () {
        var _this = this;
        event_handler_1.eventHandler.addListener(this.draggable_, drag_start_1.DragStart, function (event) {
            _this.physical2d_.disable();
            event_handler_1.eventHandler.dispatchEvent(new drag_start_1.DragStart(_this));
        });
        event_handler_1.eventHandler.addListener(this.draggable_, drag_1.Drag, function (event) {
            event_handler_1.eventHandler
                .dispatchEvent(new drag_1.Drag(_this, _this.getElement(), event.getDelta()));
        });
        event_handler_1.eventHandler.addListener(this.physical2d_, move_event_1.Move, function (event) {
            return event_handler_1.eventHandler
                .dispatchEvent(new move_event_1.Move(_this, _this.getElement(), event.getDistanceMoved(), event.getVelocity()));
        });
        event_handler_1.eventHandler.addListener(this.draggable_, drag_end_1.DragEnd, function (event) {
            _this.physical2d_.enable();
            _this.setVelocity(event.getEndVelocity());
            event_handler_1.eventHandler.dispatchEvent(new drag_end_1.DragEnd(_this, event.getEndVelocity()));
        });
    };
    PhysicallyDraggable.prototype.disablePhysicality = function () {
        this.physical2d_.disable();
    };
    PhysicallyDraggable.prototype.getElement = function () {
        return this.draggable_.getElement();
    };
    PhysicallyDraggable.prototype.setVelocity = function (velocity) {
        this.physical2d_.setVelocity(velocity);
    };
    return PhysicallyDraggable;
}());
exports.PhysicallyDraggable = PhysicallyDraggable;
//# sourceMappingURL=physical.js.map