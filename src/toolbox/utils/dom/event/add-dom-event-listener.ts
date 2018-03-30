import {eventGroups} from './event-groups';
import {EventType} from '../../types';
import {uids} from './uids';

function addDomEventListener(
  dispatcher: EventTarget, eventType: EventType,
  callback: EventListenerOrEventListenerObject
): [EventType, EventListenerOrEventListenerObject] {
  if (eventGroups.has(eventType)) {
    return eventGroups.get(eventType)
      .map(
        (subEventType: EventType) => {
          return addDomEventListener(dispatcher, subEventType, callback);
        });
  } else {
    const eventString = uids.get(eventType);
    dispatcher.addEventListener(eventString, callback);
    return [eventType, callback];
  }
}

export {addDomEventListener};
