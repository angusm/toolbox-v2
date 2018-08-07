import { renderLoop } from "../../../utils/render-loop";
import { setStyle } from "../../../utils/dom/style/set-style";
import { percentToIndex } from "../../../utils/array/percent-to-index";
var FrameSequenceBg = (function () {
    function FrameSequenceBg(frames) {
        this.frames_ = frames;
    }
    FrameSequenceBg.prototype.run = function (target, distance, distanceAsPercent) {
        var _this = this;
        var frame = percentToIndex(distanceAsPercent, this.frames_);
        renderLoop.mutate(function () { return setStyle(target, 'background-image', "url(" + _this.frames_[frame] + ")"); });
    };
    FrameSequenceBg.prototype.destroy = function () { };
    return FrameSequenceBg;
}());
export { FrameSequenceBg };
//# sourceMappingURL=frame-sequence-bg.js.map