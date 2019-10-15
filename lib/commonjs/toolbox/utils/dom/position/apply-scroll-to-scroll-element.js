"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
var scroll_1 = require("../../cached-vectors/scroll");
var set_scroll_1 = require("./set-scroll");
var scrollToApply = zero_vector_2d_1.ZERO_VECTOR_2D;
var setToRun = false;
function applyScrollToScrollElement(vector, _a) {
    var _b = (_a === void 0 ? {} : _a).applyImmediately, applyImmediately = _b === void 0 ? false : _b;
    scrollToApply = scrollToApply.add(vector);
    if (setToRun) {
        return;
    }
    setToRun = true;
    var apply = function () {
        set_scroll_1.setScroll(scroll_1.Scroll.getSingleton().getPosition().add(scrollToApply));
        scrollToApply = zero_vector_2d_1.ZERO_VECTOR_2D;
        setToRun = false;
    };
    if (applyImmediately) {
        apply();
    }
    else {
        render_loop_1.renderLoop.anyMutate(apply);
    }
}
exports.applyScrollToScrollElement = applyScrollToScrollElement;
//# sourceMappingURL=apply-scroll-to-scroll-element.js.map