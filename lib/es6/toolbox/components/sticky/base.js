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
    function StickyRunValue(containerXOffset, maxDistance) {
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
        var containerXOffset = getOffsetFromAncestor(this.container_, null).x;
        if (this.lastPosition_ === position) {
            return;
        }
        renderLoop.anyMutate(function () {
            if (position === ContainerPosition.TOP) {
                _this.positionTop_();
            }
            else if (position === ContainerPosition.MIDDLE) {
                _this.positionMiddle_(containerXOffset);
            }
            else if (position === ContainerPosition.BOTTOM) {
                _this.positionBottom_(maxDistance);
            }
            _this.lastPosition_ = position;
        });
    };
    Sticky.prototype.positionTop_ = function () {
        this.target_.style.position = '';
        this.target_.style.transform = '';
    };
    Sticky.prototype.positionMiddle_ = function (containerXOffset) {
        this.target_.style.position = 'fixed';
        this.target_.style.transform = "translateX(" + containerXOffset + "px)";
    };
    Sticky.prototype.positionBottom_ = function (maxDistance) {
        this.target_.style.position = 'absolute';
        this.target_.style.transform = "translateY(" + maxDistance + "px)";
    };
    Sticky.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return Sticky;
}());
export { Sticky };
//# sourceMappingURL=base.js.map