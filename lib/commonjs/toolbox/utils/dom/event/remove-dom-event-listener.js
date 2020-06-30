"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDomEventListener = void 0;
var event_groups_1 = require("./event-groups");
var uids_1 = require("./uids");
function removeDomEventListener(dispatcher, eventType, callback) {
    if (event_groups_1.eventGroups.has(eventType)) {
        return event_groups_1.eventGroups.get(eventType)
            .forEach(function (subEventType) {
            return removeDomEventListener(dispatcher, subEventType, callback);
        });
    }
    else {
        var eventString = uids_1.uids.get(eventType);
        dispatcher.removeEventListener(eventString, callback);
    }
}
exports.removeDomEventListener = removeDomEventListener;
//# sourceMappingURL=remove-dom-event-listener.js.map