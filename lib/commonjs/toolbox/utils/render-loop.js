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
        this.scheduledFns =
            dynamic_default_1.DynamicDefaultMap
                .usingFunction(function (unused) { return new Map(); });
        this.fps = FPS;
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
        this.fps = fps;
    };
    RenderLoop.prototype.addFnToStep = function (fn, step) {
        var renderFn = new RenderFunctionID(step);
        this.scheduledFns.get(step).set(renderFn, fn);
        return renderFn;
    };
    RenderLoop.prototype.getTimeUntilNextRun = function () {
        return 1000 / this.fps;
    };
    RenderLoop.prototype.runLoop = function () {
        var _this = this;
        this.runFns();
        var timeUntilNextRun = this.getTimeUntilNextRun();
        setTimeout(function () { return window.requestAnimationFrame(function () { return _this.runLoop(); }); }, timeUntilNextRun);
    };
    RenderLoop.prototype.runFns = function () {
        var _this = this;
        STEP_ORDER.forEach(function (step) { return _this.runFnsForStep(step); });
    };
    RenderLoop.prototype.runFnsForStep = function (step) {
        var fns = this.scheduledFns.get(step).values();
        var nextFn;
        while (nextFn = fns.next().value) {
            nextFn();
        }
        this.scheduledFns.set(step, new Map());
    };
    RenderLoop.prototype.clear = function (renderFn) {
        this.scheduledFns.get(renderFn.step).delete(renderFn);
    };
    RenderLoop.getSingleton = function () {
        return RenderLoop.singleton = RenderLoop.singleton || new this();
    };
    RenderLoop.singleton = null;
    return RenderLoop;
}());
var renderLoop = RenderLoop.getSingleton();
exports.renderLoop = renderLoop;
//# sourceMappingURL=render-loop.js.map