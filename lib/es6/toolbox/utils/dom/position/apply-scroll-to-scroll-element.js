import { renderLoop } from '../../render-loop';
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
import { Scroll } from "../../cached-vectors/scroll";
import { setScroll } from "./set-scroll";
var scrollToApply = ZERO_VECTOR_2D;
var currentScroll = Scroll.getSingleton();
var setToRun = false;
function applyScrollToScrollElement(vector) {
    scrollToApply = scrollToApply.add(vector);
    if (setToRun) {
        return;
    }
    setToRun = true;
    renderLoop.anyMutate(function () {
        setScroll(currentScroll.getPosition().add(scrollToApply));
        scrollToApply = ZERO_VECTOR_2D;
        setToRun = false;
    });
}
export { applyScrollToScrollElement };
//# sourceMappingURL=apply-scroll-to-scroll-element.js.map