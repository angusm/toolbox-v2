"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("./map/dynamic-default");
var RenderStep = (function () {
    function RenderStep() {
    }
    RenderStep.CLEANUP = Symbol('Cleanup');
    RenderStep.FRAME_COUNT = Symbol('Frame Count');
    RenderStep.MEASURE = Symbol('Measure');
    RenderStep.MUTATE = Symbol('Mutate');
    RenderStep.PRE_MEASURE = Symbol('Pre-measure');
    RenderStep.SCROLL_PRE_MEASURE = Symbol('Scroll-measure');
    RenderStep.SCROLL_MEASURE = Symbol('Scroll-measure');
    RenderStep.SCROLL_MUTATE = Symbol('Scroll-mutate');
    RenderStep.SCROLL_CLEANUP = Symbol('Scroll-cleanup');
    return RenderStep;
}());
var STEP_ORDER = [
    RenderStep.FRAME_COUNT,
    RenderStep.PRE_MEASURE,
    RenderStep.MEASURE,
    RenderStep.MUTATE,
    RenderStep.CLEANUP,
];
var SCROLL_STEP_ORDER = [
    RenderStep.SCROLL_PRE_MEASURE,
    RenderStep.SCROLL_MEASURE,
    RenderStep.SCROLL_MUTATE,
    RenderStep.SCROLL_CLEANUP,
];
var RenderFunctionID = (function () {
    function RenderFunctionID(step) {
        this.step_ = step;
    }
    Object.defineProperty(RenderFunctionID.prototype, "step", {
        get: function () {
            return this.step_;
        },
        enumerable: true,
        configurable: true
    });
    return RenderFunctionID;
}());
var RenderLoop = (function () {
    function RenderLoop() {
        var _this = this;
        this.scheduledFns_ =
            dynamic_default_1.DynamicDefaultMap
                .usingFunction(function (unused) { return new Map(); });
        this.msPerFrame_ = 33;
        window.addEventListener('scroll', function () { return _this.runScrollLoop_(); });
        this.runLoop_();
    }
    RenderLoop.prototype.framecount = function (fn) {
        return this.addFnToStep_(fn, RenderStep.FRAME_COUNT);
    };
    RenderLoop.prototype.premeasure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.PRE_MEASURE);
    };
    RenderLoop.prototype.measure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.MEASURE);
    };
    RenderLoop.prototype.mutate = function (fn) {
        return this.addFnToStep_(fn, RenderStep.MUTATE);
    };
    RenderLoop.prototype.cleanup = function (fn) {
        return this.addFnToStep_(fn, RenderStep.CLEANUP);
    };
    RenderLoop.prototype.scrollPremeasure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.SCROLL_PRE_MEASURE);
    };
    RenderLoop.prototype.scrollMeasure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.SCROLL_MEASURE);
    };
    RenderLoop.prototype.scrollMutate = function (fn) {
        return this.addFnToStep_(fn, RenderStep.SCROLL_MUTATE);
    };
    RenderLoop.prototype.scrollCleanup = function (fn) {
        return this.addFnToStep_(fn, RenderStep.SCROLL_CLEANUP);
    };
    RenderLoop.prototype.setFps = function (fps) {
        this.msPerFrame_ = 1000 / fps;
    };
    RenderLoop.prototype.addFnToStep_ = function (fn, step) {
        var renderFn = new RenderFunctionID(step);
        this.scheduledFns_.get(step).set(renderFn, fn);
        return renderFn;
    };
    RenderLoop.getTimeUntilNextRun_ = function (nextRun) {
        return nextRun - new Date().valueOf();
    };
    RenderLoop.prototype.runLoop_ = function () {
        var _this = this;
        var nextRun = new Date().valueOf() + this.msPerFrame_;
        this.runFns_();
        if (RenderLoop.getTimeUntilNextRun_(nextRun) > 2) {
            setTimeout(function () { return window.requestAnimationFrame(function () { return _this.runLoop_(); }); }, RenderLoop.getTimeUntilNextRun_(nextRun));
        }
        else {
            window.requestAnimationFrame(function () { return _this.runLoop_(); });
        }
    };
    RenderLoop.prototype.runScrollLoop_ = function () {
        this.runScrollFns_();
    };
    RenderLoop.prototype.runScrollFns_ = function () {
        var _this = this;
        SCROLL_STEP_ORDER.forEach(function (step) { return _this.runFnsForStep_(step); });
    };
    RenderLoop.prototype.runFns_ = function () {
        var _this = this;
        STEP_ORDER.forEach(function (step) { return _this.runFnsForStep_(step); });
    };
    RenderLoop.prototype.runFnsForStep_ = function (step) {
        var fns = this.scheduledFns_.get(step).values();
        var nextFn;
        while (nextFn = fns.next().value) {
            nextFn();
        }
        this.scheduledFns_.set(step, new Map());
    };
    RenderLoop.prototype.clear = function (renderFn) {
        this.scheduledFns_.get(renderFn.step).delete(renderFn);
    };
    RenderLoop.getSingleton = function () {
        return RenderLoop.singleton_ = RenderLoop.singleton_ || new this();
    };
    RenderLoop.singleton_ = null;
    return RenderLoop;
}());
var renderLoop = RenderLoop.getSingleton();
exports.renderLoop = renderLoop;
//# sourceMappingURL=render-loop.js.map