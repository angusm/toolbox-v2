"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
var drag_1 = require("./events/drag");
var drag_end_1 = require("./events/drag-end");
var drag_start_1 = require("./events/drag-start");
var event_type_1 = require("../../utils/dom/event/event-type");
var add_dom_event_listener_1 = require("../../utils/dom/event/add-dom-event-listener");
var cursor_1 = require("../../utils/cached-vectors/cursor");
var event_handler_1 = require("../../utils/event/event-handler");
var render_loop_1 = require("../../utils/render-loop");
var draggable_sync_manager_1 = require("./draggable-sync-manager");
var Draggable = (function () {
    function Draggable(element, _a) {
        var _b = (_a === void 0 ? {} : _a).constraints, constraints = _b === void 0 ? [] : _b;
        this.element_ = element;
        this.interacting_ = false;
        this.constraints_ = __spreadArrays(constraints);
        this.cursor_ = cursor_1.Cursor.getSingleton(this);
        this.init_();
    }
    Draggable.prototype.init_ = function () {
        this.initInteraction_();
        this.render_();
    };
    Draggable.prototype.initInteraction_ = function () {
        var _this = this;
        add_dom_event_listener_1.addDomEventListener(this.element_, event_type_1.EventType.CURSOR_DOWN, function () { return _this.startInteraction_(); });
        var endEventTypes = [event_type_1.EventType.CONTEXTMENU, event_type_1.EventType.DRAGSTART, event_type_1.EventType.CURSOR_UP];
        var endInteraction = function () { return _this.endInteraction_(); };
        endEventTypes.forEach(function (eventType) { return add_dom_event_listener_1.addDomEventListener(window, eventType, endInteraction); });
    };
    Draggable.prototype.startInteraction_ = function () {
        this.interacting_ = true;
        event_handler_1.eventHandler.dispatchEvent(new drag_start_1.DragStart(this));
    };
    Draggable.prototype.endInteraction_ = function () {
        var _this = this;
        if (!this.interacting_) {
            return;
        }
        this.interacting_ = false;
        render_loop_1.renderLoop.measure(function () {
            event_handler_1.eventHandler.dispatchEvent(new drag_end_1.DragEnd(_this, _this.getDelta_(), _this.cursor_.getClient().getLastFrameVelocity()));
        });
    };
    Draggable.prototype.isInteracting_ = function () {
        return this.interacting_;
    };
    Draggable.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            _this.renderDrag_();
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
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
        draggable_sync_manager_1.DraggableSyncManager.getSingleton().renderDrag(this, delta);
        event_handler_1.eventHandler.dispatchEvent(new drag_1.Drag(this, this.element_, delta));
    };
    Draggable.prototype.getDelta_ = function () {
        var _this = this;
        return this.constraints_.reduce(function (delta, constraint) { return constraint.constrain(_this, delta); }, this.cursor_.getClient().getPressedFrameDelta());
    };
    Draggable.prototype.getElement = function () {
        return this.element_;
    };
    Draggable.prototype.destroy = function () {
        this.cursor_.destroy(this);
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map