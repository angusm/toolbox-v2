import { renderLoop } from '../../render-loop';
import { Vector2d } from "../../math/geometry/vector-2d";
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
import { setScroll } from "./set-scroll";
import { SCROLL_ELEMENT } from "./scroll-element";
import { applyScrollToScrollElement } from "./apply-scroll-to-scroll-element";
import { getClosestXScrollingElement } from "../ancestry/get-closest-x-scrolling-element";
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { forEach } from "../../iterable-iterator/for-each";
import { getClosestYScrollingElement } from "../ancestry/get-closest-y-scrolling-element";
var setToRun = false;
var scrollsToApply = DynamicDefaultMap.usingFunction(function () { return ZERO_VECTOR_2D; });
var measuredScrolls = DynamicDefaultMap.usingFunction(function (target) { return Vector2d.fromElementScroll(target); });
function applyScrollMutate_() {
    var values = scrollsToApply.entries();
    forEach(values, function (_a) {
        var target = _a[0], scrollToApply = _a[1];
        setScroll(measuredScrolls.get(target).add(scrollToApply), target);
    });
    scrollsToApply.clear();
    measuredScrolls.clear();
    setToRun = false;
}
function applyScroll(vector, target) {
    if (target === void 0) { target = SCROLL_ELEMENT; }
    if (target === SCROLL_ELEMENT) {
        applyScrollToScrollElement(vector);
        return;
    }
    var xTarget = getClosestXScrollingElement(target);
    scrollsToApply.set(xTarget, scrollsToApply.get(xTarget).add(vector.zeroY()));
    var yTarget = getClosestYScrollingElement(target);
    scrollsToApply.set(yTarget, scrollsToApply.get(yTarget).add(vector.zeroX()));
    if (!setToRun) {
        setToRun = true;
        renderLoop.anyMutate(function () { return applyScrollMutate_(); });
    }
}
export { applyScroll };
//# sourceMappingURL=apply-scroll.js.map