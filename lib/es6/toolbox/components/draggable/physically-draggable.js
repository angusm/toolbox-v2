import { Draggable } from "./draggable";
import { Physical2d } from "../physical/physical-2d";
import { eventHandler } from "../../utils/event/event-handler";
import { DragStart } from "./events/drag-start";
import { DragEnd } from "./events/drag-end";
import { Drag } from "./events/drag";
import { PhysicallyPositionedElement2d } from "../physical/positioned/physically-positioned-element-2d";
var defaultPhysicallyDraggableConfig = {
    draggableConstraints: [],
    physical2d: null,
};
var PhysicallyDraggable = (function () {
    function PhysicallyDraggable(target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.DraggableClass, DraggableClass = _c === void 0 ? Draggable : _c, _d = _b.draggableConstraints, draggableConstraints = _d === void 0 ? defaultPhysicallyDraggableConfig.draggableConstraints : _d, _e = _b.physical2d, physical2d = _e === void 0 ? defaultPhysicallyDraggableConfig.physical2d : _e;
        var finalPhysical2d = physical2d === null ? new Physical2d() : physical2d;
        this.positioned2d_ =
            new PhysicallyPositionedElement2d(target, finalPhysical2d);
        this.draggable_ =
            new DraggableClass(target, { constraints: draggableConstraints });
        this.init_();
    }
    PhysicallyDraggable.prototype.init_ = function () {
        var _this = this;
        eventHandler.addListener(this.draggable_, DragStart, function (event) {
            _this.disablePhysics();
            eventHandler.dispatchEvent(new DragStart(_this));
        });
        eventHandler.addListener(this.draggable_, Drag, function (event) {
            eventHandler
                .dispatchEvent(new Drag(_this, _this.getElement(), event.getDelta()));
        });
        eventHandler.addListener(this.draggable_, DragEnd, function (event) {
            _this.enablePhysics();
            _this.setVelocity(event.getEndVelocity());
            eventHandler
                .dispatchEvent(new DragEnd(_this, event.getDelta(), event.getEndVelocity()));
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
export { defaultPhysicallyDraggableConfig, PhysicallyDraggable };
//# sourceMappingURL=physically-draggable.js.map