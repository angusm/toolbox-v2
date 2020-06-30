"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveElementOnCondition = void 0;
var render_loop_1 = require("../../utils/render-loop");
var toggle_class_1 = require("../../utils/dom/class/toggle-class");
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
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var active = _this.conditionFn_(_this.element_);
            render_loop_1.renderLoop.mutate(function () { return toggle_class_1.toggleClass(_this.element_, _this.activeClass_, active); });
        });
    };
    ActiveElementOnCondition.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ActiveElementOnCondition;
}());
exports.ActiveElementOnCondition = ActiveElementOnCondition;
//# sourceMappingURL=active-element-on-condition.js.map