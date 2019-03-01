"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../utils/math/numeric-range");
var get_visible_y_position_1 = require("../../utils/dom/position/vertical/get-visible-y-position");
var render_loop_1 = require("../../utils/render-loop");
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var get_visible_distance_between_elements_1 = require("../../utils/dom/position/get-visible-distance-between-elements");
var get_visible_distance_from_root_1 = require("../../utils/dom/position/get-visible-distance-from-root");
var get_common_positioned_parent_element_1 = require("../../utils/dom/position/get-common-positioned-parent-element");
var ContainerPosition = (function () {
    function ContainerPosition() {
    }
    ContainerPosition.TOP = Symbol('top');
    ContainerPosition.MIDDLE = Symbol('middle');
    ContainerPosition.BOTTOM = Symbol('bottom');
    return ContainerPosition;
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
        this.measure_();
        this.renderLoop_();
    };
    Sticky2.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
            _this.measure_();
        });
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
    Sticky2.prototype.measure_ = function () {
        var _this = this;
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
        if (this.lastPosition_ === position) {
            return;
        }
        render_loop_1.renderLoop.scrollMutate(function () {
            _this.applyCloneStylesToTarget_(cloneStyle);
            if (position === ContainerPosition.TOP) {
                _this.target_.style.position = 'absolute';
                cloneDistanceFromFrame.positionElementByTranslation(_this.target_);
            }
            else if (position === ContainerPosition.MIDDLE) {
                _this.target_.style.position = 'fixed';
                new vector_2d_1.Vector2d(cloneDistanceFromRoot.x, cloneDistanceFromFrame.y)
                    .positionElementByTranslation(_this.target_);
            }
            else if (position === ContainerPosition.BOTTOM) {
                _this.target_.style.position = 'absolute';
                cloneDistanceFromFrame
                    .add(new vector_2d_1.Vector2d(0, maxDistance))
                    .positionElementByTranslation(_this.target_);
            }
            _this.lastPosition_ = position;
        });
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
exports.Sticky2 = Sticky2;
//# sourceMappingURL=sticky-2.js.map