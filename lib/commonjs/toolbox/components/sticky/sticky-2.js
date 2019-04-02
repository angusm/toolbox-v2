"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../utils/math/numeric-range");
var get_visible_y_position_1 = require("../../utils/dom/position/vertical/get-visible-y-position");
var render_loop_1 = require("../../utils/render-loop");
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var get_visible_distance_between_elements_1 = require("../../utils/dom/position/get-visible-distance-between-elements");
var get_visible_distance_from_root_1 = require("../../utils/dom/position/get-visible-distance-from-root");
var get_common_positioned_parent_element_1 = require("../../utils/dom/position/get-common-positioned-parent-element");
var event_handler_1 = require("../../utils/event/event-handler");
var sticky_2_container_position_1 = require("./sticky-2-container-position");
var sticky_2_positioned_1 = require("./sticky-2-positioned");
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
    function Sticky2(target, container, _a) {
        var _b = (_a === void 0 ? {} : _a).cloneCssClass, cloneCssClass = _b === void 0 ? null : _b;
        this.container_ = container;
        this.target_ = target;
        this.lastPosition_ = null;
        this.destroyed_ = false;
        this.clone_ = Sticky2.createClone_(target, cloneCssClass);
        this.init_();
    }
    Sticky2.createClone_ = function (target, cloneCssClass) {
        if (cloneCssClass === void 0) { cloneCssClass = null; }
        var clone = document.createElement(target.tagName);
        if (cloneCssClass !== null) {
            clone.classList.add(cloneCssClass);
        }
        return clone;
    };
    Sticky2.prototype.init_ = function () {
        var _this = this;
        this.clone_.innerHTML = this.target_.innerHTML;
        this.clone_.style.visibility = 'hidden';
        Array.from(this.target_.classList)
            .forEach(function (className) { return _this.clone_.classList.add(className); });
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
            return sticky_2_container_position_1.Sticky2ContainerPosition.MIDDLE;
        }
        else if (yPosition < 0) {
            return sticky_2_container_position_1.Sticky2ContainerPosition.BOTTOM;
        }
        else {
            return sticky_2_container_position_1.Sticky2ContainerPosition.TOP;
        }
    };
    Sticky2.prototype.scrollLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.scrollLoop_(); });
            var measureValue = _this.getMeasureValue_();
            render_loop_1.renderLoop.anyMutate(function () { return _this.mutate_(measureValue); });
        });
    };
    Sticky2.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.renderLoop_(); });
            var measureValue = _this.getMeasureValue_();
            render_loop_1.renderLoop.mutate(function () { return _this.mutate_(measureValue); });
        });
    };
    Sticky2.prototype.getMeasureValue_ = function () {
        var yPosition = get_visible_y_position_1.getVisibleYPosition(this.container_);
        var maxDistance = this.container_.offsetHeight -
            this.clone_.offsetHeight -
            this.clone_.offsetTop;
        var shouldPin = new numeric_range_1.NumericRange(0, maxDistance).contains(-yPosition);
        var position = Sticky2.getPosition_(shouldPin, yPosition);
        var commonFrame = get_common_positioned_parent_element_1.getCommonPositionedParentElement(this.clone_, this.target_);
        var cloneDistanceFromFrame = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(this.clone_, commonFrame);
        var cloneDistanceFromRoot = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(this.clone_);
        var cloneStyle = window.getComputedStyle(this.clone_);
        return new MeasureValue(position, cloneStyle, cloneDistanceFromFrame, cloneDistanceFromRoot, maxDistance);
    };
    Sticky2.prototype.mutate_ = function (measureValue) {
        this.applyCloneStylesToTarget_(measureValue.cloneStyle);
        if (measureValue.position === sticky_2_container_position_1.Sticky2ContainerPosition.TOP) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === sticky_2_container_position_1.Sticky2ContainerPosition.MIDDLE) {
            this.target_.style.position = 'fixed';
            new vector_2d_1.Vector2d(measureValue.cloneDistanceFromRoot.x, measureValue.cloneDistanceFromFrame.y)
                .positionElementByTranslation(this.target_);
        }
        else if (measureValue.position === sticky_2_container_position_1.Sticky2ContainerPosition.BOTTOM) {
            this.target_.style.position = 'absolute';
            measureValue.cloneDistanceFromFrame
                .add(new vector_2d_1.Vector2d(0, measureValue.maxDistance))
                .positionElementByTranslation(this.target_);
        }
        event_handler_1.eventHandler.dispatchEvent(new sticky_2_positioned_1.Sticky2Positioned(this, measureValue.position));
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
        this.target_.parentElement.removeChild(this.clone_);
    };
    return Sticky2;
}());
exports.Sticky2 = Sticky2;
//# sourceMappingURL=sticky-2.js.map