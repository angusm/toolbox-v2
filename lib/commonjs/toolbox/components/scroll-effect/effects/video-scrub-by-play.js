"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var dynamic_default_1 = require("../../../utils/map/dynamic-default");
var scroll_1 = require("../../../utils/cached-vectors/scroll");
var VideoScrubByPlay = (function () {
    function VideoScrubByPlay(getForwardsVideoFunction, getBackwardsVideoFunction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.playStartOffset, playStartOffset = _c === void 0 ? 0 : _c, _d = _b.playEndOffset, playEndOffset = _d === void 0 ? 0 : _d;
        this.getForwardsVideo_ = getForwardsVideoFunction;
        this.getBackwardsVideo_ = getBackwardsVideoFunction;
        this.targetPercentages_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return 0; });
        this.destroyed_ = false;
        this.scroll_ = scroll_1.Scroll.getSingleton();
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
        render_loop_1.renderLoop.mutate(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
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
                        VideoScrubByPlay.getTargetTime_(forwardsVideo, percentage, _this.playStartOffset_, _this.playEndOffset_);
                    primaryVideo = forwardsVideo;
                    secondaryVideo = backwardsVideo;
                }
                else {
                    if (_this.wasScrollingDown_) {
                        backwardsVideo.currentTime =
                            backwardsVideo.duration - forwardsVideo.currentTime;
                    }
                    targetTime =
                        VideoScrubByPlay.getTargetTime_(backwardsVideo, percentage, _this.playEndOffset_, _this.playStartOffset_);
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
                secondaryVideo.pause();
            });
        });
    };
    VideoScrubByPlay.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return VideoScrubByPlay;
}());
exports.VideoScrubByPlay = VideoScrubByPlay;
//# sourceMappingURL=video-scrub-by-play.js.map