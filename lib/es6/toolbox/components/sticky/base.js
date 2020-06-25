import { NumericRange } from "../../utils/math/numeric-range";
import { getVisibleYPosition } from "../../utils/dom/position/vertical/get-visible-y-position";
import { renderLoop } from "../../utils/render-loop";
import { getOffsetFromAncestor } from "../../utils/dom/position/get-offset-from-ancestor";
import { Dimensions } from "../../utils/cached-vectors/dimensions";
var StickyRunValue = (function () {
    function StickyRunValue(target, containerXOffset, maxDistance) {
        this.target = target;
        this.containerXOffset = containerXOffset;
        this.maxDistance = maxDistance;
    }
    return StickyRunValue;
}());
var Sticky = (function () {
    function Sticky(target, container) {
        this.container_ = container;
        this.target_ = target;
        this.lastPositionFunction_ = null;
        this.destroyed_ = false;
        this.windowDimensions_ = Dimensions.getSingleton(this);
        this.init_();
    }
    Sticky.prototype.init_ = function () {
        var _this = this;
        renderLoop.measure(function () { return _this.measure_(); });
        this.renderLoop_();
    };
    Sticky.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
            _this.measure_();
        });
    };
    Sticky.getPositionFunction_ = function (shouldPin, yPosition) {
        if (shouldPin) {
            return Sticky.positionMiddle_;
        }
        else if (yPosition < 0) {
            return Sticky.positionBottom_;
        }
        else {
            return Sticky.positionTop_;
        }
    };
    Sticky.prototype.measure_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        var yPosition = getVisibleYPosition(this.container_);
        var maxDistance = this.container_.offsetHeight -
            this.target_.offsetHeight -
            this.target_.offsetTop;
        var shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
        var positionFunction = Sticky.getPositionFunction_(shouldPin, yPosition);
        if (this.lastPositionFunction_ === positionFunction &&
            !this.windowDimensions_.hasChanged()) {
            return;
        }
        var containerXOffset = getOffsetFromAncestor(this.container_, null).x;
        renderLoop.anyMutate(function () {
            positionFunction(new StickyRunValue(_this.target_, containerXOffset, maxDistance));
            _this.lastPositionFunction_ = positionFunction;
        });
    };
    Sticky.positionTop_ = function (runValue) {
        runValue.target.style.position = '';
        runValue.target.style.transform = '';
    };
    Sticky.positionMiddle_ = function (runValue) {
        runValue.target.style.position = 'fixed';
        runValue.target.style.transform =
            "translateX(" + runValue.containerXOffset + "px)";
    };
    Sticky.positionBottom_ = function (runValue) {
        runValue.target.style.position = 'absolute';
        runValue.target.style.transform = "translateY(" + runValue.maxDistance + "px)";
    };
    Sticky.prototype.destroy = function () {
        this.destroyed_ = true;
        this.windowDimensions_.destroy(this);
    };
    return Sticky;
}());
export { Sticky };
//# sourceMappingURL=base.js.map