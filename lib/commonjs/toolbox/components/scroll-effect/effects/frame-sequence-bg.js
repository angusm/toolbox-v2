"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var set_style_1 = require("../../../utils/dom/style/set-style");
var percent_to_index_1 = require("../../../utils/array/percent-to-index");
var FrameSequenceBg = (function () {
    function FrameSequenceBg(frames) {
        this.frames_ = frames;
    }
    FrameSequenceBg.prototype.run = function (target, distance, distanceAsPercent) {
        var _this = this;
        var frame = percent_to_index_1.percentToIndex(distanceAsPercent, this.frames_);
        render_loop_1.renderLoop.mutate(function () { return set_style_1.setStyle(target, 'background-image', "url(" + _this.frames_[frame] + ")"); });
    };
    FrameSequenceBg.prototype.destroy = function () { };
    return FrameSequenceBg;
}());
exports.FrameSequenceBg = FrameSequenceBg;
//# sourceMappingURL=frame-sequence-bg.js.map