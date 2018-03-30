import { EventType } from './event-type';
var eventGroups = new Map([
    [
        EventType.INTERACT,
        [EventType.CLICK, EventType.ENTER_KEYPRESS, EventType.TOUCH]
    ],
    [
        EventType.CURSOR_DOWN,
        [EventType.MOUSE_DOWN, EventType.TOUCH_START]
    ],
    [
        EventType.CURSOR_MOVE,
        [EventType.MOUSE_MOVE, EventType.TOUCH_MOVE]
    ],
    [
        EventType.CURSOR_UP,
        [EventType.MOUSE_UP, EventType.TOUCH_END]
    ],
]);
export { eventGroups };
//# sourceMappingURL=event-groups.js.map