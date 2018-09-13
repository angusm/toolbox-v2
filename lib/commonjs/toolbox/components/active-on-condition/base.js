"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var subtract_1 = require("../../utils/array/subtract");
var MODIFIER = 'active';
var ActiveOnCondition = (function () {
    function ActiveOnCondition(baseClass, conditionFn, modifier) {
        if (modifier === void 0) { modifier = MODIFIER; }
        this.baseClass_ = baseClass;
        this.conditionFn_ = conditionFn;
        this.modifier_ = modifier;
        this.destroyed_ = false;
        this.init_();
    }
    ActiveOnCondition.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnCondition.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var candidatesToDeactivate = candidates.filter(function (candidate) { return !_this.conditionFn_(candidate); });
            var candidatesToActivate = subtract_1.subtract(candidates, candidatesToDeactivate);
            var activeClass = _this.baseClass_ + "--" + _this.modifier_;
            render_loop_1.renderLoop.mutate(function () {
                candidatesToDeactivate
                    .forEach(function (candidate) {
                    return remove_class_modifiers_1.removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                candidatesToActivate
                    .forEach(function (candidate) { return add_class_if_missing_1.addClassIfMissing(candidate, activeClass); });
            });
        });
    };
    ActiveOnCondition.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ActiveOnCondition;
}());
exports.ActiveOnCondition = ActiveOnCondition;
//# sourceMappingURL=base.js.map