import { Draggable } from "./base";
import { defaultPhysical2dConfig, Physical2D } from "../physical/2d";
import { eventHandler } from "../../utils/event/event-handler";
import { DragStart } from "./events/drag-start";
import { DragEnd } from "./events/drag-end";
import { Drag } from "./events/drag";
import { Move } from "../physical/move-event";
var defaultPhysicallyDraggableConfig = {
    acceleration: defaultPhysical2dConfig.acceleration,
    draggableConstraints: [],
    maxVelocity: defaultPhysical2dConfig.maxVelocity,
    physicalConstraints: defaultPhysical2dConfig.constraints,
};
var PhysicallyDraggable = (function () {
    function PhysicallyDraggable(target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? defaultPhysicallyDraggableConfig.acceleration : _c, _d = _b.draggableConstraints, draggableConstraints = _d === void 0 ? defaultPhysicallyDraggableConfig.draggableConstraints : _d, _e = _b.maxVelocity, maxVelocity = _e === void 0 ? defaultPhysicallyDraggableConfig.maxVelocity : _e, _f = _b.physicalConstraints, physicalConstraints = _f === void 0 ? defaultPhysicallyDraggableConfig.physicalConstraints : _f;
        this.physical2d_ =
            new Physical2D(target, {
                acceleration: acceleration,
                constraints: physicalConstraints,
                maxVelocity: maxVelocity,
            });
        this.draggable_ =
            new Draggable(target, { constraints: draggableConstraints });
        this.init_();
    }
    PhysicallyDraggable.prototype.init_ = function () {
        var _this = this;
        eventHandler.addListener(this.draggable_, DragStart, function (event) {
            _this.physical2d_.disable();
            eventHandler.dispatchEvent(new DragStart(_this));
        });
        eventHandler.addListener(this.draggable_, Drag, function (event) {
            _this.physical2d_.setVelocity(event.getDelta());
            eventHandler
                .dispatchEvent(new Drag(_this, _this.getElement(), event.getDelta()));
        });
        eventHandler.addListener(this.physical2d_, Move, function (event) {
            return eventHandler
                .dispatchEvent(new Move(_this, _this.getElement(), event.getDistanceMoved(), event.getVelocity()));
        });
        eventHandler.addListener(this.draggable_, DragEnd, function (event) {
            _this.physical2d_.enable();
            _this.setVelocity(event.getEndVelocity());
            eventHandler.dispatchEvent(new DragEnd(_this, event.getEndVelocity()));
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
export { PhysicallyDraggable };
//# sourceMappingURL=physical.js.map