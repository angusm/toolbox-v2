import { NumericRange } from "../../utils/math/numeric-range";
import { getVisibleYPosition } from "../../utils/dom/position/vertical/get-visible-y-position";
import { renderLoop } from "../../utils/render-loop";
import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { getVisibleDistanceBetweenElements } from "../../utils/dom/position/get-visible-distance-between-elements";
import { getVisibleDistanceFromRoot } from "../../utils/dom/position/get-visible-distance-from-root";
import { getCommonPositionedParentElement } from "../../utils/dom/position/get-common-positioned-parent-element";
var ContainerPosition = (function () {
    function ContainerPosition() {
    }
    ContainerPosition.TOP = Symbol('top');
    ContainerPosition.MIDDLE = Symbol('middle');
    ContainerPosition.BOTTOM = Symbol('bottom');
    return ContainerPosition;
}());
var MeasureValue = (function () {
    function MeasureValue(position, cloneStyle, cloneDistanceFromFrame, cloneDistanceFromRoot, maxDistance) {
        this.position = position;
        this.cloneStyle = cloneStyle;
        this.cloneDistanceFromFrame = cloneDistanceFromFrame;
        this.cloneDistanceFromRoot = cloneDistanceFromRoot;
        this.maxDistance = maxDistance;
    }
    return MeasureValue;
}());
var Sticky2 = (function () {
    function Sticky2(target, container) {
        this.container_ = container;
        this.target_ = target;
        this.lastPosition_ = null;
        this.destroyed_ = false;
        this.clone_ = document.createElement(target.tagName);
        this.init_();
    }
    Sticky2.prototype.init_ = function () {
        var _this = this;
        this.clone_.innerHTML = this.target_.innerHTML;
        this.clone_.style.visibility = 'hidden';
        Array.from(this.target_.classList)
            .forEach(function (className) { return _this.clone_.classList.add(className); });
        this.container_.insertBefore(this.clone_, this.target_);
        this.target_.style.position = 'absolute';
        this.target_.style.top = '0';
        this.target_.style.left = '0';
        this.target_.style.width = '';
        this.target_.style.height = '';
        this.target_.style.margin = '0';
        this.target_.style.padding = '0';
        this.renderLoop_();
        this.scrollLoop_();
    };
    Sticky2.getPosition_ = function (shouldPin, yPosition) {
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
    Sticky2.prototype.scrollLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.scrollLoop_(); });
            var measureValue = _this.getMeasureValue_();
            renderLoop.scrollMutate(function () { return _this.mutate_(measureValue); });
        });
    };
    Sticky2.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.renderLoop_(); });
            var measureValue = _this.getMeasureValue_();
            renderLoop.mutate(function () { return _this.mutate_(measureValue); });
        });
    };
    Sticky2.prototype.getMeasureValue_ = function () {
        var yPosition = getVisibleYPosition(this.container_);
        var maxDistance = this.container_.offsetHeight -
            this.clone_.offsetHeight -
            this.clone_.offsetTop;
        var shouldPin = new NumericRange(0, maxDistance).contains(-yPosition);
        var position = Sticky2.getPosition_(shouldPin, yPosition);
        var commonFrame = getCommonPositionedParentElement(this.clone_, this.target_);
        var cloneDistanceFromFrame = getVisibleDistanceBetweenElements(this.clone_, commonFrame);
        var cloneDistanceFromRoot = getVisibleDistanceFromRoot(this.clone_);
        var cloneStyle = window.getComputedStyle(this.clone_);
        return new MeasureValue(position, cloneStyle, cloneDistanceFromFrame, cloneDistanceFromRoot, maxDistance);
    };
    Sticky2.prototype.mutate_ = function (measureValue) {
        this.applyCloneStylesToTarget_(measureValue.cloneStyle);
        if (this.lastPosition_ === measureValue.position) {
            return;
        }
        if (measureValue.position === ContainerPosition.TOP) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === ContainerPosition.MIDDLE) {
            this.target_.style.position = 'fixed';
            new Vector2d(measureValue.cloneDistanceFromRoot.x, measureValue.cloneDistanceFromFrame.y)
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === ContainerPosition.BOTTOM) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .add(new Vector2d(0, measureValue.maxDistance))
                .positionElementByTranslation(this.target_);
        }
        this.lastPosition_ = measureValue.position;
    };
    Sticky2.prototype.applyCloneStylesToTarget_ = function (cloneStyles) {
        this.target_.style.margin = '0';
        this.target_.style.top = '0';
        this.target_.style.bottom = '0';
        this.target_.style.left = '0';
        this.target_.style.right = '0';
        this.target_.style.padding = cloneStyles.padding;
        this.target_.style.width = cloneStyles.width;
        this.target_.style.height = cloneStyles.height;
        this.target_.style.border = cloneStyles.border;
    };
    Sticky2.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return Sticky2;
}());
export { Sticky2 };
//# sourceMappingURL=sticky-2.js.map