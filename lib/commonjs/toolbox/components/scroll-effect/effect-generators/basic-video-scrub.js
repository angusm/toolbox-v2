"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var waitForLoadMap = new Map();
function generateBasicVideoScrubEffect() {
    return function (target, distance, distanceAsPercent) {
        var video = target;
        var updateVideo = function () {
            var duration = video.duration;
            if (!isNaN(duration)) {
                waitForLoadMap.delete(video);
                render_loop_1.renderLoop.mutate(function () {
                    video.pause();
                    video.currentTime = duration * distanceAsPercent;
                });
            }
            else {
                if (waitForLoadMap.has(video)) {
                    var oldListener = waitForLoadMap.get(video);
                    video.removeEventListener('loadeddata', oldListener);
                }
                waitForLoadMap.set(video, updateVideo);
                video.addEventListener('loadeddata', updateVideo);
            }
        };
        updateVideo();
    };
}
exports.generateBasicVideoScrubEffect = generateBasicVideoScrubEffect;
//# sourceMappingURL=basic-video-scrub.js.map