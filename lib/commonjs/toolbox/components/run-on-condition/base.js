"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var RunOnCondition = (function () {
    function RunOnCondition(actionFn, conditionFn, alternateFn) {
        if (conditionFn === void 0) { conditionFn = function () { return true; }; }
        if (alternateFn === void 0) { alternateFn = null; }
        this.actionFn_ = actionFn;
        this.conditionFn_ = conditionFn;
        this.alternateFn_ = alternateFn;
        this.init_();
    }
    RunOnCondition.prototype.shouldRun_ = function (newValue) {
        return this.lastValue_ !== newValue;
    };
    RunOnCondition.prototype.init_ = function () {
        this.render_();
    };
    RunOnCondition.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var conditionResult = _this.conditionFn_();
            if (_this.shouldRun_(conditionResult)) {
                if (conditionResult) {
                    _this.actionFn_();
                }
                else if (_this.alternateFn_) {
                    _this.alternateFn_();
                }
            }
            _this.lastValue_ = conditionResult;
        });
    };
    return RunOnCondition;
}());
exports.RunOnCondition = RunOnCondition;
//# sourceMappingURL=base.js.map