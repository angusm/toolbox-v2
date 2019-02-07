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
var translate_2d_1 = require("../../utils/dom/position/translate-2d");
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
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.CURSOR_UP, function () { return _this.endInteraction_(); });
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.DRAGSTART, function () { return _this.endInteraction_(); });
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.MOUSEOUT, function () { return _this.endInteraction_(); });
    };
    Draggable.prototype.startInteraction_ = function () {
        this.interacting_ = true;
        event_handler_1.eventHandler.dispatchEvent(new drag_start_1.DragStart(this));
    };
    Draggable.prototype.endInteraction_ = function () {
        this.interacting_ = false;
        event_handler_1.eventHandler.dispatchEvent(new drag_end_1.DragEnd(this));
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
        event_handler_1.eventHandler.dispatchEvent(new drag_1.Drag(this, this.element_, delta));
        translate_2d_1.translate2d(this.element_, delta);
    };
    Draggable.prototype.getDelta_ = function () {
        var _this = this;
        return this.constraints_.reduce(function (delta, constraint) { return constraint.constrainDelta(_this, delta); }, cursor_1.cursor.getClient().getPressedFrameDelta());
    };
    Draggable.prototype.getElement = function () {
        return this.element_;
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=base.js.map