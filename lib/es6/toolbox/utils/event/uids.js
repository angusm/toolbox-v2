import { DynamicDefaultMap } from '../map/dynamic-default';
var uid_ = 0;
var uids = DynamicDefaultMap.usingFunction(function (eventType) { return "CustomEvent_" + uid_++; });
export { uids };
//# sourceMappingURL=uids.js.map