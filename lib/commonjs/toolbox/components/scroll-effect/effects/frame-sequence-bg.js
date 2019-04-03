"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var flatten_1 = require("../../../utils/array/flatten");
var zip_1 = require("../../../utils/array/zip");
var load_image_1 = require("../../../utils/loading/load-image");
var style_string_to_map_1 = require("../../../utils/dom/style/style-string-to-map");
var set_styles_from_map_1 = require("../../../utils/dom/style/set-styles-from-map");
var min_1 = require("../../../utils/array/min");
var numeric_range_1 = require("../../../utils/math/numeric-range");
var subtract_1 = require("../../../utils/set/subtract");
var user_agent_1 = require("../../../utils/user-agent/user-agent");
var firefox_1 = require("../../../utils/user-agent/browser/firefox");
var Z_INDEX_CAP = 2147483647 / 2;
var DEFAULT_FRAME_STYLE = "\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 0;\n";
var TargetState = (function () {
    function TargetState(desiredFrame, backFrame, frontFrame, distanceAsPercent) {
        this.desiredFrame = desiredFrame;
        this.backFrame = backFrame;
        this.frontFrame = frontFrame;
        this.distanceAsPercent = distanceAsPercent;
    }
    return TargetState;
}());
var CURRENT_BROWSER = user_agent_1.UserAgent.getBrowser();
var FrameSequenceBg = (function () {
    function FrameSequenceBg(frames, container, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.createFrameFunction, createFrameFunction = _c === void 0 ? function () { return document.createElement('div'); } : _c, _d = _b.startLoadingImmediately, startLoadingImmediately = _d === void 0 ? true : _d, _e = _b.loadImageFunction, loadImageFunction = _e === void 0 ? load_image_1.loadImage : _e, _f = _b.framesToInterpolate, framesToInterpolate = _f === void 0 ? 0 : _f, _g = _b.maximumLoadingThreads, maximumLoadingThreads = _g === void 0 ? 12 : _g;
        this.lastState_ = null;
        this.lastTargetFrame_ = null;
        this.imageUrlsInOrder_ = frames;
        this.frameElements_ =
            frames.map(function (frame, frameIndex) { return createFrameFunction(frameIndex); });
        this.imageUrlIndicesToLoadInOrder_ =
            FrameSequenceBg.generateFrameLoadOrder(frames.length);
        this.imagesLoaded_ = 0;
        this.loadedImageUrlIndices_ = new Set();
        this.container_ = container;
        this.loadingPaused_ = !startLoadingImmediately;
        this.displayedFrameElementIndices_ = new Set();
        this.zIndex_ = 1;
        this.loadImageFunction_ = loadImageFunction;
        this.numberOfFramesToInterpolate_ = framesToInterpolate;
        this.maximumParallelImageRequests_ = maximumLoadingThreads;
        this.currentParallelImageRequests_ = 0;
        this.init_();
    }
    FrameSequenceBg.prototype.stopLoading = function () {
        this.loadingPaused_ = true;
    };
    FrameSequenceBg.prototype.startLoading = function () {
        this.loadingPaused_ = false;
        if (!this.areAllLoadingThreadsInUse_()) {
            this.loadNextImage_();
        }
    };
    FrameSequenceBg.prototype.areAllLoadingThreadsInUse_ = function () {
        return this.currentParallelImageRequests_ >=
            this.maximumParallelImageRequests_;
    };
    FrameSequenceBg.prototype.init_ = function () {
        var _this = this;
        this.setupFrames_();
        if (document.readyState === 'complete') {
            this.startLoadingImages_();
        }
        else {
            window.addEventListener('load', function () { return _this.startLoadingImages_(); });
        }
    };
    FrameSequenceBg.prototype.setupFrames_ = function () {
        var _this = this;
        var defaultStyles = style_string_to_map_1.styleStringToMap(DEFAULT_FRAME_STYLE);
        this.frameElements_
            .forEach(function (frame) {
            set_styles_from_map_1.setStylesFromMap(frame, defaultStyles);
            _this.container_.appendChild(frame);
        });
    };
    FrameSequenceBg.prototype.startLoadingImages_ = function () {
        this.loadNextImage_();
    };
    FrameSequenceBg.prototype.loadNextImage_ = function () {
        if (this.imagesLoaded_ >= this.imageUrlIndicesToLoadInOrder_.length) {
            return;
        }
        if (this.loadingPaused_) {
            return;
        }
        var frameToLoad = this.imageUrlIndicesToLoadInOrder_[this.imagesLoaded_];
        this.loadImage_(frameToLoad);
    };
    FrameSequenceBg.prototype.loadImage_ = function (frameToLoad) {
        var _this = this;
        var frameUrl = this.imageUrlsInOrder_[frameToLoad];
        this.currentParallelImageRequests_++;
        return this.loadImageFunction_(frameUrl)
            .then(function (loadedImage) {
            _this.currentParallelImageRequests_--;
            _this.loadedImageUrlIndices_.add(frameToLoad);
            set_styles_from_map_1.setStylesFromMap(_this.frameElements_[frameToLoad], new Map([_this.getBackgroundImageStyle_(frameToLoad)]));
            if (_this.lastState_) {
                var desiredFrame = _this.lastState_.desiredFrame;
                if (desiredFrame === frameToLoad) {
                    _this.updateWithLoadedFrame_(desiredFrame);
                    _this.lastState_ = null;
                }
                else {
                    if (_this.requiresUpdateForNewFrame_(frameToLoad)) {
                        _this.updateWithInterpolatedFrame_(_this.lastState_.distanceAsPercent, desiredFrame);
                    }
                }
            }
            _this.imagesLoaded_++;
            _this.loadNextImage_();
        }, function () {
            _this.currentParallelImageRequests_--;
            _this.imagesLoaded_++;
            _this.loadNextImage_();
        });
    };
    FrameSequenceBg.prototype.requiresUpdateForNewFrame_ = function (newFrameIndex) {
        var interpolatedNewFrame = newFrameIndex * (this.numberOfFramesToInterpolate_ + 1);
        return (newFrameIndex === 0 || newFrameIndex === this.imageUrlsInOrder_.length) || (this.lastState_.backFrame < interpolatedNewFrame &&
            interpolatedNewFrame < this.lastState_.desiredFrame) || (this.lastState_.desiredFrame < interpolatedNewFrame &&
            interpolatedNewFrame < this.lastState_.frontFrame);
    };
    FrameSequenceBg.generateFrameLoadOrder = function (length) {
        var allValues = [];
        for (var i = 1; i < length - 1; i++) {
            allValues.push(i);
        }
        return [0, length - 1].concat(this.generateFrameLoadOrderLoop_(allValues));
    };
    FrameSequenceBg.generateFrameLoadOrderLoop_ = function (remaining) {
        if (remaining.length <= 1) {
            return remaining;
        }
        var middle = Math.floor((remaining.length - 1) / 2);
        var left = remaining.slice(0, middle);
        var right = remaining.slice(middle + 1);
        return [
            remaining[middle]
        ].concat(flatten_1.flatten(zip_1.zip(this.generateFrameLoadOrderLoop_(left), this.generateFrameLoadOrderLoop_(right))));
    };
    FrameSequenceBg.prototype.getPreviousLoadedFrame_ = function (targetFrame) {
        return this.getClosestFrame_(this.getPreviousLoadedFrames_(targetFrame), targetFrame);
    };
    FrameSequenceBg.prototype.getPreviousLoadedFrames_ = function (targetFrame) {
        return this.getLoadedFramesByCondition_(function (frame) { return frame < targetFrame; });
    };
    FrameSequenceBg.prototype.getNextLoadedFrame_ = function (targetFrame) {
        return this.getClosestFrame_(this.getNextLoadedFrames_(targetFrame), targetFrame);
    };
    FrameSequenceBg.prototype.getClosestFrame_ = function (candidateFrames, targetFrame) {
        return min_1.min(candidateFrames, function (frame) { return Math.abs(targetFrame - frame); });
    };
    FrameSequenceBg.prototype.getNextLoadedFrames_ = function (targetFrame) {
        return this.getLoadedFramesByCondition_(function (frame) { return frame > targetFrame; });
    };
    FrameSequenceBg.prototype.getLoadedFramesByCondition_ = function (condition) {
        return Array.from(this.loadedImageUrlIndices_).filter(condition);
    };
    FrameSequenceBg.prototype.run = function (target, distance, distanceAsPercent) {
        var _this = this;
        var frameCountWithInterpolation = (this.imageUrlsInOrder_.length * (this.numberOfFramesToInterpolate_ + 1) - 1);
        var targetFrame = new numeric_range_1.NumericRange(0, frameCountWithInterpolation)
            .getPercentAsValue(distanceAsPercent);
        var nonInterpolatedFrameNumber = this.getNonInterpolatedFrame_(targetFrame);
        if (this.lastTargetFrame_ === targetFrame) {
            if (this.zIndex_ >= Z_INDEX_CAP && CURRENT_BROWSER === firefox_1.Firefox) {
                this.resetZIndexes_();
            }
        }
        else {
            if (!this.isInterpolatedFrame_(targetFrame) &&
                this.loadedImageUrlIndices_.has(nonInterpolatedFrameNumber)) {
                this.updateWithLoadedFrame_(nonInterpolatedFrameNumber);
            }
            else {
                this.updateWithInterpolatedFrame_(distanceAsPercent, targetFrame);
            }
        }
        render_loop_1.renderLoop.cleanup(function () { return _this.lastTargetFrame_ = targetFrame; });
    };
    FrameSequenceBg.prototype.getNonInterpolatedFrame_ = function (frameNumber) {
        return frameNumber / (this.numberOfFramesToInterpolate_ + 1);
    };
    FrameSequenceBg.prototype.isInterpolatedFrame_ = function (frameNumber) {
        return frameNumber % (this.numberOfFramesToInterpolate_ + 1) !== 0;
    };
    FrameSequenceBg.prototype.resetZIndexes_ = function () {
        var _this = this;
        this.frameElements_.forEach(function (frameElement) {
            var newIndex = parseInt('0' + frameElement.style.zIndex) - Z_INDEX_CAP;
            render_loop_1.renderLoop.anyMutate(function () {
                frameElement.style.zIndex = "" + newIndex;
            });
        });
        render_loop_1.renderLoop.cleanup(function () { return _this.zIndex_ = 0; });
    };
    FrameSequenceBg.prototype.updateWithLoadedFrame_ = function (targetFrame) {
        this.lastState_ = null;
        this.clearFrames_(new Set([targetFrame]));
        this.setFrameStyle_(targetFrame, '1');
    };
    FrameSequenceBg.prototype.getBackgroundImageStyle_ = function (frame) {
        return ['background-image', "url(" + this.imageUrlsInOrder_[frame] + ")"];
    };
    FrameSequenceBg.prototype.clearFrames_ = function (exceptions) {
        var _this = this;
        if (exceptions === void 0) { exceptions = null; }
        var framesToClear;
        if (exceptions) {
            framesToClear = subtract_1.subtract(this.displayedFrameElementIndices_, exceptions);
        }
        else {
            framesToClear = this.displayedFrameElementIndices_;
        }
        render_loop_1.renderLoop.anyMutate(function () {
            if (CURRENT_BROWSER !== firefox_1.Firefox) {
                framesToClear.forEach(function (frame) {
                    _this.frameElements_[frame].style.opacity = '0';
                });
            }
        });
    };
    FrameSequenceBg.prototype.setFrameStyle_ = function (frame, opacity) {
        var _this = this;
        if (typeof frame === 'undefined') {
            return;
        }
        render_loop_1.renderLoop.anyMutate(function () {
            _this.displayedFrameElementIndices_.add(frame);
            _this.frameElements_[frame].style.opacity = opacity;
            if (CURRENT_BROWSER === firefox_1.Firefox) {
                _this.frameElements_[frame].style.zIndex = "" + ++_this.zIndex_;
            }
            _this.frameElements_[frame].style.display = 'block';
        });
    };
    FrameSequenceBg.prototype.updateWithInterpolatedFrame_ = function (distanceAsPercent, targetInterpolatedFrame) {
        var frontFrame = this.getNextLoadedFrame_(targetInterpolatedFrame);
        var backFrame = this.getPreviousLoadedFrame_(targetInterpolatedFrame);
        var opacity = this.getFrontFrameCrossfadeOpacity_(distanceAsPercent, frontFrame, backFrame);
        this.clearFrames_(new Set([backFrame, frontFrame]));
        this.updateBackFrameWithMissingFrame_(backFrame);
        this.updateFrontFrameWithMissingFrame_(frontFrame, opacity);
        this.lastState_ =
            new TargetState(targetInterpolatedFrame, backFrame, frontFrame, distanceAsPercent);
    };
    FrameSequenceBg.prototype.getFrontFrameCrossfadeOpacity_ = function (distanceAsPercent, frontFrame, backFrame) {
        var frontPercent = frontFrame / this.imageUrlsInOrder_.length;
        var backPercent = backFrame / this.imageUrlsInOrder_.length;
        var percentageRange = new numeric_range_1.NumericRange(backPercent, frontPercent);
        return percentageRange.getValueAsPercent(distanceAsPercent);
    };
    FrameSequenceBg.prototype.updateBackFrameWithMissingFrame_ = function (frame) {
        this.setFrameStyle_(frame, '1');
    };
    FrameSequenceBg.prototype.updateFrontFrameWithMissingFrame_ = function (frame, opacity) {
        this.setFrameStyle_(frame, "" + opacity);
    };
    FrameSequenceBg.prototype.destroy = function () {
        var _this = this;
        this.loadedImageUrlIndices_.clear();
        this.frameElements_
            .forEach(function (frameElement) { return _this.container_.removeChild(frameElement); });
    };
    return FrameSequenceBg;
}());
exports.FrameSequenceBg = FrameSequenceBg;
//# sourceMappingURL=frame-sequence-bg.js.map