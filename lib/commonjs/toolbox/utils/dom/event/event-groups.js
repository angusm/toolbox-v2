"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_type_1 = require("./event-type");
var eventGroups = new Map([
    [
        event_type_1.EventType.INTERACT,
        [event_type_1.EventType.CLICK, event_type_1.EventType.TOUCH]
    ],
    [
        event_type_1.EventType.CURSOR_DOWN,
        [event_type_1.EventType.MOUSEDOWN, event_type_1.EventType.TOUCHSTART]
    ],
    [
        event_type_1.EventType.CURSOR_MOVE,
        [event_type_1.EventType.MOUSEMOVE, event_type_1.EventType.TOUCHMOVE]
    ],
    [
        event_type_1.EventType.CURSOR_UP,
        [event_type_1.EventType.MOUSEUP, event_type_1.EventType.TOUCHEND]
    ],
]);
exports.eventGroups = eventGroups;
//# sourceMappingURL=event-groups.js.map