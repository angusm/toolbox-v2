import { KeyframeStyle } from '../keyframe-style';
import { TEasingFunction } from '../types/t-easing-function';

interface ITweenOptions {
  styleTarget?: ElementCSSInlineStyle;
  keyframeStyle?: KeyframeStyle;
  easingFunction?: TEasingFunction;
}

export { ITweenOptions };
