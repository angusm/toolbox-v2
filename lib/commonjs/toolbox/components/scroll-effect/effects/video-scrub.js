"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var is_video_ready_1 = require("../../../utils/dom/video/is-video-ready");
var VideoScrub = (function () {
    function VideoScrub(updateOnScrollDownOnly) {
        this.updateOnScrollDownOnly_ = updateOnScrollDownOnly;
        this.lastDistancePercent_ = new Map();
        this.delayedUpdates_ = new Map();
    }
    VideoScrub.prototype.shouldCullRun_ = function (target, distanceAsPercent) {
        return distanceAsPercent <= this.lastDistancePercent_.get(target) &&
            this.updateOnScrollDownOnly_;
    };
    VideoScrub.prototype.run = function (target, distance, distanceAsPercent) {
        if (this.shouldCullRun_(target, distanceAsPercent)) {
            return;
        }
        this.lastDistancePercent_.set(target, distanceAsPercent);
        var video = target;
        this.updateVideo_(video, distanceAsPercent);
    };
    VideoScrub.prototype.updateVideo_ = function (video, distanceAsPercent) {
        var _this = this;
        this.clearDelayedUpdate_(video);
        if (is_video_ready_1.isVideoReady(video)) {
            render_loop_1.renderLoop.mutate(function () {
                video.pause();
                video.currentTime =
                    Math.round(video.duration * distanceAsPercent * 100) / 100;
            });
        }
        else {
            var delayedUpdateFn = function () { return _this.updateVideo_(video, distanceAsPercent); };
            this.delayedUpdates_.set(video, delayedUpdateFn);
            video.addEventListener('loadeddata', delayedUpdateFn);
        }
    };
    VideoScrub.prototype.clearDelayedUpdate_ = function (video) {
        if (this.delayedUpdates_.has(video)) {
            video.removeEventListener('loadeddata', this.delayedUpdates_.get(video));
            this.delayedUpdates_.delete(video);
        }
    };
    VideoScrub.prototype.destroy = function () {
        var _this = this;
        Array.from(this.delayedUpdates_.keys())
            .forEach(function (video) { return _this.clearDelayedUpdate_(video); });
    };
    return VideoScrub;
}());
exports.VideoScrub = VideoScrub;
//# sourceMappingURL=video-scrub.js.map