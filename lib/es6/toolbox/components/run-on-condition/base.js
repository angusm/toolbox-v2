import { renderLoop } from "../../utils/render-loop";
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
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (!_this.conditionFn_()) {
                return;
            }
            renderLoop.mutate(function () { return _this.actionFn_(); });
        });
    };
    return ActiveOnCondition;
}());
export { ActiveOnCondition };
//# sourceMappingURL=base.js.map