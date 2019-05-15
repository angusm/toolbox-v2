import { renderLoop } from "../../utils/render-loop";
import { toggleClass } from "../../utils/dom/class/toggle-class";
var MODIFIER = 'active';
var ActiveElementOnCondition = (function () {
    function ActiveElementOnCondition(element, conditionFn, activeClass) {
        if (activeClass === void 0) { activeClass = MODIFIER; }
        this.element_ = element;
        this.conditionFn_ = conditionFn;
        this.activeClass_ = activeClass;
        this.destroyed_ = false;
        this.init_();
    }
    ActiveElementOnCondition.prototype.init_ = function () {
        this.render_();
    };
    ActiveElementOnCondition.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var active = _this.conditionFn_(_this.element_);
            renderLoop.mutate(function () { return toggleClass(_this.element_, _this.activeClass_, active); });
        });
    };
    ActiveElementOnCondition.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ActiveElementOnCondition;
}());
export { ActiveElementOnCondition };
//# sourceMappingURL=active-element-on-condition.js.map