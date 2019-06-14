import { Drag } from './events/drag';
import { DragEnd } from './events/drag-end';
import { DragStart } from './events/drag-start';
import { EventType } from '../../utils/dom/event/event-type';
import { addDomEventListener } from '../../utils/dom/event/add-dom-event-listener';
import { cursor } from '../../utils/cached-vectors/cursor';
import { eventHandler } from '../../utils/event/event-handler';
import { renderLoop } from '../../utils/render-loop';
import { DraggableSyncManager } from "./draggable-sync-manager";
var Draggable = (function () {
    function Draggable(element, _a) {
        var _b = (_a === void 0 ? {} : _a).constraints, constraints = _b === void 0 ? [] : _b;
        this.element_ = element;
        this.interacting_ = false;
        this.constraints_ = constraints.slice();
        this.init_();
    }
    Draggable.prototype.init_ = function () {
        this.initInteraction_();
        this.render_();
    };
    Draggable.prototype.initInteraction_ = function () {
        var _this = this;
        addDomEventListener(this.element_, EventType.CURSOR_DOWN, function () { return _this.startInteraction_(); });
        var endEventTypes = [EventType.CONTEXTMENU, EventType.DRAGSTART, EventType.CURSOR_UP];
        var endInteraction = function () { return _this.endInteraction_(); };
        endEventTypes.forEach(function (eventType) { return addDomEventListener(window, eventType, endInteraction); });
        addDomEventListener(this.element_, EventType.MOUSEOUT, function (event) {
            if (event.target === _this.element_) {
                _this.endInteraction_();
            }
        });
    };
    Draggable.prototype.startInteraction_ = function () {
        this.interacting_ = true;
        eventHandler.dispatchEvent(new DragStart(this));
    };
    Draggable.prototype.endInteraction_ = function () {
        var _this = this;
        if (!this.interacting_) {
            return;
        }
        this.interacting_ = false;
        renderLoop.measure(function () {
            eventHandler.dispatchEvent(new DragEnd(_this, _this.getDelta_(), cursor.getClient().getLastFrameVelocity()));
        });
    };
    Draggable.prototype.isInteracting_ = function () {
        return this.interacting_;
    };
    Draggable.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            _this.renderDrag_();
            renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    Draggable.prototype.renderDrag_ = function () {
        if (!this.isInteracting_()) {
            return;
        }
        var delta = this.getDelta_();
        if (!delta.getLength()) {
            return;
        }
        DraggableSyncManager.getSingleton().renderDrag(this, delta);
        eventHandler.dispatchEvent(new Drag(this, this.element_, delta));
    };
    Draggable.prototype.getDelta_ = function () {
        var _this = this;
        return this.constraints_.reduce(function (delta, constraint) { return constraint.constrain(_this, delta); }, cursor.getClient().getPressedFrameDelta());
    };
    Draggable.prototype.getElement = function () {
        return this.element_;
    };
    return Draggable;
}());
export { Draggable };
//# sourceMappingURL=draggable.js.map