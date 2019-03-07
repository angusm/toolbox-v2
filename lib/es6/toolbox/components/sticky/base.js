import { NumericRange } from "../../utils/math/numeric-range";
import { getVisibleYPosition } from "../../utils/dom/position/vertical/get-visible-y-position";
import { renderLoop } from "../../utils/render-loop";
import { getOffsetFromAncestor } from "../../utils/dom/position/get-offset-from-ancestor";
var ContainerPosition = (function () {
    function ContainerPosition() {
    }
    ContainerPosition.TOP = Symbol('top');
    ContainerPosition.MIDDLE = Symbol('middle');
    ContainerPosition.BOTTOM = Symbol('bottom');
    return ContainerPosition;
}());
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
        this.lastPosition_ = null;
        this.destroyed_ = false;
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
    Sticky.prototype.getPosition_ = function (shouldPin, yPosition) {
        if (shouldPin) {
            return ContainerPosition.MIDDLE;
        }
        else if (yPosition < 0) {
            return ContainerPosition.BOTTOM;
        }
        else {
            return ContainerPosition.TOP;
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
        var position = this.getPosition_(shouldPin, yPosition);
        if (this.lastPosition_ === position) {
            return;
        }
        var containerXOffset = getOffsetFromAncestor(this.container_, null).x;
        renderLoop.anyMutate(function () {
            Sticky.positionFnMap_.get(position)(new StickyRunValue(_this.target_, containerXOffset, maxDistance));
            _this.lastPosition_ = position;
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
    };
    Sticky.positionFnMap_ = new Map([
        [ContainerPosition.TOP, Sticky.positionTop_],
        [ContainerPosition.MIDDLE, Sticky.positionMiddle_],
        [ContainerPosition.BOTTOM, Sticky.positionBottom_],
    ]);
    return Sticky;
}());
export { Sticky };
//# sourceMappingURL=base.js.map