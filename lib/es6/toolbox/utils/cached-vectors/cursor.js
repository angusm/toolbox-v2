import { EventType } from '../dom/event/event-type';
import { addDomEventListener } from '../dom/event/add-dom-event-listener';
import { renderLoop } from '../render-loop';
import { removeDomEventListener } from '../dom/event/remove-dom-event-listener';
import { CursorData } from './cursor-data';
import { CursorPosition } from './cursor-position';
var singletonUses = new Set();
var singleton = null;
var Cursor = (function () {
    function Cursor() {
        var _this = this;
        this.clientPosition_ = new CursorData();
        this.pagePosition_ = new CursorData();
        this.screenPosition_ = new CursorData();
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
        addDomEventListener(window, EventType.CURSOR_DOWN, this.cursorDownHandler_);
        addDomEventListener(window, EventType.CURSOR_UP, this.cursorUpHandler_);
        addDomEventListener(window, EventType.CURSOR_MOVE, this.cursorMoveHandler_);
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
        renderLoop.premeasure(function () {
            _this.pagePosition_ = _this.duplicatePosition_(_this.pagePosition_);
            _this.clientPosition_ = _this.duplicatePosition_(_this.clientPosition_);
            _this.screenPosition_ = _this.duplicatePosition_(_this.screenPosition_);
        });
    };
    Cursor.prototype.updatePositionFromEvent_ = function (event) {
        var _this = this;
        renderLoop.premeasure(function () {
            _this.pagePosition_ =
                _this.updatePositionWithXY_(_this.pagePosition_, event.pageX, event.pageY);
            _this.clientPosition_ =
                _this.updatePositionWithXY_(_this.clientPosition_, event.clientX, event.clientY);
            _this.screenPosition_ =
                _this.updatePositionWithXY_(_this.screenPosition_, event.screenX, event.screenY);
        });
    };
    Cursor.prototype.duplicatePosition_ = function (position) {
        return position.update(new CursorPosition(position.getPosition(), this.isPressed()));
    };
    Cursor.prototype.updatePositionWithXY_ = function (position, xValue, yValue) {
        return position.update(CursorPosition.fromXY(xValue, yValue, this.isPressed()));
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
        removeDomEventListener(window, EventType.CURSOR_DOWN, this.cursorDownHandler_);
        removeDomEventListener(window, EventType.CURSOR_UP, this.cursorUpHandler_);
        removeDomEventListener(window, EventType.CURSOR_MOVE, this.cursorMoveHandler_);
    };
    return Cursor;
}());
export { Cursor };
//# sourceMappingURL=cursor.js.map