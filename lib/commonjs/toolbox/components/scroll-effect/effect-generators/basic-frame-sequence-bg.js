"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var percent_to_index_1 = require("../../../utils/array/percent-to-index");
var set_style_1 = require("../../../utils/dom/style/set-style");
function generateBasicFrameSequenceBGEffect(frameSequences) {
    return function (target, distance, distanceAsPercent) {
        var frame = percent_to_index_1.percentToIndex(distanceAsPercent, frameSequences);
        render_loop_1.renderLoop.mutate(function () {
            set_style_1.setStyle(target, 'background-image', frameSequences[frame]);
        });
    };
}
exports.generateBasicFrameSequenceBGEffect = generateBasicFrameSequenceBGEffect;
//# sourceMappingURL=basic-frame-sequence-bg.js.map