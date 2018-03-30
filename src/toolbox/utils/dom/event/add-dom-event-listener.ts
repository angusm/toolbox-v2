import {eventGroups} from './event-groups';
import {uids} from './uids';

function addDomEventListener(
  dispatcher: EventTarget, eventType: symbol,
  callback: EventListenerOrEventListenerObject
): void {
  if (eventGroups.has(eventType)) {
    return eventGroups.get(eventType)
      .forEach(
        (subEventType: symbol) => {
          return addDomEventListener(dispatcher, subEventType, callback);
        });
  } else {
    const eventString = uids.get(eventType);
    dispatcher.addEventListener(eventString, callback);
  }
}

export {addDomEventListener};
