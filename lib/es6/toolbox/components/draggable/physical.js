import { Draggable } from "./base";
import { Physical2D } from "../physical/2d";
import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { eventHandler } from "../../utils/event/event-handler";
import { DragStart } from "./events/drag-start";
import { DragEnd } from "./events/drag-end";
import { Drag } from "./events/drag";
import { Move } from "../physical/move-event";
var defaultPhysicallyDraggableConfig = {
    acceleration: new Vector2d(0, 0),
    accelerationExponent: .5,
    draggableConstraints: [],
    maxVelocity: 10,
    physicalConstraints: [],
};
var PhysicallyDraggable = (function () {
    function PhysicallyDraggable(target, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? defaultPhysicallyDraggableConfig.acceleration : _c, _d = _b.accelerationExponent, accelerationExponent = _d === void 0 ? defaultPhysicallyDraggableConfig.accelerationExponent : _d, _e = _b.draggableConstraints, draggableConstraints = _e === void 0 ? defaultPhysicallyDraggableConfig.draggableConstraints : _e, _f = _b.maxVelocity, maxVelocity = _f === void 0 ? defaultPhysicallyDraggableConfig.maxVelocity : _f, _g = _b.physicalConstraints, physicalConstraints = _g === void 0 ? defaultPhysicallyDraggableConfig.physicalConstraints : _g;
        this.physical2d_ =
            new Physical2D(target, {
                acceleration: acceleration,
                accelerationExponent: accelerationExponent,
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