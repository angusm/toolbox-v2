"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var RunOnCondtion = (function () {
    function RunOnCondtion(actionFn, conditionFn) {
        this.actionFn_ = actionFn;
        this.conditionFn_ = conditionFn;
        this.init_();
    }
    RunOnCondtion.prototype.init_ = function () {
        this.render_();
    };
    RunOnCondtion.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.conditionFn_()) {
                return;
            }
            render_loop_1.renderLoop.mutate(function () { return _this.actionFn_(); });
        });
    };
    return RunOnCondtion;
}());
exports.RunOnCondtion = RunOnCondtion;
//# sourceMappingURL=base.js.map