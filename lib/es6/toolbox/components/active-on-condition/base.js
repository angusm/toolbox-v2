import { renderLoop } from "../../utils/render-loop";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { subtract } from "../../utils/array/subtract";
var MODIFIER = 'active';
var ActiveOnCondition = (function () {
    function ActiveOnCondition(baseClass, conditionFn, modifier) {
        if (modifier === void 0) { modifier = MODIFIER; }
        this.baseClass_ = baseClass;
        this.conditionFn_ = conditionFn;
        this.modifier_ = modifier;
        this.init_();
    }
    ActiveOnCondition.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnCondition.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var candidatesToDeactivate = candidates.filter(function (candidate) { return !_this.conditionFn_(candidate); });
            var candidatesToActivate = subtract(candidates, candidatesToDeactivate);
            var activeClass = _this.baseClass_ + "--" + _this.modifier_;
            renderLoop.mutate(function () {
                candidatesToDeactivate
                    .forEach(function (candidate) {
                    return removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                candidatesToActivate
                    .forEach(function (candidate) { return addClassIfMissing(candidate, activeClass); });
            });
        });
    };
    return ActiveOnCondition;
}());
export { ActiveOnCondition };
//# sourceMappingURL=base.js.map