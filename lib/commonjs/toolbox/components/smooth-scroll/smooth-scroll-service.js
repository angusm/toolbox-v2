"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../utils/math/geometry/vector-2d");
var render_loop_1 = require("../../utils/render-loop");
var numeric_range_1 = require("../../utils/math/numeric-range");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var get_offset_from_ancestor_ignoring_sticky_1 = require("../../utils/dom/position/vertical/get-offset-from-ancestor-ignoring-sticky");
var get_offset_from_ancestor_1 = require("../../utils/dom/position/get-offset-from-ancestor");
var SmoothScrollTransition = (function () {
    function SmoothScrollTransition(distance, timeline) {
        this.distance_ = distance;
        this.timeline_ = timeline;
    }
    SmoothScrollTransition.prototype.getDistance = function () {
        return this.distance_;
    };
    SmoothScrollTransition.prototype.getTimeline = function () {
        return this.timeline_;
    };
    return SmoothScrollTransition;
}());
var INTERRUPTING_EVENTS = [
    'mousewheel',
    'wheel',
    'interact',
    'touchstart',
    'touchmove',
    'touchend',
    'resize'
];
var INTERRUPTING_KEYCODES = new Set([
    32,
    38,
    40,
    33,
    34,
    36,
    35,
]);
var SmoothScrollService = (function () {
    function SmoothScrollService(element, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.easingFunction, easingFunction = _c === void 0 ? function (x) { return x; } : _c, _d = _b.duration, duration = _d === void 0 ? 500 : _d;
        this.element_ = element;
        this.xTransition_ = null;
        this.yTransition_ = null;
        this.easingFunction_ = easingFunction;
        this.duration_ = duration;
        this.init_();
    }
    SmoothScrollService.prototype.init_ = function () {
        var _this = this;
        INTERRUPTING_EVENTS.forEach(function (eventName) {
            window.addEventListener(eventName, function () { return _this.cancelTransition(); });
        });
        window.addEventListener('keydown', function (keyDownEvent) {
            if (INTERRUPTING_KEYCODES.has(keyDownEvent.keyCode)) {
                _this.cancelTransition();
            }
        });
        this.renderLoop_();
    };
    SmoothScrollService.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.anyPremeasure(function () {
            render_loop_1.renderLoop.anyCleanup(function () { return _this.renderLoop_(); });
            var now = performance.now();
            _this.applyScrollTransition_(now);
            _this.cancelFinishedTransitions_(now);
        });
    };
    SmoothScrollService.prototype.applyScrollTransition_ = function (now) {
        if (this.xTransition_ !== null) {
            this.element_.scrollLeft =
                this.getTransitionValue_(this.xTransition_, now);
        }
        if (this.yTransition_ !== null) {
            this.element_.scrollTop =
                this.getTransitionValue_(this.yTransition_, now);
        }
    };
    SmoothScrollService.prototype.cancelFinishedTransitions_ = function (now) {
        if (this.yTransition_ !== null &&
            now > this.yTransition_.getTimeline().getMax()) {
            this.cancelYTransition();
        }
        if (this.xTransition_ !== null &&
            now > this.xTransition_.getTimeline().getMax()) {
            this.cancelXTransition();
        }
    };
    SmoothScrollService.prototype.cancelTransition = function () {
        this.cancelXTransition();
        this.cancelYTransition();
    };
    SmoothScrollService.prototype.cancelYTransition = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollCleanup(function () { return _this.yTransition_ = null; });
    };
    SmoothScrollService.prototype.cancelXTransition = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollCleanup(function () { return _this.xTransition_ = null; });
    };
    SmoothScrollService.prototype.getTransitionValue_ = function (transition, now) {
        if (transition === null) {
            return 0;
        }
        var percent = this.easingFunction_(transition.getTimeline().getValueAsPercent(now));
        return transition.getDistance().getPercentAsValue(percent);
    };
    SmoothScrollService.prototype.generateTimeline_ = function () {
        var startTime = performance.now();
        var endTime = startTime + this.duration_;
        return new numeric_range_1.NumericRange(startTime, endTime);
    };
    SmoothScrollService.prototype.getDuration = function () {
        return this.duration_;
    };
    SmoothScrollService.prototype.scrollTo = function (target) {
        var timeline = this.generateTimeline_();
        this.xTransition_ =
            new SmoothScrollTransition(new numeric_range_1.NumericRange(this.element_.scrollLeft, target.x), timeline);
        this.yTransition_ =
            new SmoothScrollTransition(new numeric_range_1.NumericRange(this.element_.scrollTop, target.y), timeline);
    };
    SmoothScrollService.prototype.scrollToX = function (x) {
        this.xTransition_ =
            new SmoothScrollTransition(new numeric_range_1.NumericRange(this.element_.scrollLeft, x), this.generateTimeline_());
    };
    SmoothScrollService.prototype.scrollToElement = function (element) {
        var container = this.element_ instanceof HTMLElement ? this.element_ : null;
        var targetX = get_offset_from_ancestor_1.getOffsetFromAncestor(element, container).x;
        var targetY = get_offset_from_ancestor_ignoring_sticky_1.getOffsetFromAncestorIgnoringSticky(element, container);
        this.scrollTo(new vector_2d_1.Vector2d(targetX, targetY));
    };
    SmoothScrollService.prototype.scrollToY = function (y) {
        this.yTransition_ =
            new SmoothScrollTransition(new numeric_range_1.NumericRange(this.element_.scrollTop, y), this.generateTimeline_());
    };
    SmoothScrollService.prototype.scrollXByAmount = function (amount) {
        this.scrollToX(this.element_.scrollLeft + amount);
    };
    SmoothScrollService.prototype.scrollYByAmount = function (amount) {
        this.scrollToY(this.element_.scrollTop + amount);
    };
    SmoothScrollService.prototype.isScrolling = function () {
        return this.isXScrolling() || this.isYScrolling();
    };
    SmoothScrollService.prototype.isXScrolling = function () {
        return this.xTransition_ !== null;
    };
    SmoothScrollService.prototype.isYScrolling = function () {
        return this.yTransition_ !== null;
    };
    SmoothScrollService.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    SmoothScrollService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this(scroll_element_1.SCROLL_ELEMENT);
    };
    return SmoothScrollService;
}());
exports.SmoothScrollService = SmoothScrollService;
//# sourceMappingURL=smooth-scroll-service.js.map