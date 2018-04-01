function dispatchDomEvent(dispatcher, eventType, data) {
    var event = document.createEvent('Event');
    event.initEvent(eventType, true, true);
    dispatcher.dispatchEvent(event);
}
export { dispatchDomEvent };
//# sourceMappingURL=dispatch-dom-event.js.map