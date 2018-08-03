import { renderLoop } from "../../../utils/render-loop";
function generateBasicVideoScrubEffect() {
    return function (target, distance, distanceAsPercent) {
        var video = target;
        renderLoop.mutate(function () {
            video.currentTime = video.duration * distanceAsPercent;
        });
    };
}
export { generateBasicVideoScrubEffect };
//# sourceMappingURL=basic-video-scrub.js.map