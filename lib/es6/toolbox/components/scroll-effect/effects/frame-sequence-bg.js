var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { renderLoop } from "../../../utils/render-loop";
import { flatten } from "../../../utils/array/flatten";
import { zip } from "../../../utils/array/zip";
import { loadImage } from "../../../utils/loading/load-image";
import { styleStringToMap } from "../../../utils/dom/style/style-string-to-map";
import { setStylesFromMap } from "../../../utils/dom/style/set-styles-from-map";
import { min } from "../../../utils/array/min";
import { NumericRange } from "../../../utils/math/numeric-range";
import { subtract } from "../../../utils/set/subtract";
import { UserAgent } from "../../../utils/user-agent/user-agent";
import { Firefox } from "../../../utils/user-agent/browser/firefox";
import { ArrayMap } from "../../../utils/map/array";
import { ErrorService } from "../../../utils/error/service";
var Z_INDEX_CAP = 2147483647 / 2;
var DEFAULT_FRAME_STYLE = "\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 0;\n";
var TargetState = (function () {
    function TargetState(desiredFrame, backFrame, frontFrame, distanceAsPercent) {
        this.desiredFrame = desiredFrame;
        this.backFrame = backFrame;
        this.frontFrame = frontFrame;
        this.distanceAsPercent = distanceAsPercent;
    }
    return TargetState;
}());
var CURRENT_BROWSER = UserAgent.getBrowser();
var FrameSequenceBg = (function () {
    function FrameSequenceBg(frames, container, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.createFrameFunction, createFrameFunction = _c === void 0 ? function () { return document.createElement('div'); } : _c, _d = _b.startLoadingImmediately, startLoadingImmediately = _d === void 0 ? true : _d, _e = _b.loadImageFunction, loadImageFunction = _e === void 0 ? loadImage : _e, _f = _b.framesToInterpolate, framesToInterpolate = _f === void 0 ? 0 : _f, _g = _b.maximumLoadingThreads, maximumLoadingThreads = _g === void 0 ? 12 : _g, _h = _b.zIndexCap, zIndexCap = _h === void 0 ? Z_INDEX_CAP : _h;
        this.backupFrames_ = new ArrayMap();
        this.lastState_ = null;
        this.lastTargetFrame_ = null;
        this.imageUrlsInOrder_ = frames;
        this.frameElements_ =
            frames.map(function (frame, frameIndex) { return createFrameFunction(frameIndex); });
        this.imageUrlIndicesToLoadInOrder_ =
            FrameSequenceBg.generateFrameLoadOrder(frames.length);
        this.imagesLoaded_ = 0;
        this.loadedImageUrls_ = new Set();
        this.container_ = container;
        this.loadingPaused_ = !startLoadingImmediately;
        this.displayedFrameElementIndices_ = new Set();
        this.zIndex_ = 1;
        this.loadImageFunction_ = loadImageFunction;
        this.numberOfFramesToInterpolate_ = framesToInterpolate;
        this.maximumParallelImageRequests_ = maximumLoadingThreads;
        this.currentParallelImageRequests_ = 0;
        this.zIndexCap_ = zIndexCap;
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
        this.setupFrames_();
        this.startLoadingImagesWhenReady_();
    };
    FrameSequenceBg.prototype.startLoadingImagesWhenReady_ = function () {
        var _this = this;
        if (document.readyState === 'complete') {
            this.startLoadingImages_();
        }
        else {
            window.addEventListener('load', function () { return _this.startLoadingImages_(); });
        }
    };
    FrameSequenceBg.prototype.setupFrames_ = function () {
        var _this = this;
        var frameStyle = CURRENT_BROWSER === Firefox ?
            DEFAULT_FRAME_STYLE :
            DEFAULT_FRAME_STYLE + "; display: none;";
        var defaultStyles = styleStringToMap(frameStyle);
        this.frameElements_
            .forEach(function (frame) {
            setStylesFromMap(frame, defaultStyles);
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
        var imageUrlIndexToLoad = this.imageUrlIndicesToLoadInOrder_[this.imagesLoaded_];
        this.loadImage_(imageUrlIndexToLoad);
    };
    FrameSequenceBg.prototype.loadImage_ = function (imageUrlIndexToLoad) {
        var _this = this;
        var frameUrl = this.imageUrlsInOrder_[imageUrlIndexToLoad];
        this.currentParallelImageRequests_++;
        return this.loadImageFunction_(frameUrl)
            .then(function (loadedImage) {
            _this.currentParallelImageRequests_--;
            _this.loadedImageUrls_.add(_this.getImageUrl_(imageUrlIndexToLoad));
            setStylesFromMap(_this.frameElements_[imageUrlIndexToLoad], new Map([_this.getBackgroundImageStyle_(imageUrlIndexToLoad)]));
            if (_this.lastState_) {
                var desiredFrame = _this.lastState_.desiredFrame;
                if (desiredFrame === imageUrlIndexToLoad) {
                    _this.updateWithLoadedFrame_(desiredFrame);
                    _this.lastState_ = null;
                }
                else {
                    if (_this.requiresUpdateForNewFrame_(imageUrlIndexToLoad)) {
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
        return __spreadArrays([0, length - 1], this.generateFrameLoadOrderLoop_(allValues));
    };
    FrameSequenceBg.generateFrameLoadOrderLoop_ = function (remaining) {
        if (remaining.length <= 1) {
            return remaining;
        }
        var middle = Math.floor((remaining.length - 1) / 2);
        var left = remaining.slice(0, middle);
        var right = remaining.slice(middle + 1);
        return __spreadArrays([
            remaining[middle]
        ], flatten(zip(this.generateFrameLoadOrderLoop_(left), this.generateFrameLoadOrderLoop_(right))));
    };
    FrameSequenceBg.prototype.getPreviousLoadedImageUrlIndex_ = function (targetFrame) {
        return this.getClosestFrame_(this.getPreviousLoadedImageUrlIndices_(targetFrame), targetFrame);
    };
    FrameSequenceBg.prototype.getPreviousLoadedImageUrlIndices_ = function (targetFrame) {
        return this.getLoadedImageUrlIndicesByCondition_(function (frame) { return frame < targetFrame; });
    };
    FrameSequenceBg.prototype.getNextLoadedImageUrlIndex_ = function (imageUrlIndex) {
        return this.getClosestFrame_(this.getNextLoadedImageUrlIndices_(imageUrlIndex), imageUrlIndex);
    };
    FrameSequenceBg.prototype.getClosestFrame_ = function (candidateFrames, targetFrame) {
        return min(candidateFrames, function (frame) { return Math.abs(targetFrame - frame); });
    };
    FrameSequenceBg.prototype.getNextLoadedImageUrlIndices_ = function (imageUrlIndex) {
        return this.getLoadedImageUrlIndicesByCondition_(function (frame) { return frame > imageUrlIndex; });
    };
    FrameSequenceBg.prototype.getLoadedImageUrlIndices_ = function () {
        var _this = this;
        return Array.from(new Set(Array.from(this.loadedImageUrls_)
            .map(function (imageUrl) { return _this.getImageUrlIndex_(imageUrl); })));
    };
    FrameSequenceBg.prototype.getLoadedImageUrlIndicesByCondition_ = function (condition) {
        return this.getLoadedImageUrlIndices_().filter(condition);
    };
    FrameSequenceBg.prototype.run = function (target, distance, distanceAsPercent) {
        var _this = this;
        var interpolationMultiplier = this.numberOfFramesToInterpolate_ + 1;
        var frameCountWithInterpolation = (this.imageUrlsInOrder_.length * interpolationMultiplier) - 1;
        var targetFrame = Math.round(new NumericRange(0, frameCountWithInterpolation)
            .getPercentAsValue(distanceAsPercent));
        var nonInterpolatedFrameNumber = this.getNonInterpolatedFrame_(targetFrame);
        this.resetZIndexes_();
        if (this.lastTargetFrame_ !== targetFrame) {
            var loadedImageUrl = !this.isInterpolatedFrame_(targetFrame) ?
                this.getLoadedImageUrlForIndex_(nonInterpolatedFrameNumber) : null;
            if (loadedImageUrl !== null) {
                this.updateWithLoadedFrame_(nonInterpolatedFrameNumber);
            }
            else {
                this.updateWithInterpolatedFrame_(distanceAsPercent, targetFrame);
            }
        }
        renderLoop.cleanup(function () { return _this.lastTargetFrame_ = targetFrame; });
    };
    FrameSequenceBg.prototype.hasLoadedImageUrlForIndex_ = function (imageUrlIndex) {
        return this.getLoadedImageUrlForIndex_(imageUrlIndex) !== null;
    };
    FrameSequenceBg.prototype.getLoadedImageUrlForIndex_ = function (imageUrlIndex) {
        var _this = this;
        var bestUrl = this.imageUrlsInOrder_[imageUrlIndex];
        if (this.loadedImageUrls_.has(bestUrl)) {
            return bestUrl;
        }
        else {
            var loadedBackupUrl = this.backupFrames_.get(imageUrlIndex)
                .find(function (imageUrl) { return _this.loadedImageUrls_.has(imageUrl); });
            return loadedBackupUrl || null;
        }
    };
    FrameSequenceBg.prototype.getNonInterpolatedFrame_ = function (frameNumber) {
        return frameNumber / (this.numberOfFramesToInterpolate_ + 1);
    };
    FrameSequenceBg.prototype.isInterpolatedFrame_ = function (frameNumber) {
        return frameNumber % (this.numberOfFramesToInterpolate_ + 1) !== 0;
    };
    FrameSequenceBg.prototype.resetZIndexes_ = function () {
        if (this.zIndex_ < this.zIndexCap_) {
            return;
        }
        var subtraction = this.zIndex_ - 4;
        this.zIndex_ = 4;
        this.frameElements_.forEach(function (frameElement) {
            var newIndex = Math.max(0, parseInt('0' + frameElement.style.zIndex) - subtraction);
            renderLoop.anyMutate(function () {
                frameElement.style.zIndex = "" + newIndex;
            });
        });
    };
    FrameSequenceBg.prototype.updateWithLoadedFrame_ = function (targetFrame) {
        this.lastState_ = null;
        this.clearFrames_(new Set([targetFrame]));
        this.setFrameStyle_(targetFrame, '1');
    };
    FrameSequenceBg.prototype.getBackgroundImageStyle_ = function (imageUrlIndex) {
        return [
            'background-image',
            "url(" + this.imageUrlsInOrder_[imageUrlIndex] + ")"
        ];
    };
    FrameSequenceBg.prototype.getImageUrl_ = function (imageUrlIndex) {
        return this.imageUrlsInOrder_[imageUrlIndex];
    };
    FrameSequenceBg.prototype.getImageUrlIndex_ = function (imageUrl) {
        var _this = this;
        var baseIndex = this.imageUrlsInOrder_.indexOf(imageUrl);
        if (baseIndex !== -1) {
            return baseIndex;
        }
        else {
            return Array.from(this.backupFrames_.keys())
                .find(function (index) {
                return _this.backupFrames_.get(index).indexOf(imageUrl) !== -1;
            });
        }
    };
    FrameSequenceBg.prototype.clearFrames_ = function (exceptions) {
        var _this = this;
        if (exceptions === void 0) { exceptions = null; }
        if (CURRENT_BROWSER === Firefox) {
            return;
        }
        var framesToClear;
        if (exceptions) {
            framesToClear = subtract(this.displayedFrameElementIndices_, exceptions);
        }
        else {
            framesToClear = this.displayedFrameElementIndices_;
        }
        renderLoop.anyMutate(function () {
            framesToClear.forEach(function (frame) {
                _this.frameElements_[frame].style.opacity = '0';
                _this.frameElements_[frame].style.display = 'none';
            });
        });
    };
    FrameSequenceBg.prototype.setFrameStyle_ = function (frame, opacity) {
        var _this = this;
        if (typeof frame === 'undefined') {
            return;
        }
        renderLoop.anyMutate(function () {
            _this.displayedFrameElementIndices_.add(frame);
            _this.frameElements_[frame].style.opacity = opacity;
            if (CURRENT_BROWSER === Firefox) {
                _this.frameElements_[frame].style.zIndex = "" + ++_this.zIndex_;
            }
            else {
                _this.frameElements_[frame].style.display = 'block';
            }
        });
    };
    FrameSequenceBg.prototype.updateWithInterpolatedFrame_ = function (distanceAsPercent, targetInterpolatedFrame) {
        var targetImageUrlIndex = this.getNonInterpolatedFrame_(targetInterpolatedFrame);
        var frontImageUrlIndex = this.getNextLoadedImageUrlIndex_(targetImageUrlIndex);
        var backImageUrlIndex = this.getPreviousLoadedImageUrlIndex_(targetImageUrlIndex);
        var opacity = this.getFrontFrameCrossfadeOpacity_(distanceAsPercent, frontImageUrlIndex, backImageUrlIndex);
        this.clearFrames_(new Set([backImageUrlIndex, frontImageUrlIndex]));
        this.updateBackFrameWithMissingFrame_(backImageUrlIndex);
        this.updateFrontFrameWithMissingFrame_(frontImageUrlIndex, opacity);
        this.lastState_ =
            new TargetState(targetInterpolatedFrame, backImageUrlIndex, frontImageUrlIndex, distanceAsPercent);
    };
    FrameSequenceBg.prototype.getFrontFrameCrossfadeOpacity_ = function (distanceAsPercent, frontFrame, backFrame) {
        var frontPercent = frontFrame / this.imageUrlsInOrder_.length;
        var backPercent = backFrame / this.imageUrlsInOrder_.length;
        var percentageRange = new NumericRange(backPercent, frontPercent);
        return percentageRange.getValueAsPercent(distanceAsPercent);
    };
    FrameSequenceBg.prototype.updateBackFrameWithMissingFrame_ = function (frame) {
        this.setFrameStyle_(frame, '1');
    };
    FrameSequenceBg.prototype.updateFrontFrameWithMissingFrame_ = function (frame, opacity) {
        this.setFrameStyle_(frame, "" + opacity);
    };
    FrameSequenceBg.prototype.replaceFramesInPlace = function (frames) {
        var _this = this;
        if (frames.length !== this.imageUrlsInOrder_.length) {
            ErrorService.throw('Can only replaceFramesInPlace if frame count is constant');
        }
        this.imageUrlsInOrder_
            .forEach(function (imageUrl, index) {
            if (_this.loadedImageUrls_.has(imageUrl)) {
                _this.backupFrames_.get(index).push(imageUrl);
            }
        });
        this.imageUrlsInOrder_ = frames;
        this.imagesLoaded_ = 0;
        this.startLoadingImagesWhenReady_();
    };
    FrameSequenceBg.prototype.destroy = function () {
        var _this = this;
        this.loadedImageUrls_.clear();
        this.backupFrames_.clear();
        this.frameElements_
            .forEach(function (frameElement) { return _this.container_.removeChild(frameElement); });
    };
    return FrameSequenceBg;
}());
export { FrameSequenceBg };
//# sourceMappingURL=frame-sequence-bg.js.map