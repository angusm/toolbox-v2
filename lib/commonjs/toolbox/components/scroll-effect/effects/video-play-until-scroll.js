"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var VideoPlayUntilScroll = (function () {
    function VideoPlayUntilScroll() {
        this.targetTimes_ = new Map();
        this.destroyed_ = false;
        this.render_();
    }
    VideoPlayUntilScroll.prototype.run = function (target, distance, distanceAsPercent) {
        var video = target;
        this.targetTimes_.set(video, Math.round(video.duration * distanceAsPercent * 100) / 100);
    };
    VideoPlayUntilScroll.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.mutate(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            Array.from(_this.targetTimes_.entries())
                .forEach(function (_a) {
                var video = _a[0], targetTime = _a[1];
                if (video.currentTime >= targetTime) {
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
exports.VideoPlayUntilScroll = VideoPlayUntilScroll;
//# sourceMappingURL=video-play-until-scroll.js.map