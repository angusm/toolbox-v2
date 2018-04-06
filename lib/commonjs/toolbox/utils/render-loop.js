"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamic_default_1 = require("./map/dynamic-default");
var Step = (function () {
    function Step() {
    }
    Step.CLEANUP = Symbol('Cleanup');
    Step.FRAME_COUNT = Symbol('Frame Count');
    Step.MEASURE = Symbol('Measure');
    Step.MUTATE = Symbol('Mutate');
    Step.PRE_MEASURE = Symbol('Pre-measure');
    return Step;
}());
var STEP_ORDER = [
    Step.FRAME_COUNT,
    Step.PRE_MEASURE,
    Step.MEASURE,
    Step.MUTATE,
    Step.CLEANUP,
];
var FPS = Number.MAX_VALUE;
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
        this.scheduledFns_ =
            dynamic_default_1.DynamicDefaultMap
                .usingFunction(function (unused) { return new Map(); });
        this.fps_ = FPS;
        this.lastRun_ = null;
        this.runLoop();
    }
    RenderLoop.prototype.framecount = function (fn) {
        return this.addFnToStep(fn, Step.FRAME_COUNT);
    };
    RenderLoop.prototype.premeasure = function (fn) {
        return this.addFnToStep(fn, Step.PRE_MEASURE);
    };
    RenderLoop.prototype.measure = function (fn) {
        return this.addFnToStep(fn, Step.MEASURE);
    };
    RenderLoop.prototype.mutate = function (fn) {
        return this.addFnToStep(fn, Step.MUTATE);
    };
    RenderLoop.prototype.cleanup = function (fn) {
        return this.addFnToStep(fn, Step.CLEANUP);
    };
    RenderLoop.prototype.setFps = function (fps) {
        this.fps_ = fps;
    };
    RenderLoop.prototype.addFnToStep = function (fn, step) {
        var renderFn = new RenderFunctionID(step);
        this.scheduledFns_.get(step).set(renderFn, fn);
        return renderFn;
    };
    RenderLoop.prototype.getTimeUntilNextRun = function () {
        return new Date().valueOf() - (this.lastRun_ + (1000 / this.fps_));
    };
    RenderLoop.prototype.runLoop = function () {
        var _this = this;
        this.lastRun_ = new Date().valueOf();
        this.runFns();
        var timeUntilNextRun = this.getTimeUntilNextRun();
        if (timeUntilNextRun > 2) {
            setTimeout(function () { return window.requestAnimationFrame(function () { return _this.runLoop(); }); }, timeUntilNextRun);
        }
        else {
            window.requestAnimationFrame(function () { return _this.runLoop(); });
        }
    };
    RenderLoop.prototype.runFns = function () {
        var _this = this;
        STEP_ORDER.forEach(function (step) { return _this.runFnsForStep(step); });
    };
    RenderLoop.prototype.runFnsForStep = function (step) {
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