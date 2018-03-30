function dispatchDomEvent(
  dispatcher: EventTarget, eventType: string, data: any) {
  const event: Event = document.createEvent('Event');

  // Define that the event name is 'build'.
  event.initEvent(eventType, true, true);

  // target can be any Element or other EventTarget.
  dispatcher.dispatchEvent(event);
}

export {dispatchDomEvent};