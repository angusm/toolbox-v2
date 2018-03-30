import { eventGroups } from './event-groups';
function removeDomEventListener(element, eventType, callback) {
    if (callback instanceof Array) {
        callback
            .forEach(function (cb) { return removeDomEventListener(element, eventType, callback); });
    }
    else if (eventGroups.has(eventType)) {
        eventGroups.get(eventType)
            .forEach(function (subEventType) {
            return removeDomEventListener(element, subEventType, callback);
        });
    }
    else {
        element
            .removeEventListener(eventType, callback);
    }
}
export { removeDomEventListener };
//# sourceMappingURL=remove-dom-event-listener.js.map