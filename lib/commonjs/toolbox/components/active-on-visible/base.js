"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var is_visible_1 = require("../../utils/dom/position/is-visible");
var subtract_1 = require("../../utils/array/subtract");
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
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var candidates = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var candidatesToDeactivate = candidates.filter(function (candidate) { return !is_visible_1.isVisible(candidate); });
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
    return ActiveOnVisible;
}());
exports.ActiveOnVisible = ActiveOnVisible;
//# sourceMappingURL=base.js.map