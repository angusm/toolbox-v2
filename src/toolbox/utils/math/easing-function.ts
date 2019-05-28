import {TEasingFunction} from "../../shared-types/t-easing-function";
import {CubicBezier} from "./cubic-bezier";

class EasingFunction {
  public static EASES_IN_OUT_SINE: TEasingFunction =
    CubicBezier.getFunction(0.445, 0.05, 0.55, 0.95);
  public static EASE_IN_SINE: TEasingFunction =
    CubicBezier.getFunction(0.47, 0, 0.745, 0.715);
  public static EASE_OUT_SINE: TEasingFunction =
    CubicBezier.getFunction(0.39, 0.575, 0.565, 1);
}

export {EasingFunction};
