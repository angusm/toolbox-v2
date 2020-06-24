import {eventGroups} from './event-groups';
import {uids} from './uids';

function removeDomEventListener(
  dispatcher: EventTarget, eventType: symbol,
  callback: EventListenerOrEventListenerObject
): void {
  if (eventGroups.has(eventType)) {
    return eventGroups.get(eventType)
      .forEach(
        (subEventType: symbol) => {
          return removeDomEventListener(dispatcher, subEventType, callback);
        });
  } else {
    const eventString = uids.get(eventType);
    dispatcher.removeEventListener(eventString, callback);
  }
}

export {removeDomEventListener};
