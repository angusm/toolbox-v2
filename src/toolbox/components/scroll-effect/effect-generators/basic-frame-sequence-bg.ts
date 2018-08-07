import {TScrollEffectEffectFunction} from "../types/scroll-effect-effect-function";
import {renderLoop} from "../../../utils/render-loop";
import {percentToIndex} from "../../../utils/array/percent-to-index";
import {setStyle} from "../../../utils/dom/style/set-style";

function generateBasicFrameSequenceBGEffect(
  frameSequences: Array<string>
): TScrollEffectEffectFunction {
  return function(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ) {
    const frame = percentToIndex(distanceAsPercent, frameSequences);
    renderLoop.mutate(() => {
      setStyle(target, 'background-image', `url(${frameSequences[frame]})`);
    });
  }
}

export {generateBasicFrameSequenceBGEffect};
