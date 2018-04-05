import { renderLoop } from "../../utils/render-loop";
var RunOnCondition = (function () {
    function RunOnCondition(actionFn, conditionFn, alternateFn) {
        if (alternateFn === void 0) { alternateFn = null; }
        this.actionFn_ = actionFn;
        this.conditionFn_ = conditionFn;
        this.alternateFn_ = alternateFn;
        this.init_();
    }
    RunOnCondition.prototype.init_ = function () {
        this.render_();
    };
    RunOnCondition.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (_this.conditionFn_()) {
                renderLoop.mutate(function () { return _this.actionFn_(); });
            }
            else if (_this.alternateFn_) {
                renderLoop.mutate(function () { return _this.alternateFn_(); });
            }
        });
    };
    return RunOnCondition;
}());
export { RunOnCondition };
//# sourceMappingURL=base.js.map