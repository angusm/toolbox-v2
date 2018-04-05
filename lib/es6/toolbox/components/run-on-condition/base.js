import { renderLoop } from "../../utils/render-loop";
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
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.conditionFn_()) {
                return;
            }
            renderLoop.mutate(function () { return _this.actionFn_(); });
        });
    };
    return RunOnCondtion;
}());
export { RunOnCondtion };
//# sourceMappingURL=base.js.map