"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../render-loop");
var zero_vector_2d_1 = require("../../math/geometry/zero-vector-2d");
var scroll_1 = require("../../cached-vectors/scroll");
var set_scroll_1 = require("./set-scroll");
var scrollToApply = zero_vector_2d_1.ZERO_VECTOR_2D;
var currentScroll = scroll_1.Scroll.getSingleton();
var setToRun = false;
function applyScroll(vector) {
    scrollToApply = scrollToApply.add(vector);
    if (setToRun) {
        return;
    }
    setToRun = true;
    render_loop_1.renderLoop.anyMutate(function () {
        set_scroll_1.setScroll(currentScroll.getPosition().add(scrollToApply));
        scrollToApply = zero_vector_2d_1.ZERO_VECTOR_2D;
        setToRun = false;
    });
}
exports.applyScroll = applyScroll;
//# sourceMappingURL=apply-scroll.js.map