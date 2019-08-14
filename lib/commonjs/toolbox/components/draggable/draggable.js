"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("./events/drag");
var drag_end_1 = require("./events/drag-end");
var drag_start_1 = require("./events/drag-start");
var event_type_1 = require("../../utils/dom/event/event-type");
var add_dom_event_listener_1 = require("../../utils/dom/event/add-dom-event-listener");
var cursor_1 = require("../../utils/cached-vectors/cursor");
var event_handler_1 = require("../../utils/event/event-handler");
var render_loop_1 = require("../../utils/render-loop");
var draggable_sync_manager_1 = require("./draggable-sync-manager");
var set_style_1 = require("../../utils/dom/style/set-style");
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
        add_dom_event_listener_1.addDomEventListener(this.element_, event_type_1.EventType.CURSOR_DOWN, function () { return _this.startInteraction_(); });
        var endEventTypes = [event_type_1.EventType.CONTEXTMENU, event_type_1.EventType.DRAGSTART, event_type_1.EventType.CURSOR_UP];
        var endInteraction = function () { return _this.endInteraction_(); };
        endEventTypes.forEach(function (eventType) { return add_dom_event_listener_1.addDomEventListener(window, eventType, endInteraction); });
        add_dom_event_listener_1.addDomEventListener(this.element_, event_type_1.EventType.MOUSEOUT, function (event) {
            if (event.target === _this.element_) {
                _this.endInteraction_();
            }
        });
    };
    Draggable.prototype.startInteraction_ = function () {
        this.interacting_ = true;
        set_style_1.setStyle(this.element_, 'pointer-events', 'none');
        event_handler_1.eventHandler.dispatchEvent(new drag_start_1.DragStart(this));
    };
    Draggable.prototype.endInteraction_ = function () {
        var _this = this;
        if (!this.interacting_) {
            return;
        }
        this.interacting_ = false;
        render_loop_1.renderLoop.measure(function () {
            event_handler_1.eventHandler.dispatchEvent(new drag_end_1.DragEnd(_this, _this.getDelta_(), cursor_1.cursor.getClient().getLastFrameVelocity()));
        });
        render_loop_1.renderLoop.mutate(function () { return set_style_1.setStyle(_this.element_, 'pointer-events', ''); });
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
        return this.constraints_.reduce(function (delta, constraint) { return constraint.constrain(_this, delta); }, cursor_1.cursor.getClient().getPressedFrameDelta());
    };
    Draggable.prototype.getElement = function () {
        return this.element_;
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map