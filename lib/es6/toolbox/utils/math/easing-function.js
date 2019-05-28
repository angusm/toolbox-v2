import { CubicBezier } from "./cubic-bezier";
var EasingFunction = (function () {
    function EasingFunction() {
    }
    EasingFunction.EASES_IN_OUT_SINE = CubicBezier.getFunction(0.445, 0.05, 0.55, 0.95);
    EasingFunction.EASE_IN_SINE = CubicBezier.getFunction(0.47, 0, 0.745, 0.715);
    EasingFunction.EASE_OUT_SINE = CubicBezier.getFunction(0.39, 0.575, 0.565, 1);
    return EasingFunction;
}());
export { EasingFunction };
//# sourceMappingURL=easing-function.js.map