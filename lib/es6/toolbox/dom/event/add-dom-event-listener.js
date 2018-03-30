import { eventGroups } from './event-groups';
import { uids } from './uids';
function addDomEventListener(dispatcher, eventType, callback) {
    if (eventGroups.has(eventType)) {
        return eventGroups.get(eventType)
            .map(function (subEventType) {
            return addDomEventListener(dispatcher, subEventType, callback);
        });
    }
    else {
        var eventString = uids.get(eventType);
        dispatcher.addEventListener(eventString, callback);
        return [eventType, callback];
    }
}
export { addDomEventListener };
//# sourceMappingURL=add-dom-event-listener.js.map