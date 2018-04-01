import { DynamicDefaultMap } from '../../map/dynamic-default';
import { builtIns } from './built-ins';
import { getSymbolString } from '../../symbol/get-symbol-string';
var uid = 0;
var uids = DynamicDefaultMap.usingFunction(function (eventType) {
    var eventString = getSymbolString(eventType);
    return builtIns.has(eventType) ? eventString : "CustomEvent_" + uid++;
});
export { uids };
//# sourceMappingURL=uids.js.map