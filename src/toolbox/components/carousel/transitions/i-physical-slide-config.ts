import {TEasingFunction} from "../../../shared-types/t-easing-function";

interface IPhysicalSlideConfig {
  transitionTime?: number;
  easingFunction?: TEasingFunction;
  lockScroll?: boolean;
}

export {IPhysicalSlideConfig};
