import { renderLoop } from "../../../utils/render-loop";
function generateBasicVideoScrubEffect() {
    return function (target, distance, distanceAsPercent) {
        var video = target;
        var duration = video.duration;
        if (!isNaN(duration)) {
            renderLoop.mutate(function () {
                video.currentTime = duration * distanceAsPercent;
            });
        }
    };
}
export { generateBasicVideoScrubEffect };
//# sourceMappingURL=basic-video-scrub.js.map