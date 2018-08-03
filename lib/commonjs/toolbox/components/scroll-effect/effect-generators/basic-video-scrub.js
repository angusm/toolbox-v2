"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
function generateBasicVideoScrubEffect() {
    return function (target, distance, distanceAsPercent) {
        var video = target;
        render_loop_1.renderLoop.mutate(function () {
            video.currentTime = video.duration * distanceAsPercent;
        });
    };
}
exports.generateBasicVideoScrubEffect = generateBasicVideoScrubEffect;
//# sourceMappingURL=basic-video-scrub.js.map