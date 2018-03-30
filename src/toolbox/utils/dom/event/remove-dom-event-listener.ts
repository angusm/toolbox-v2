import {eventGroups} from './event-groups';

function removeDomEventListener(
  element: EventTarget,
  eventType: string,
  callback: (
    EventListenerOrEventListenerObject|EventListenerOrEventListenerObject[])
): void {
  if (callback instanceof Array) {
    callback
      .forEach((cb) => removeDomEventListener(element, eventType, callback));
  } else if (eventGroups.has(eventType)) {
    eventGroups.get(eventType)
      .forEach(
        (subEventType) =>
          removeDomEventListener(element, subEventType, callback));
  } else {
    element
      .removeEventListener(
        eventType, <EventListenerOrEventListenerObject>callback);
  }
}

export {removeDomEventListener};
