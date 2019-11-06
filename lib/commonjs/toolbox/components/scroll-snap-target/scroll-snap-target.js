"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_1 = require("../../utils/cached-vectors/scroll");
var render_loop_1 = require("../../utils/render-loop");
var set_style_1 = require("../../utils/dom/style/set-style");
var for_each_1 = require("../../utils/iterable-iterator/for-each");
var get_offset_ancestors_1 = require("../../utils/dom/position/get-offset-ancestors");
var ScrollSnapAlign;
(function (ScrollSnapAlign) {
    ScrollSnapAlign["BOTH"] = "start end";
    ScrollSnapAlign["TOP"] = "start";
    ScrollSnapAlign["CENTER"] = "center";
    ScrollSnapAlign["BOTTOM"] = "end";
    ScrollSnapAlign["NONE"] = "";
})(ScrollSnapAlign || (ScrollSnapAlign = {}));
var Coordinator = (function () {
    function Coordinator() {
        this.targetsByElement_ = new Map();
    }
    Coordinator.prototype.add = function (target) {
        var _this = this;
        this.targetsByElement_.set(target.getElement(), target);
        get_offset_ancestors_1.getOffsetAncestors(target.getElement().parentElement).forEach(function (ancestor) {
            if (_this.targetsByElement_.has(ancestor)) {
                _this.targetsByElement_.get(ancestor).destroy();
                _this.targetsByElement_.delete(ancestor);
            }
        });
    };
    Coordinator.prototype.delete = function (target) {
        this.targetsByElement_.delete(target.getElement());
    };
    Coordinator.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    return Coordinator;
}());
var ScrollSnapTarget = (function () {
    function ScrollSnapTarget(element) {
        var _this = this;
        this.element_ = element;
        this.resizeHandler_ = function () { return _this.handleResize_(); };
        this.runScrollLoop_ = true;
        this.rfIds_ = new Set();
        this.lastSnapValue_ = null;
        this.scroll_ = scroll_1.Scroll.getSingleton();
    }
    ScrollSnapTarget.fireAndForget = function (element) {
        var instance = new ScrollSnapTarget(element);
        instance.init_();
        return instance;
    };
    ScrollSnapTarget.prototype.init_ = function () {
        Coordinator.getSingleton().add(this);
        this.handleResize_();
        window.addEventListener('resize', this.resizeHandler_);
    };
    ScrollSnapTarget.prototype.handleResize_ = function () {
        var _this = this;
        var snapAlignValue = this.getScrollSnapAlignValue_();
        if (this.lastSnapValue_ === snapAlignValue) {
            return;
        }
        this.lastSnapValue_ = snapAlignValue;
        this.rfIds_.add(render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(_this.element_, 'scroll-snap-align', snapAlignValue); }));
    };
    ScrollSnapTarget.prototype.getScrollSnapAlignValue_ = function () {
        if (this.element_.offsetHeight < window.innerHeight) {
            return ScrollSnapAlign.CENTER;
        }
        else {
            return ScrollSnapAlign.BOTH;
        }
    };
    ScrollSnapTarget.prototype.getElement = function () {
        return this.element_;
    };
    ScrollSnapTarget.prototype.destroy = function () {
        var _this = this;
        Coordinator.getSingleton().delete(this);
        window.removeEventListener('resize', this.resizeHandler_);
        for_each_1.forEach(this.rfIds_.values(), function (rfId) { return render_loop_1.renderLoop.clear(rfId); });
        render_loop_1.renderLoop.anyMutate(function () { return set_style_1.setStyle(_this.element_, 'scroll-snap-align', ScrollSnapAlign.NONE); });
    };
    return ScrollSnapTarget;
}());
exports.ScrollSnapTarget = ScrollSnapTarget;
//# sourceMappingURL=scroll-snap-target.js.map