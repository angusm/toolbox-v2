import { Dimensions } from '../cached-vectors/dimensions';
import { Dimensions2d } from '../math/geometry/dimensions-2d';
import { Scroll } from '../cached-vectors/scroll';
import { VisibleDimensions } from '../cached-vectors/visible-dimensions';
import { VisibleDistance } from '../cached-vectors/visible-distance';
import { renderLoop } from '../render-loop';
var windowDimensions = Dimensions.getSingleton();
var windowScroll = Scroll.getSingleton();
var ElementMask = (function () {
    function ElementMask(fixedElement, maskElement, buffer) {
        if (buffer === void 0) { buffer = 0; }
        this.fixedEl_ = fixedElement;
        this.maskDimensions_ = Dimensions.getForElement(maskElement);
        this.maskVisibleDimensions_ = VisibleDimensions.getForElement(maskElement);
        this.maskPosition_ = VisibleDistance.getForElement(maskElement);
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
        renderLoop.mutate(function () {
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
        renderLoop.measure(function () {
            _this.renderFixed_();
            renderLoop.cleanup(function () { return _this.render_(); });
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
        var bufferedDimensions = new Dimensions2d();
        if (this.maskVisibleDimensions_.getDimensions().getLength() != 0) {
            bufferedDimensions = (_a = this.maskVisibleDimensions_.getDimensions()
                .add(new Dimensions2d(this.buffer_, this.buffer_))).clamp.apply(_a, this.maskDimensions_.getDimensions().asRanges());
        }
        renderLoop.mutate(function () {
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
export { ElementMask };
//# sourceMappingURL=element-mask.js.map