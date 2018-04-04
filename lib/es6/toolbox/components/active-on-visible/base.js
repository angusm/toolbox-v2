import { renderLoop } from "../../utils/render-loop";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { isVisible } from "../../utils/dom/position/is-visible";
import { subtract } from "../../utils/array/subtract";
var CLASS_NAME = 'tb-active-on-visible';
var MODIFIER = 'active';
var ActiveOnVisible = (function () {
    function ActiveOnVisible(baseClass, modifier) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (modifier === void 0) { modifier = MODIFIER; }
        this.baseClass_ = baseClass;
        this.modifier_ = modifier;
        this.init_();
    }
    ActiveOnVisible.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnVisible.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var candidatesToDeactivate = candidates.filter(function (candidate) { return !isVisible(candidate); });
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
    return ActiveOnVisible;
}());
export { ActiveOnVisible };
//# sourceMappingURL=base.js.map