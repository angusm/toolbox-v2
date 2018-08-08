import { renderLoop } from "../../../utils/render-loop";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
var VideoPlayUntilScroll = (function () {
    function VideoPlayUntilScroll() {
        this.targetPercentages_ =
            DynamicDefaultMap.usingFunction(function () { return 0; });
        this.destroyed_ = false;
        this.render_();
    }
    VideoPlayUntilScroll.prototype.run = function (target, distance, distanceAsPercent) {
        this.targetPercentages_.set(target, distanceAsPercent);
    };
    VideoPlayUntilScroll.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.mutate(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            Array.from(_this.targetPercentages_.entries())
                .forEach(function (_a) {
                var video = _a[0], percentage = _a[1];
                var targetTime = Math.round(video.duration * percentage * 100) / 100;
                if (isNaN(targetTime) || isNaN(video.currentTime) ||
                    video.currentTime >= targetTime) {
                    video.pause();
                }
                else {
                    video.play();
                }
            });
        });
    };
    VideoPlayUntilScroll.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return VideoPlayUntilScroll;
}());
export { VideoPlayUntilScroll };
//# sourceMappingURL=video-play-until-scroll.js.map