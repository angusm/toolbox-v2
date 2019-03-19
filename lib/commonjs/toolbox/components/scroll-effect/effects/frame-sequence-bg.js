"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../../utils/render-loop");
var percent_to_index_1 = require("../../../utils/array/percent-to-index");
var flatten_1 = require("../../../utils/array/flatten");
var zip_1 = require("../../../utils/array/zip");
var load_image_1 = require("../../../utils/loading/load-image");
var style_string_to_map_1 = require("../../../utils/dom/style/style-string-to-map");
var set_styles_from_map_1 = require("../../../utils/dom/style/set-styles-from-map");
var min_1 = require("../../../utils/array/min");
var numeric_range_1 = require("../../../utils/math/numeric-range");
var multi_value_dynamic_default_1 = require("../../../utils/map/multi-value-dynamic-default");
var DEFAULT_FRAME_STYLE = "\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n";
var FrameSequenceBg = (function () {
    function FrameSequenceBg(frames, container, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.createFrameFunction, createFrameFunction = _c === void 0 ? function () { return document.createElement('div'); } : _c, _d = _b.startLoadingImmediately, startLoadingImmediately = _d === void 0 ? true : _d;
        var _this = this;
        this.imageUrlsInOrder_ = frames;
        this.desiredFrameForTarget_ = new Map();
        this.framesToLoadInOrder_ =
            FrameSequenceBg.generateFrameLoadOrder(frames.length);
        this.framesToLoadInOrderIndex_ = 0;
        this.loadedFrames_ = new Set();
        this.backFrame_ = createFrameFunction(true);
        this.frontFrame_ = createFrameFunction(false);
        this.container_ = container;
        this.loadedImages_ = new Set();
        this.loadingPaused_ = !startLoadingImmediately;
        this.isLoading_ = false;
        this.reloadFrameMap_ =
            multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(function (_a) {
                var frameToLoad = _a[0], loadedImage = _a[1];
                return function () {
                    _this.loadedImages_.delete(loadedImage);
                    _this.loadedFrames_.delete(frameToLoad);
                    _this.loadImage_(frameToLoad);
                };
            });
        this.init_();
    }
    FrameSequenceBg.prototype.stopLoading = function () {
        this.loadingPaused_ = true;
    };
    FrameSequenceBg.prototype.startLoading = function () {
        this.loadingPaused_ = false;
        if (!this.isLoading_) {
            this.loadNextImage_();
        }
    };
    FrameSequenceBg.prototype.init_ = function () {
        this.setupFrames_();
        this.startLoadingImages_();
    };
    FrameSequenceBg.prototype.getFrames_ = function () {
        return [this.backFrame_, this.frontFrame_];
    };
    FrameSequenceBg.prototype.setupFrames_ = function () {
        var _this = this;
        var defaultStyles = style_string_to_map_1.styleStringToMap(DEFAULT_FRAME_STYLE);
        this.getFrames_()
            .forEach(function (frame) {
            set_styles_from_map_1.setStylesFromMap(frame, defaultStyles);
            _this.container_.appendChild(frame);
        });
    };
    FrameSequenceBg.prototype.startLoadingImages_ = function () {
        this.loadNextImage_();
    };
    FrameSequenceBg.prototype.loadNextImage_ = function () {
        var _this = this;
        if (this.framesToLoadInOrderIndex_ >= this.framesToLoadInOrder_.length) {
            return;
        }
        if (this.loadingPaused_) {
            return;
        }
        var frameToLoad = this.framesToLoadInOrder_[this.framesToLoadInOrderIndex_];
        this.isLoading_ = true;
        this.loadImage_(frameToLoad).then(function () { return _this.isLoading_ = false; });
    };
    FrameSequenceBg.prototype.loadImage_ = function (frameToLoad) {
        var _this = this;
        var frameUrl = this.imageUrlsInOrder_[frameToLoad];
        this.isLoading_ = true;
        return load_image_1.loadImage(frameUrl)
            .then(function (loadedImage) {
            loadedImage.addEventListener('emptied', _this.reloadFrameMap_.get([frameToLoad, loadedImage]));
            _this.isLoading_ = false;
            _this.loadedImages_.add(loadedImage);
            _this.loadedFrames_.add(frameToLoad);
            _this.desiredFrameForTarget_.forEach(function (desiredFrame, target) {
                if (desiredFrame === frameToLoad) {
                    _this.updateWithLoadedFrame_(target, desiredFrame);
                    _this.desiredFrameForTarget_.delete(target);
                }
            });
            _this.framesToLoadInOrderIndex_++;
            _this.loadNextImage_();
        }, function () {
            _this.isLoading_ = false;
            _this.framesToLoadInOrderIndex_++;
            _this.loadNextImage_();
        });
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
        return Array.from(this.loadedFrames_).filter(condition);
    };
    FrameSequenceBg.prototype.run = function (target, distance, distanceAsPercent) {
        var targetFrame = percent_to_index_1.percentToIndex(distanceAsPercent, this.imageUrlsInOrder_);
        if (this.loadedFrames_.has(targetFrame)) {
            this.updateWithLoadedFrame_(target, targetFrame);
        }
        else {
            this.updateWithMissingFrame_(target, distanceAsPercent, targetFrame);
        }
    };
    FrameSequenceBg.prototype.updateWithLoadedFrame_ = function (target, targetFrame) {
        this.desiredFrameForTarget_.delete(target);
        var frameBackground = "url(" + this.imageUrlsInOrder_[targetFrame] + ")";
        this.mutateUsingStyleMaps_(new Map([['background-image', 'none'], ['opacity', '0']]), new Map([['background-image', frameBackground], ['opacity', '1']]));
    };
    FrameSequenceBg.prototype.updateWithMissingFrame_ = function (target, distanceAsPercent, targetFrame) {
        this.desiredFrameForTarget_.set(target, targetFrame);
        var frontFrame = this.getNextLoadedFrame_(targetFrame);
        var backFrame = this.getPreviousLoadedFrame_(targetFrame);
        var frontFramePercent = frontFrame / this.imageUrlsInOrder_.length;
        var backFramePercent = backFrame / this.imageUrlsInOrder_.length;
        var percentageRange = new numeric_range_1.NumericRange(backFramePercent, frontFramePercent);
        var opacitySplit = percentageRange.getValueAsPercent(distanceAsPercent);
        var backImg = "url(" + this.imageUrlsInOrder_[backFrame] + ")";
        var frontImg = "url(" + this.imageUrlsInOrder_[frontFrame] + ")";
        this.mutateUsingStyleMaps_(new Map([['background-image', backImg], ['opacity', '1']]), new Map([['background-image', frontImg], ['opacity', "" + opacitySplit]]));
    };
    FrameSequenceBg.prototype.mutateUsingStyleMaps_ = function (backStyle, frontStyle) {
        var _this = this;
        render_loop_1.renderLoop.anyMutate(function () {
            set_styles_from_map_1.setStylesFromMap(_this.backFrame_, backStyle);
            set_styles_from_map_1.setStylesFromMap(_this.frontFrame_, frontStyle);
        });
    };
    FrameSequenceBg.prototype.destroy = function () {
        this.loadedImages_.clear();
        this.loadedFrames_.clear();
    };
    return FrameSequenceBg;
}());
exports.FrameSequenceBg = FrameSequenceBg;
//# sourceMappingURL=frame-sequence-bg.js.map