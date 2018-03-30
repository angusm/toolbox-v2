import { DynamicDefaultMap } from '../../map/dynamic-default';
import { builtIns } from './built-ins';
import { getEventString } from './get-event-string';
var uid = 0;
var uids = DynamicDefaultMap.usingFunction(function (eventType) {
    var eventString = getEventString(eventType);
    return builtIns.has(eventString) ? eventString : "CustomEvent_" + uid++;
});
export { uids };
//# sourceMappingURL=uids.js.map