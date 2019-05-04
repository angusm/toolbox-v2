"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
var set_scroll_1 = require("./set-scroll");
var scroll_element_1 = require("./scroll-element");
var apply_scroll_to_scroll_element_1 = require("./apply-scroll-to-scroll-element");
var get_closest_x_scrolling_element_1 = require("../ancestry/get-closest-x-scrolling-element");
var dynamic_default_1 = require("../../map/dynamic-default");
var for_each_1 = require("../../iterable-iterator/for-each");
var get_closest_y_scrolling_element_1 = require("../ancestry/get-closest-y-scrolling-element");
var setToRun = false;
var scrollsToApply = dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return zero_vector_2d_1.ZERO_VECTOR_2D; });
var measuredScrolls = dynamic_default_1.DynamicDefaultMap.usingFunction(function (target) { return vector_2d_1.Vector2d.fromElementScroll(target); });
function applyScrollMutate_() {
    var values = scrollsToApply.entries();
    for_each_1.forEach(values, function (_a) {
        var target = _a[0], scrollToApply = _a[1];
        set_scroll_1.setScroll(measuredScrolls.get(target).add(scrollToApply), target);
    });
    scrollsToApply.clear();
    measuredScrolls.clear();
    setToRun = false;
}
function applyScroll(vector, target) {
    if (target === void 0) { target = scroll_element_1.SCROLL_ELEMENT; }
    if (target === scroll_element_1.SCROLL_ELEMENT) {
        apply_scroll_to_scroll_element_1.applyScrollToScrollElement(vector);
        return;
    }
    var xTarget = get_closest_x_scrolling_element_1.getClosestXScrollingElement(target);
    scrollsToApply.set(xTarget, scrollsToApply.get(xTarget).add(vector.zeroY()));
    var yTarget = get_closest_y_scrolling_element_1.getClosestYScrollingElement(target);
    scrollsToApply.set(yTarget, scrollsToApply.get(yTarget).add(vector.zeroX()));
    if (!setToRun) {
        setToRun = true;
        render_loop_1.renderLoop.anyMutate(function () { return applyScrollMutate_(); });
    }
}
exports.applyScroll = applyScroll;
//# sourceMappingURL=apply-scroll.js.map