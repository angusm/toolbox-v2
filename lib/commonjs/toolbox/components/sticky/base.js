"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../utils/math/numeric-range");
var get_visible_y_position_1 = require("../../utils/dom/position/vertical/get-visible-y-position");
var render_loop_1 = require("../../utils/render-loop");
var get_offset_from_ancestor_1 = require("../../utils/dom/position/get-offset-from-ancestor");
var dimensions__1 = require("../../utils/cached-vectors/dimensions';");
var windowDimensions = dimensions__1.Dimensions.getSingleton();
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
        this.init_();
    }
    Sticky.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.measure_(); });
        this.renderLoop_();
    };
    Sticky.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
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
        var yPosition = get_visible_y_position_1.getVisibleYPosition(this.container_);
        var maxDistance = this.container_.offsetHeight -
            this.target_.offsetHeight -
            this.target_.offsetTop;
        var shouldPin = new numeric_range_1.NumericRange(0, maxDistance).contains(-yPosition);
        var positionFunction = Sticky.getPositionFunction_(shouldPin, yPosition);
        if (this.lastPositionFunction_ === positionFunction &&
            !windowDimensions.hasChanged()) {
            return;
        }
        var containerXOffset = get_offset_from_ancestor_1.getOffsetFromAncestor(this.container_, null).x;
        render_loop_1.renderLoop.anyMutate(function () {
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
    };
    return Sticky;
}());
exports.Sticky = Sticky;
//# sourceMappingURL=base.js.map