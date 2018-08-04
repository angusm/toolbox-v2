import {TScrollEffectEffectFunction} from "../types/scroll-effect-effect-function";
import {renderLoop} from "../../../utils/render-loop";
import {percentToIndex} from "../../../utils/array/percent-to-index";
import {setStyle} from "../../../utils/dom/style/set-style";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";

const waitForLoadMap = new Map();
const lastDistancePercent =
  DynamicDefaultMap.usingFunction((x: HTMLElement) => Number.MIN_VALUE);

function generateBasicVideoScrubEffect(
  updateOnScrollDownOnly: boolean = true
): TScrollEffectEffectFunction {
  return function(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ) {
    // Assume a video element
    const video = <HTMLMediaElement>target;
    if (
      distanceAsPercent <= lastDistancePercent.get(video) &&
      updateOnScrollDownOnly
    ) {
      return;
    }

    lastDistancePercent.set(video, distanceAsPercent);

    const updateVideo = () => {
      const duration = video.duration;
      if (!isNaN(duration)) {
        waitForLoadMap.delete(video);
        renderLoop.mutate(() => {
          video.pause();
          video.currentTime = duration * distanceAsPercent;
        });
      } else {
        if (waitForLoadMap.has(video)) {
          const oldListener = waitForLoadMap.get(video);
          video.removeEventListener('loadeddata', oldListener);
        }
        waitForLoadMap.set(video, updateVideo);
        video.addEventListener('loadeddata', updateVideo);
      }
    };
    updateVideo();
  }
}

export {generateBasicVideoScrubEffect};
