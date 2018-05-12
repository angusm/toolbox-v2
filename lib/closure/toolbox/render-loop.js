goog.module('toolbox.render_loop');var module = module || {id: 'toolbox/render-loop.js'};

var dynamic_default_1 = goog.require('toolbox.map.dynamic_default');
var RenderStep = (function () {
    function RenderStep() {
    }
    RenderStep.CLEANUP = Symbol('Cleanup');
    RenderStep.FRAME_COUNT = Symbol('Frame Count');
    RenderStep.MEASURE = Symbol('Measure');
    RenderStep.MUTATE = Symbol('Mutate');
    RenderStep.PRE_MEASURE = Symbol('Pre-measure');
    return RenderStep;
}());
var STEP_ORDER = [
    RenderStep.FRAME_COUNT,
    RenderStep.PRE_MEASURE,
    RenderStep.MEASURE,
    RenderStep.MUTATE,
    RenderStep.CLEANUP,
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
        this.scheduledFns_ =
            dynamic_default_1.DynamicDefaultMap
                .usingFunction(function (unused) { return new Map(); });
        this.msPerFrame_ = 0;
        this.lastRun_ = null;
        this.runLoop();
    }
    RenderLoop.prototype.framecount = function (fn) {
        return this.addFnToStep(fn, RenderStep.FRAME_COUNT);
    };
    RenderLoop.prototype.premeasure = function (fn) {
        return this.addFnToStep(fn, RenderStep.PRE_MEASURE);
    };
    RenderLoop.prototype.measure = function (fn) {
        return this.addFnToStep(fn, RenderStep.MEASURE);
    };
    RenderLoop.prototype.mutate = function (fn) {
        return this.addFnToStep(fn, RenderStep.MUTATE);
    };
    RenderLoop.prototype.cleanup = function (fn) {
        return this.addFnToStep(fn, RenderStep.CLEANUP);
    };
    RenderLoop.prototype.setFps = function (fps) {
        this.msPerFrame_ = 1000 / fps;
    };
    RenderLoop.prototype.addFnToStep = function (fn, step) {
        var renderFn = new RenderFunctionID(step);
        this.scheduledFns_.get(step).set(renderFn, fn);
        return renderFn;
    };
    RenderLoop.prototype.getTimeUntilNextRun = function (currentTime) {
        return currentTime - this.lastRun_ - this.msPerFrame_;
    };
    RenderLoop.prototype.runLoop = function () {
        var _this = this;
        var time = new Date().valueOf();
        var timeUntilNextRun = this.getTimeUntilNextRun(time);
        this.lastRun_ = time;
        this.runFns();
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