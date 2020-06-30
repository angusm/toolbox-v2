"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = void 0;
var event_type_1 = require("../dom/event/event-type");
var add_dom_event_listener_1 = require("../dom/event/add-dom-event-listener");
var render_loop_1 = require("../render-loop");
var remove_dom_event_listener_1 = require("../dom/event/remove-dom-event-listener");
var cursor_data_1 = require("./cursor-data");
var cursor_position_1 = require("./cursor-position");
var singletonUses = new Set();
var singleton = null;
var Cursor = (function () {
    function Cursor() {
        var _this = this;
        this.clientPosition_ = new cursor_data_1.CursorData();
        this.pagePosition_ = new cursor_data_1.CursorData();
        this.screenPosition_ = new cursor_data_1.CursorData();
        this.pressed_ = false;
        this.frame_ = 0;
        this.cursorDownHandler_ =
            function (event) { return _this.updatePress_(event, true); };
        this.cursorUpHandler_ =
            function (event) { return _this.updatePress_(event, false); };
        this.cursorMoveHandler_ =
            function (event) { return _this.updatePosition_(event); };
        this.init_();
    }
    Cursor.prototype.init_ = function () {
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.CURSOR_DOWN, this.cursorDownHandler_);
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.CURSOR_UP, this.cursorUpHandler_);
        add_dom_event_listener_1.addDomEventListener(window, event_type_1.EventType.CURSOR_MOVE, this.cursorMoveHandler_);
    };
    Cursor.getSingleton = function (use) {
        singletonUses.add(use);
        if (singleton === null) {
            singleton = new Cursor();
        }
        return singleton;
    };
    Cursor.prototype.isPressed = function () {
        return this.pressed_;
    };
    Cursor.prototype.getClient = function () {
        return this.clientPosition_;
    };
    Cursor.prototype.getPage = function () {
        return this.pagePosition_;
    };
    Cursor.prototype.getScreen = function () {
        return this.screenPosition_;
    };
    Cursor.prototype.updatePress_ = function (event, isPressed) {
        this.pressed_ = isPressed;
        this.updatePosition_(event);
    };
    Cursor.prototype.updatePosition_ = function (event) {
        if (event instanceof MouseEvent) {
            this.updatePositionFromEvent_(event);
        }
        else if (event instanceof TouchEvent) {
            this.updatePositionFromTouchEvent_(event);
        }
    };
    Cursor.prototype.updatePositionFromTouchEvent_ = function (touchEvent) {
        if (touchEvent.touches.length > 0) {
            this.updatePositionFromEvent_(touchEvent.touches[0]);
        }
        else {
            this.endTouch_();
        }
    };
    Cursor.prototype.endTouch_ = function () {
        var _this = this;
        render_loop_1.renderLoop.premeasure(function () {
            _this.pagePosition_ = _this.duplicatePosition_(_this.pagePosition_);
            _this.clientPosition_ = _this.duplicatePosition_(_this.clientPosition_);
            _this.screenPosition_ = _this.duplicatePosition_(_this.screenPosition_);
        });
    };
    Cursor.prototype.updatePositionFromEvent_ = function (event) {
        var _this = this;
        render_loop_1.renderLoop.premeasure(function () {
            _this.pagePosition_ =
                _this.updatePositionWithXY_(_this.pagePosition_, event.pageX, event.pageY);
            _this.clientPosition_ =
                _this.updatePositionWithXY_(_this.clientPosition_, event.clientX, event.clientY);
            _this.screenPosition_ =
                _this.updatePositionWithXY_(_this.screenPosition_, event.screenX, event.screenY);
        });
    };
    Cursor.prototype.duplicatePosition_ = function (position) {
        return position.update(new cursor_position_1.CursorPosition(position.getPosition(), this.isPressed()));
    };
    Cursor.prototype.updatePositionWithXY_ = function (position, xValue, yValue) {
        return position.update(cursor_position_1.CursorPosition.fromXY(xValue, yValue, this.isPressed()));
    };
    Cursor.prototype.destroy = function (use) {
        if (this === singleton) {
            singletonUses.delete(use);
            if (singletonUses.size <= 0) {
                singleton = null;
                this.destroy_();
            }
        }
        else {
            this.destroy_();
        }
    };
    Cursor.prototype.destroy_ = function () {
        remove_dom_event_listener_1.removeDomEventListener(window, event_type_1.EventType.CURSOR_DOWN, this.cursorDownHandler_);
        remove_dom_event_listener_1.removeDomEventListener(window, event_type_1.EventType.CURSOR_UP, this.cursorUpHandler_);
        remove_dom_event_listener_1.removeDomEventListener(window, event_type_1.EventType.CURSOR_MOVE, this.cursorMoveHandler_);
    };
    return Cursor;
}());
exports.Cursor = Cursor;
//# sourceMappingURL=cursor.js.map