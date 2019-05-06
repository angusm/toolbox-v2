"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_agent_1 = require("./user-agent/user-agent");
var ie_1 = require("./user-agent/browser/ie");
var render_function_id_1 = require("./render-function-id");
var post_load_ready_states_1 = require("./dom/post-load-ready-states");
var RenderStep = (function () {
    function RenderStep() {
    }
    RenderStep.CLEANUP = Symbol('Cleanup');
    RenderStep.FRAME_COUNT = Symbol('Frame Count');
    RenderStep.MEASURE = Symbol('Measure');
    RenderStep.PHYSICS = Symbol('Physics');
    RenderStep.MUTATE = Symbol('Mutate');
    RenderStep.PRE_MEASURE = Symbol('Pre-measure');
    RenderStep.SCROLL_PRE_MEASURE = Symbol('Scroll-measure');
    RenderStep.ANY_PRE_MEASURE = Symbol('Any-measure');
    RenderStep.SCROLL_MEASURE = Symbol('Scroll-measure');
    RenderStep.SCROLL_MUTATE = Symbol('Scroll-mutate');
    RenderStep.ANY_MUTATE = Symbol('Any-mutate');
    RenderStep.SCROLL_CLEANUP = Symbol('Scroll-cleanup');
    RenderStep.ANY_CLEANUP = Symbol('Any-cleanup');
    return RenderStep;
}());
var thirdScrollEventListenerParam = user_agent_1.UserAgent.getBrowser() === ie_1.IE ?
    false : { passive: true, capture: false, once: true };
var ALL_STEP_ORDER = [
    RenderStep.FRAME_COUNT,
    RenderStep.PRE_MEASURE,
    RenderStep.SCROLL_PRE_MEASURE,
    RenderStep.ANY_PRE_MEASURE,
    RenderStep.MEASURE,
    RenderStep.SCROLL_MEASURE,
    RenderStep.PHYSICS,
    RenderStep.MUTATE,
    RenderStep.SCROLL_MUTATE,
    RenderStep.ANY_MUTATE,
    RenderStep.CLEANUP,
    RenderStep.SCROLL_CLEANUP,
    RenderStep.ANY_CLEANUP,
];
var ANIMATION_FRAME_STEP_ORDER = [
    RenderStep.FRAME_COUNT,
    RenderStep.PRE_MEASURE,
    RenderStep.ANY_PRE_MEASURE,
    RenderStep.MEASURE,
    RenderStep.PHYSICS,
    RenderStep.MUTATE,
    RenderStep.ANY_MUTATE,
    RenderStep.CLEANUP,
    RenderStep.ANY_CLEANUP,
];
var SCROLL_STEP_ORDER = [
    RenderStep.SCROLL_PRE_MEASURE,
    RenderStep.ANY_PRE_MEASURE,
    RenderStep.SCROLL_MEASURE,
    RenderStep.SCROLL_MUTATE,
    RenderStep.ANY_MUTATE,
    RenderStep.SCROLL_CLEANUP,
    RenderStep.ANY_CLEANUP,
];
var RenderLoop = (function () {
    function RenderLoop() {
        var _this = this;
        this.scheduledFns_ = new Map();
        this.lastRun_ = performance.now();
        this.runLoopCallback_ = function (timestamp) {
            _this.runLoopAndSetupFrameCallback_(timestamp);
        };
        this.loaded_ = post_load_ready_states_1.POST_LOAD_READY_STATES.has(document.readyState);
        this.scrollHandler_ = function () {
            window.removeEventListener('load', _this.scrollHandler_);
            window.removeEventListener('scroll', _this.scrollHandler_);
            window.removeEventListener('resize', _this.scrollHandler_);
            _this.runScrollLoopAndSetupListener_();
        };
        this.init_();
    }
    RenderLoop.prototype.init_ = function () {
        var _this = this;
        if (!this.loaded_) {
            window.addEventListener('DOMContentLoaded', function () { return _this.loaded_ = true; });
        }
        ALL_STEP_ORDER.forEach(function (step) { return _this.scheduledFns_.set(step, new Map()); });
        this.runStepsInOrder_(ALL_STEP_ORDER);
        this.setupListeners_();
    };
    RenderLoop.prototype.setupListeners_ = function () {
        this.setupScrollListener_();
        this.setupRequestAnimationFrame_();
    };
    RenderLoop.prototype.setupRequestAnimationFrame_ = function () {
        window.requestAnimationFrame(this.runLoopCallback_);
    };
    RenderLoop.prototype.setupScrollListener_ = function () {
        window.addEventListener('load', this.scrollHandler_, thirdScrollEventListenerParam);
        window.addEventListener('scroll', this.scrollHandler_, thirdScrollEventListenerParam);
        window.addEventListener('resize', this.scrollHandler_, thirdScrollEventListenerParam);
    };
    RenderLoop.prototype.framecount = function (fn) {
        return this.addFnToStep_(fn, RenderStep.FRAME_COUNT);
    };
    RenderLoop.prototype.premeasure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.PRE_MEASURE);
    };
    RenderLoop.prototype.measure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.MEASURE);
    };
    RenderLoop.prototype.physics = function (fn) {
        return this.addFnToStep_(fn, RenderStep.PHYSICS);
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
    RenderLoop.prototype.anyPremeasure = function (fn) {
        return this.addFnToStep_(fn, RenderStep.ANY_PRE_MEASURE);
    };
    RenderLoop.prototype.anyMutate = function (fn) {
        return this.addFnToStep_(fn, RenderStep.ANY_MUTATE);
    };
    RenderLoop.prototype.anyCleanup = function (fn) {
        return this.addFnToStep_(fn, RenderStep.ANY_CLEANUP);
    };
    RenderLoop.prototype.addFnToStep_ = function (fn, step) {
        var renderFunctionID = new render_function_id_1.RenderFunctionID(step);
        this.scheduledFns_.get(step).set(renderFunctionID, fn);
        return renderFunctionID;
    };
    RenderLoop.prototype.runLoop = function (currentTime) {
        if (currentTime === void 0) { currentTime = null; }
        this.currentRun_ = currentTime || performance.now();
        this.runStepsInOrder_(this.loaded_ ? ANIMATION_FRAME_STEP_ORDER : ALL_STEP_ORDER);
        this.lastRun_ = this.currentRun_;
    };
    RenderLoop.prototype.runLoopAndSetupFrameCallback_ = function (timestamp) {
        this.runLoop(timestamp);
        this.setupRequestAnimationFrame_();
    };
    RenderLoop.prototype.getElapsedMilliseconds = function () {
        return this.currentRun_ - this.lastRun_;
    };
    RenderLoop.prototype.getElapsedSeconds = function () {
        return this.getElapsedMilliseconds() / 1000;
    };
    RenderLoop.prototype.runScrollLoop = function () {
        this.runStepsInOrder_(SCROLL_STEP_ORDER);
    };
    RenderLoop.prototype.runScrollLoopAndSetupListener_ = function () {
        this.runScrollLoop();
        this.setupScrollListener_();
    };
    RenderLoop.prototype.runStepsInOrder_ = function (stepsInOrder) {
        var _this = this;
        stepsInOrder.forEach(function (step) { return _this.runFnsForStep_(step); });
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
    RenderLoop.prototype.getFps = function () {
        return 60;
    };
    RenderLoop.prototype.getTargetFrameLength = function () {
        return RenderLoop.msPerFrame_;
    };
    RenderLoop.prototype.getMsPerFrame = function () {
        return RenderLoop.msPerFrame_;
    };
    RenderLoop.prototype.setFps = function () {
        console.warn('DEPRECATED: RenderLoop support for custom frame-rates has been ' +
            'dropped. Defaulting to maximum FPS per browser. This is to reduce ' +
            'overhead inside the loop.');
    };
    RenderLoop.singleton_ = null;
    RenderLoop.msPerFrame_ = 1000 / 60;
    return RenderLoop;
}());
var renderLoop = RenderLoop.getSingleton();
exports.renderLoop = renderLoop;
//# sourceMappingURL=render-loop.js.map