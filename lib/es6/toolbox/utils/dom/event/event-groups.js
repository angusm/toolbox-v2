import { EventType } from './event-type';
var eventGroups = new Map([
    [
        EventType.INTERACT,
        [EventType.CLICK, EventType.TOUCH]
    ],
    [
        EventType.CURSOR_DOWN,
        [EventType.MOUSEDOWN, EventType.TOUCHSTART]
    ],
    [
        EventType.CURSOR_MOVE,
        [EventType.MOUSEMOVE, EventType.TOUCHMOVE]
    ],
    [
        EventType.CURSOR_UP,
        [EventType.MOUSEUP, EventType.TOUCHEND]
    ],
]);
export { eventGroups };
//# sourceMappingURL=event-groups.js.map