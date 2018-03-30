import { getSymbolString } from '../../symbol/get-symbol-string';
function getEventString(eventType) {
    if (typeof eventType === 'string') {
        return eventType;
    }
    else if (typeof eventType === 'symbol') {
        return getSymbolString(eventType);
    }
}
export { getEventString };
//# sourceMappingURL=get-event-string.js.map