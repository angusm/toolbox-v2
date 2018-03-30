var EventType = (function () {
    function EventType() {
    }
    EventType.CLICK = Symbol('click');
    EventType.ENTER_KEYPRESS = Symbol('enter keypress');
    EventType.INTERACT = Symbol('interact');
    EventType.MOUSE_DOWN = Symbol('mousedown');
    EventType.MOUSE_MOVE = Symbol('mousemove');
    EventType.MOUSE_UP = Symbol('mouseup');
    EventType.TOUCH = Symbol('touch');
    EventType.TOUCH_START = Symbol('touchstart');
    EventType.TOUCH_END = Symbol('touchend');
    EventType.TOUCH_MOVE = Symbol('touchmove');
    EventType.CURSOR_DOWN = Symbol('cursor down');
    EventType.CURSOR_MOVE = Symbol('cursor move');
    EventType.CURSOR_UP = Symbol('cursor up');
    return EventType;
}());
export { EventType };
//# sourceMappingURL=event-type.js.map