"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var dynamic_default_1 = require("../../../utils/map/dynamic-default");
var waitForLoadMap = new Map();
var lastDistancePercent = dynamic_default_1.DynamicDefaultMap.usingFunction(function (x) { return Number.MIN_VALUE; });
function generateBasicVideoScrubEffect(updateOnScrollDownOnly) {
    if (updateOnScrollDownOnly === void 0) { updateOnScrollDownOnly = true; }
    return function (target, distance, distanceAsPercent) {
        var video = target;
        if (distanceAsPercent <= lastDistancePercent.get(video) &&
            updateOnScrollDownOnly) {
            return;
        }
        lastDistancePercent.set(video, distanceAsPercent);
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