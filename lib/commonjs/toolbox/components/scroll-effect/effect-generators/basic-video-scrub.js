"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
function generateBasicVideoScrubEffect() {
    return function (target, distance, distanceAsPercent) {
        var video = target;
        var duration = video.duration;
        if (!isNaN(duration)) {
            render_loop_1.renderLoop.mutate(function () {
                video.currentTime = duration * distanceAsPercent;
            });
        }
    };
}
exports.generateBasicVideoScrubEffect = generateBasicVideoScrubEffect;
//# sourceMappingURL=basic-video-scrub.js.map