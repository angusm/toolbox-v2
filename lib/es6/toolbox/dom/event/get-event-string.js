import { builtIns } from './built-ins';
import { getSymbolString } from '../../symbol/get-symbol-string';
function getEventString(eventType) {
    return builtIns.has(eventType) ? eventType : getSymbolString(eventType);
}
export { getEventString };
//# sourceMappingURL=get-event-string.js.map