"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var ActiveOnCondition = (function () {
    function ActiveOnCondition(actionFn, conditionFn) {
        this.actionFn_ = actionFn;
        this.conditionFn_ = conditionFn;
        this.init_();
    }
    ActiveOnCondition.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnCondition.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.conditionFn_()) {
                return;
            }
            render_loop_1.renderLoop.mutate(function () { return _this.actionFn_(); });
        });
    };
    return ActiveOnCondition;
}());
exports.ActiveOnCondition = ActiveOnCondition;
//# sourceMappingURL=base.js.map