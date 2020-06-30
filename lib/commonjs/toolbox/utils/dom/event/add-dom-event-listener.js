"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDomEventListener = void 0;
var event_groups_1 = require("./event-groups");
var uids_1 = require("./uids");
function addDomEventListener(dispatcher, eventType, callback) {
    if (event_groups_1.eventGroups.has(eventType)) {
        return event_groups_1.eventGroups.get(eventType)
            .forEach(function (subEventType) {
            return addDomEventListener(dispatcher, subEventType, callback);
        });
    }
    else {
        var eventString = uids_1.uids.get(eventType);
        dispatcher.addEventListener(eventString, callback);
    }
}
exports.addDomEventListener = addDomEventListener;
//# sourceMappingURL=add-dom-event-listener.js.map