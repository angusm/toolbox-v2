import { eventGroups } from './event-groups';
import { uids } from './uids';
function removeDomEventListener(dispatcher, eventType, callback) {
    if (eventGroups.has(eventType)) {
        return eventGroups.get(eventType)
            .forEach(function (subEventType) {
            return removeDomEventListener(dispatcher, subEventType, callback);
        });
    }
    else {
        var eventString = uids.get(eventType);
        dispatcher.removeEventListener(eventString, callback);
    }
}
export { removeDomEventListener };
//# sourceMappingURL=remove-dom-event-listener.js.map