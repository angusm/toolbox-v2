import { NumericRange } from "../../utils/math/numeric-range";
import { getVisibleYPosition } from "../../utils/dom/position/vertical/get-visible-y-position";
import { renderLoop } from "../../utils/render-loop";
import { Vector2d } from "../../utils/math/geometry/vector-2d";
import { getVisibleDistanceFromRoot } from "../../utils/dom/position/get-visible-distance-from-root";
import { eventHandler } from "../../utils/event/event-handler";
import { Sticky2ContainerPosition } from "./sticky-2-container-position";
import { Sticky2Positioned } from "./sticky-2-positioned";
import { getFirstPositionedParentElement } from "../../utils/dom/position/get-first-positioned-parent-element";
var MeasureValue = (function () {
    function MeasureValue(position, cloneStyle, cloneDistanceFromFrame, cloneDistanceFromRoot, maxDistance) {
        this.position = position;
        this.cloneDistanceFromFrame = cloneDistanceFromFrame;
        this.cloneDistanceFromRoot = cloneDistanceFromRoot;
        this.maxDistance = maxDistance;
        this.padding = cloneStyle.padding;
        this.width = cloneStyle.width;
        this.height = cloneStyle.height;
        this.border = cloneStyle.border;
    }
    MeasureValue.prototype.equals = function (measureValue) {
        return measureValue &&
            this.padding === measureValue.padding &&
            this.width === measureValue.width &&
            this.height === measureValue.height &&
            this.border === measureValue.border;
    };
    return MeasureValue;
}());
var Sticky2 = (function () {
    function Sticky2(target, container, _a) {
        var _b = (_a === void 0 ? {} : _a).cloneCssClass, cloneCssClass = _b === void 0 ? null : _b;
        this.container_ = container;
        this.target_ = target;
        this.lastMeasureValue_ = null;
        this.destroyed_ = false;
        this.clone_ = Sticky2.createClone_(target, cloneCssClass);
        this.commonFrame_ = getFirstPositionedParentElement(this.target_);
        this.init_();
    }
    Sticky2.createClone_ = function (target, cloneCssClass) {
        if (cloneCssClass === void 0) { cloneCssClass = null; }
        var clone = document.createElement(target.tagName);
        if (cloneCssClass !== null) {
            clone.classList.add(cloneCssClass);
        }
        clone.innerHTML = target.innerHTML;
        clone.style.visibility = 'hidden';
        Array.from(target.classList)
            .forEach(function (className) { return clone.classList.add(className); });
        Sticky2.applyCloneCssClass(clone, cloneCssClass);
        return clone;
    };
    Sticky2.applyCloneCssClass = function (element, cloneCssClass) {
        if (cloneCssClass === void 0) { cloneCssClass = null; }
        if (cloneCssClass === null) {
            return;
        }
        element.classList.add(cloneCssClass);
        Array.from(element.children)
            .forEach(function (child) { return Sticky2.applyCloneCssClass(child, cloneCssClass); });
    };
    Sticky2.prototype.init_ = function () {
        this.target_.parentElement.insertBefore(this.clone_, this.target_);
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
            return Sticky2ContainerPosition.MIDDLE;
        }
        else if (yPosition < 0) {
            return Sticky2ContainerPosition.BOTTOM;
        }
        else {
            return Sticky2ContainerPosition.TOP;
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
            renderLoop.anyMutate(function () { return _this.mutate_(measureValue); });
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
        var cloneDistanceFromRoot = getVisibleDistanceFromRoot(this.clone_);
        var commonFrameDistancesFromRoot = getVisibleDistanceFromRoot(this.commonFrame_);
        var cloneDistanceFromFrame = cloneDistanceFromRoot.subtract(commonFrameDistancesFromRoot);
        var cloneStyle = window.getComputedStyle(this.clone_);
        return new MeasureValue(position, cloneStyle, cloneDistanceFromFrame, cloneDistanceFromRoot, maxDistance);
    };
    Sticky2.prototype.mutate_ = function (measureValue) {
        this.applyCloneStylesToTarget_(measureValue);
        if (measureValue.position === Sticky2ContainerPosition.TOP) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === Sticky2ContainerPosition.MIDDLE) {
            this.target_.style.position = 'fixed';
            new Vector2d(measureValue.cloneDistanceFromRoot.x, measureValue.cloneDistanceFromFrame.y)
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === Sticky2ContainerPosition.BOTTOM) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .add(new Vector2d(0, measureValue.maxDistance))
                .positionElementByTranslation(this.target_);
        }
        eventHandler.dispatchEvent(new Sticky2Positioned(this, measureValue.position));
        this.lastMeasureValue_ = measureValue;
    };
    Sticky2.prototype.applyCloneStylesToTarget_ = function (measureValue) {
        if (measureValue.equals(this.lastMeasureValue_)) {
            return;
        }
        this.target_.style.padding = measureValue.padding;
        this.target_.style.width = measureValue.width;
        this.target_.style.height = measureValue.height;
        this.target_.style.border = measureValue.border;
    };
    Sticky2.prototype.destroy = function () {
        this.destroyed_ = true;
        this.target_.parentElement.removeChild(this.clone_);
    };
    return Sticky2;
}());
export { Sticky2 };
//# sourceMappingURL=sticky-2.js.map