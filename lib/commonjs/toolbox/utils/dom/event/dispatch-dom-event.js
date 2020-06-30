"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchDomEvent = void 0;
function dispatchDomEvent(dispatcher, eventType, data) {
    var event = document.createEvent('Event');
    event.initEvent(eventType, true, true);
    dispatcher.dispatchEvent(event);
}
exports.dispatchDomEvent = dispatchDomEvent;
//# sourceMappingURL=dispatch-dom-event.js.map