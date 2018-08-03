import {TScrollEffectEffectFunction} from "../types/scroll-effect-effect-function";
import {renderLoop} from "../../../utils/render-loop";
import {percentToIndex} from "../../../utils/array/percent-to-index";
import {setStyle} from "../../../utils/dom/style/set-style";

function generateBasicVideoScrubEffect(): TScrollEffectEffectFunction {
  return function(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ) {
    // Assume a video element
    const video = <HTMLMediaElement>target;
    renderLoop.mutate(() => {
      video.currentTime = video.duration * distanceAsPercent;
    });
  }
}

export {generateBasicVideoScrubEffect};
