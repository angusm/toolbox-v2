"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoFilter = void 0;
var dimensions_2d_1 = require("../../utils/math/geometry/dimensions-2d");
var VideoFilter = (function () {
    function VideoFilter(videoElement, canvas, filter, _a) {
        var _b = _a.scale, scale = _b === void 0 ? 1 : _b;
        this.destroyed_ = false;
        this.backingCanvas_ = document.createElement('canvas');
        this.filter_ = filter;
        this.primaryCanvas_ = canvas;
        this.video_ = videoElement;
        this.scale_ = scale;
        this.init_();
    }
    VideoFilter.prototype.init_ = function () {
        this.render_();
    };
    VideoFilter.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        window.requestAnimationFrame(function () {
            var videoSize = dimensions_2d_1.Dimensions2d.fromVideo(_this.video_).scale(_this.scale_);
            var primaryCanvasSize = dimensions_2d_1.Dimensions2d.fromCanvas(_this.primaryCanvas_);
            var backingCanvasSize = dimensions_2d_1.Dimensions2d.fromCanvas(_this.backingCanvas_);
            if (!videoSize.getArea() || _this.video_.paused) {
                _this.render_();
                return;
            }
            if (!videoSize.equals(primaryCanvasSize)) {
                _this.primaryCanvas_.width = videoSize.width;
                _this.primaryCanvas_.height = videoSize.height;
            }
            if (!videoSize.equals(backingCanvasSize)) {
                _this.backingCanvas_.width = videoSize.width;
                _this.backingCanvas_.height = videoSize.height;
            }
            var primaryContext = _this.primaryCanvas_.getContext('2d');
            var backingContext = _this.backingCanvas_.getContext('2d');
            backingContext
                .drawImage(_this.video_, 0, 0, videoSize.width, videoSize.height);
            var videoImageData = backingContext.getImageData(0, 0, videoSize.width, videoSize.height);
            var filteredImageData = _this.filter_.filter(videoImageData);
            primaryContext.putImageData(filteredImageData, 0, 0);
            _this.render_();
        });
    };
    VideoFilter.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return VideoFilter;
}());
exports.VideoFilter = VideoFilter;
//# sourceMappingURL=video-filter.js.map