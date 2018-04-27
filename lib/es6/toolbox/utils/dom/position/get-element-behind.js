import { frameMemoize } from '../../frame-memoize';
import { getVisibleArea } from "./get-visible-area";
import { max } from "../../array/max";
function getElementBehind_(target, candidates) {
    return max(candidates, function (candidate) { return getVisibleArea(target, candidate); });
}
var getElementBehind = frameMemoize(getElementBehind_);
export { getElementBehind };
//# sourceMappingURL=get-element-behind.js.map