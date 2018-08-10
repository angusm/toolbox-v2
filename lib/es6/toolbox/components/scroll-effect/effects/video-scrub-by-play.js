import { renderLoop } from "../../../utils/render-loop";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
import { Scroll } from "../../../utils/cached-vectors/scroll";
var VideoScrubByPlay = (function () {
    function VideoScrubByPlay(getForwardsVideoFunction, getBackwardsVideoFunction) {
        this.getForwardsVideo_ = getForwardsVideoFunction;
        this.getBackwardsVideo_ = getBackwardsVideoFunction;
        this.targetPercentages_ =
            DynamicDefaultMap.usingFunction(function () { return 0; });
        this.destroyed_ = false;
        this.scroll_ = Scroll.getSingleton();
        this.wasScrollingDown_ = true;
        this.render_();
    }
    VideoScrubByPlay.prototype.run = function (target, distance, distanceAsPercent) {
        this.targetPercentages_.set(target, distanceAsPercent);
    };
    VideoScrubByPlay.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.mutate(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            Array.from(_this.targetPercentages_.entries())
                .forEach(function (_a) {
                var target = _a[0], percentage = _a[1];
                var forwardsVideo = _this.getForwardsVideo_(target);
                var backwardsVideo = _this.getBackwardsVideo_(target);
                var primaryVideo;
                var secondaryVideo;
                var targetTime;
                if (!_this.scroll_.isScrollingUp()) {
                    if (!_this.wasScrollingDown_) {
                        forwardsVideo.currentTime =
                            forwardsVideo.duration - backwardsVideo.currentTime;
                    }
                    targetTime =
                        Math.round(forwardsVideo.duration * percentage * 100) / 100;
                    primaryVideo = forwardsVideo;
                    secondaryVideo = backwardsVideo;
                }
                else {
                    if (_this.wasScrollingDown_) {
                        backwardsVideo.currentTime =
                            backwardsVideo.duration - forwardsVideo.currentTime;
                    }
                    targetTime =
                        Math.round(backwardsVideo.duration * (1 - percentage) * 100) / 100;
                    primaryVideo = backwardsVideo;
                    secondaryVideo = forwardsVideo;
                }
                if (isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
                    primaryVideo.currentTime >= targetTime) {
                    primaryVideo.pause();
                }
                else {
                    primaryVideo.play();
                }
                secondaryVideo.currentTime =
                    secondaryVideo.duration - primaryVideo.currentTime;
            });
        });
    };
    VideoScrubByPlay.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return VideoScrubByPlay;
}());
export { VideoScrubByPlay };
//# sourceMappingURL=video-scrub-by-play.js.map