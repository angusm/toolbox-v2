"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_1 = require("../cached-vectors/dimensions");
var dimensions_2d_1 = require("../math/geometry/dimensions-2d");
var scroll_1 = require("../cached-vectors/scroll");
var visible_dimensions_1 = require("../cached-vectors/visible-dimensions");
var visible_distance_1 = require("../cached-vectors/visible-distance");
var render_loop_1 = require("../render-loop");
var windowDimensions = dimensions_1.Dimensions.getSingleton();
var windowScroll = scroll_1.Scroll.getSingleton();
var ElementMask = (function () {
    function ElementMask(fixedElement, maskElement, buffer) {
        if (buffer === void 0) { buffer = 0; }
        this.fixedEl_ = fixedElement;
        this.maskDimensions_ = dimensions_1.Dimensions.getForElement(maskElement);
        this.maskVisibleDimensions_ = visible_dimensions_1.VisibleDimensions.getForElement(maskElement);
        this.maskPosition_ = visible_distance_1.VisibleDistance.getForElement(maskElement);
        this.stopped_ = false;
        this.buffer_ = buffer;
        this.init_();
    }
    ElementMask.prototype.init_ = function () {
        this.render_();
        this.initFixedElement_();
    };
    ElementMask.prototype.initFixedElement_ = function () {
        var _this = this;
        render_loop_1.renderLoop.mutate(function () {
            _this.fixedEl_.style.position = 'absolute';
            _this.fixedEl_.style.left = '0';
            _this.fixedEl_.style.top = '0';
            _this.fixedEl_.style.right = 'auto';
            _this.fixedEl_.style.bottom = 'auto';
        });
    };
    ElementMask.prototype.stop = function () {
        this.stopped_ = true;
    };
    ElementMask.prototype.render_ = function () {
        var _this = this;
        if (this.stopped_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            _this.renderFixed_();
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    ElementMask.prototype.getWindowDimensionRanges_ = function () {
        var _this = this;
        return windowDimensions.getDimensions()
            .asRanges()
            .map(function (range) { return range.expand(_this.buffer_); });
    };
    ElementMask.prototype.renderFixed_ = function () {
        var _a;
        var _this = this;
        var _b = this.getWindowDimensionRanges_(), widthRange = _b[0], heightRange = _b[1];
        var clippedPosition = this.maskPosition_.getDistance()
            .clamp(widthRange, heightRange)
            .add(windowScroll.getPosition());
        var bufferedDimensions = new dimensions_2d_1.Dimensions2d();
        if (this.maskVisibleDimensions_.getDimensions().getLength() != 0) {
            bufferedDimensions = (_a = this.maskVisibleDimensions_.getDimensions()
                .add(new dimensions_2d_1.Dimensions2d(this.buffer_, this.buffer_))).clamp.apply(_a, this.maskDimensions_.getDimensions().asRanges());
        }
        render_loop_1.renderLoop.mutate(function () {
            if (bufferedDimensions.getArea()) {
                clippedPosition.positionElementByTranslation(_this.fixedEl_);
                bufferedDimensions.sizeElement(_this.fixedEl_);
                _this.fixedEl_.style.visibility = 'visible';
            }
            else {
                _this.fixedEl_.style.visibility = 'hidden';
            }
        });
    };
    return ElementMask;
}());
exports.ElementMask = ElementMask;
//# sourceMappingURL=element-mask.js.map