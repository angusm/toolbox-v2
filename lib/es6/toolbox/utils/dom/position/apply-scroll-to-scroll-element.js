import { renderLoop } from '../../render-loop';
import { ZERO_VECTOR_2D } from "../../math/geometry/zero-vector-2d";
import { Scroll } from "../../cached-vectors/scroll";
import { setScroll } from "./set-scroll";
var scrollToApply = ZERO_VECTOR_2D;
var setToRun = false;
function applyScrollToScrollElement(vector, _a) {
    var _b = (_a === void 0 ? {} : _a).applyImmediately, applyImmediately = _b === void 0 ? false : _b;
    scrollToApply = scrollToApply.add(vector);
    if (setToRun) {
        return;
    }
    setToRun = true;
    var scrollSingletonSymbol = Symbol();
    var scrollSingleton = Scroll.getSingleton(scrollSingletonSymbol);
    var apply = function () {
        setScroll(scrollSingleton.getPosition().add(scrollToApply));
        scrollToApply = ZERO_VECTOR_2D;
        setToRun = false;
        scrollSingleton.destroy(scrollSingletonSymbol);
    };
    if (applyImmediately) {
        apply();
    }
    else {
        renderLoop.anyMutate(apply);
    }
}
export { applyScrollToScrollElement };
//# sourceMappingURL=apply-scroll-to-scroll-element.js.map