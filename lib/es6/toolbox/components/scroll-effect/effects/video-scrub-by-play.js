import { renderLoop } from "../../../utils/render-loop";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
import { Scroll } from "../../../utils/cached-vectors/scroll";
import { setStyle } from "../../../utils/dom/style/set-style";
var VideoScrubByPlay = (function () {
    function VideoScrubByPlay(getForwardsVideoFunction, getBackwardsVideoFunction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.playStartOffset, playStartOffset = _c === void 0 ? 0 : _c, _d = _b.playEndOffset, playEndOffset = _d === void 0 ? 0 : _d;
        this.getForwardsVideo_ = getForwardsVideoFunction;
        this.getBackwardsVideo_ = getBackwardsVideoFunction;
        this.targetPercentages_ =
            DynamicDefaultMap.usingFunction(function () { return 0; });
        this.destroyed_ = false;
        this.scroll_ = Scroll.getSingleton();
        this.wasScrollingDown_ = true;
        this.playStartOffset_ = playStartOffset;
        this.playEndOffset_ = playEndOffset;
        this.render_();
    }
    VideoScrubByPlay.prototype.run = function (target, distance, distanceAsPercent) {
        this.targetPercentages_.set(target, distanceAsPercent);
    };
    VideoScrubByPlay.getTargetTime_ = function (video, percentage, startOffset, endOffset) {
        var viableDuration = video.duration - startOffset - endOffset;
        var rawTargetTime = startOffset +
            Math.round(viableDuration * percentage * 1000) / 1000;
        return Math.min(rawTargetTime, video.duration);
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
                if (isNaN(forwardsVideo.duration) || isNaN(backwardsVideo.duration)) {
                    return;
                }
                var isScrollingDown = !_this.scroll_.isScrollingUp();
                if (isScrollingDown) {
                    targetTime =
                        VideoScrubByPlay.getTargetTime_(forwardsVideo, percentage, _this.playStartOffset_, _this.playEndOffset_);
                    primaryVideo = forwardsVideo;
                    secondaryVideo = backwardsVideo;
                }
                else {
                    targetTime =
                        VideoScrubByPlay.getTargetTime_(backwardsVideo, (1 - percentage), _this.playEndOffset_, _this.playStartOffset_);
                    primaryVideo = backwardsVideo;
                    secondaryVideo = forwardsVideo;
                }
                if (isScrollingDown !== _this.wasScrollingDown_) {
                    secondaryVideo
                        .removeEventListener('canplay', _this.bufferedHandler_);
                    _this.bufferedHandler_ = function () {
                        renderLoop.mutate(function () {
                            setStyle(primaryVideo, 'opacity', '1');
                            setStyle(secondaryVideo, 'opacity', '0');
                            primaryVideo.play();
                        });
                        primaryVideo
                            .removeEventListener('canplay', _this.bufferedHandler_);
                        _this.bufferedHandler_ = null;
                    };
                    primaryVideo.addEventListener('canplay', _this.bufferedHandler_);
                    primaryVideo.currentTime =
                        primaryVideo.duration - secondaryVideo.currentTime;
                }
                else {
                    secondaryVideo.currentTime =
                        secondaryVideo.duration - primaryVideo.currentTime;
                }
                secondaryVideo.pause();
                if (isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
                    primaryVideo.currentTime >= targetTime) {
                    primaryVideo.pause();
                }
                else if (_this.bufferedHandler_ === null && primaryVideo.paused) {
                    primaryVideo.play();
                }
                _this.wasScrollingDown_ = isScrollingDown;
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