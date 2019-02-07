import { getVisibleArea } from "./get-visible-area";
import { max } from "../../array/max";
function getElementBehind(target, candidates) {
    return max(candidates, function (candidate) { return getVisibleArea(target, candidate); });
}
export { getElementBehind };
//# sourceMappingURL=get-element-behind.js.map