import { renderLoop } from "../../../utils/render-loop";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
import { Range } from '../../../utils/math/range';
import { setStyle } from "../../../utils/dom/style/set-style";
import { Scroll } from "../../../utils/cached-vectors/scroll";
var FRAME_STEP = 0.1;
var VideoScrubByPlay = (function () {
    function VideoScrubByPlay(getForwardsVideoFunction, getBackwardsVideoFunction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.playableTime, playableTime = _c === void 0 ? new Range(Number.MIN_VALUE, Number.MAX_VALUE) : _c, _d = _b.activePercentages, activePercentages = _d === void 0 ? new Range(0, 1) : _d;
        this.getForwardsVideo_ = getForwardsVideoFunction;
        this.getBackwardsVideo_ = getBackwardsVideoFunction;
        this.targetPercentages_ =
            DynamicDefaultMap.usingFunction(function () { return 0; });
        this.destroyed_ = false;
        this.wasPlayingForwards_ = true;
        this.playableTime_ = playableTime;
        this.activePercentages_ = activePercentages;
        this.scroll_ = Scroll.getSingleton();
        this.render_();
    }
    VideoScrubByPlay.prototype.run = function (target, distance, distanceAsPercent) {
        this.targetPercentages_.set(target, distanceAsPercent);
    };
    VideoScrubByPlay.getTargetTime_ = function (video, percentage, playableTime) {
        var actualRange = playableTime.getOverlap(new Range(0, video.duration));
        return actualRange.getPercentAsValue(percentage);
    };
    VideoScrubByPlay.prototype.getReversePlayableTime_ = function (video) {
        return new Range(Math.max(0, video.duration - this.playableTime_.max), Math.min(video.duration, video.duration - this.playableTime_.min));
    };
    VideoScrubByPlay.prototype.getAdjustedPercentage_ = function (rawPercentage) {
        return this.activePercentages_.getValueAsPercent(rawPercentage);
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
                var target = _a[0], rawPercentage = _a[1];
                var percentage = _this.getAdjustedPercentage_(rawPercentage);
                var forwardsVideo = _this.getForwardsVideo_(target);
                var backwardsVideo = _this.getBackwardsVideo_(target);
                var primaryVideo;
                var secondaryVideo;
                var targetTime;
                if (isNaN(forwardsVideo.duration) || isNaN(backwardsVideo.duration)) {
                    return;
                }
                var forwardsTargetTime = VideoScrubByPlay.getTargetTime_(forwardsVideo, percentage, _this.playableTime_);
                var backwardsTargetTime = VideoScrubByPlay.getTargetTime_(backwardsVideo, (1 - percentage), _this.getReversePlayableTime_(backwardsVideo));
                var backwardsGap = backwardsTargetTime - backwardsVideo.currentTime;
                var playForwards = backwardsGap < -FRAME_STEP;
                if (playForwards) {
                    targetTime = forwardsTargetTime;
                    primaryVideo = forwardsVideo;
                    secondaryVideo = backwardsVideo;
                    if (primaryVideo.currentTime < _this.playableTime_.min) {
                        return;
                    }
                }
                else {
                    targetTime = backwardsTargetTime;
                    primaryVideo = backwardsVideo;
                    secondaryVideo = forwardsVideo;
                }
                if (playForwards !== _this.wasPlayingForwards_) {
                    primaryVideo.currentTime =
                        primaryVideo.duration - secondaryVideo.currentTime;
                }
                if (!secondaryVideo.paused) {
                    secondaryVideo.pause();
                }
                if (isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
                    primaryVideo.currentTime >= targetTime) {
                    if (!primaryVideo.paused) {
                        primaryVideo.pause();
                    }
                }
                else if (primaryVideo.readyState >= 3) {
                    setStyle(primaryVideo, 'opacity', '1');
                    setStyle(secondaryVideo, 'opacity', '0');
                    if (Math.abs(primaryVideo.currentTime - targetTime) < FRAME_STEP) {
                        primaryVideo.currentTime = targetTime;
                    }
                    else {
                        primaryVideo.play();
                    }
                }
                secondaryVideo.currentTime =
                    secondaryVideo.duration - primaryVideo.currentTime;
                _this.wasPlayingForwards_ = playForwards;
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