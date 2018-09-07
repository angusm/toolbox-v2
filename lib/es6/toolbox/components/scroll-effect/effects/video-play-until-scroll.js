import { renderLoop } from "../../../utils/render-loop";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
var VideoPlayUntilScroll = (function () {
    function VideoPlayUntilScroll(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.playStartOffset, playStartOffset = _c === void 0 ? 0 : _c, _d = _b.playEndOffset, playEndOffset = _d === void 0 ? 0 : _d;
        this.playStartOffset_ = playStartOffset;
        this.playEndOffset_ = playEndOffset;
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
                var viableDuration = video.duration - _this.playEndOffset_ - _this.playStartOffset_;
                var rawTargetTime = _this.playStartOffset_ +
                    Math.round(viableDuration * percentage * 100) / 100;
                var targetTime = Math.max(rawTargetTime, video.duration);
                if (isNaN(targetTime) || isNaN(video.currentTime)) {
                    video.pause();
                }
                else if (video.currentTime >= targetTime) {
                    video.pause();
                    video.currentTime = video.duration;
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