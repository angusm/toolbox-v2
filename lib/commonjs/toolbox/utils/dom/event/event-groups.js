"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_type_1 = require("./event-type");
var eventGroups = new Map([
    [
        event_type_1.EventType.INTERACT,
        [event_type_1.EventType.CLICK, event_type_1.EventType.ENTER_KEYPRESS, event_type_1.EventType.TOUCH]
    ],
    [
        event_type_1.EventType.CURSOR_DOWN,
        [event_type_1.EventType.MOUSE_DOWN, event_type_1.EventType.TOUCH_START]
    ],
    [
        event_type_1.EventType.CURSOR_MOVE,
        [event_type_1.EventType.MOUSE_MOVE, event_type_1.EventType.TOUCH_MOVE]
    ],
    [
        event_type_1.EventType.CURSOR_UP,
        [event_type_1.EventType.MOUSE_UP, event_type_1.EventType.TOUCH_END]
    ],
]);
exports.eventGroups = eventGroups;
//# sourceMappingURL=event-groups.js.map