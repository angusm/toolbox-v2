import { renderLoop } from "../../../utils/render-loop";
import { percentToIndex } from "../../../utils/array/percent-to-index";
import { setStyle } from "../../../utils/dom/style/set-style";
function generateBasicFrameSequenceBGEffect(frameSequences) {
    return function (target, distance, distanceAsPercent) {
        var frame = percentToIndex(distanceAsPercent, frameSequences);
        renderLoop.mutate(function () {
            setStyle(target, 'background-image', frameSequences[frame]);
        });
    };
}
export { generateBasicFrameSequenceBGEffect };
//# sourceMappingURL=basic-frame-sequence-bg.js.map