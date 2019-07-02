import {KeyframeStyle} from "../keyframe-style";
import {TEasingFunction} from "../../../../../shared-types/t-easing-function";


interface ITweenOptions {
  styleTarget?: Element & ElementCSSInlineStyle;
  keyframeStyle?: KeyframeStyle;
  easingFunction?: TEasingFunction;
}

export { ITweenOptions };
