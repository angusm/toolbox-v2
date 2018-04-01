"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../../utils/dom/common-selector");
var render_loop_1 = require("../../utils/render-loop");
var get_class_modifiers_1 = require("../../utils/dom/class/get-class-modifiers");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var is_above_1 = require("../../utils/dom/position/is-above");
var subtract_1 = require("../../utils/array/subtract");
var CLASS_NAME = 'tb-active-on-seen';
var ActiveOnSeen = (function () {
    function ActiveOnSeen(getCurrentAnchorFn, baseClass, querySelector) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.baseClass_ = baseClass;
        this.anchorTargetsQuerySelector_ = querySelector;
        this.init_();
    }
    ActiveOnSeen.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnSeen.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.anchorTargetsQuerySelector_);
            var elements = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.anchorTargetsQuerySelector_))
                .filter(function (element) { return is_above_1.isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            var elementsToActivate = elements
                .filter(function (element) {
                return get_class_modifiers_1.getClassModifiers(element, _this.baseClass_)
                    .some(function (modifier) { return scrolledPastIds.indexOf(modifier) !== -1; });
            });
            var elementsToDeactivate = subtract_1.subtract(elements, elementsToActivate);
            var activeClass = _this.baseClass_ + "--active";
            render_loop_1.renderLoop.mutate(function () {
                elementsToDeactivate
                    .forEach(function (candidate) {
                    return remove_class_modifiers_1.removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                elementsToActivate
                    .forEach(function (candidate) { return add_class_if_missing_1.addClassIfMissing(candidate, activeClass); });
            });
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return ActiveOnSeen;
}());
exports.ActiveOnSeen = ActiveOnSeen;
//# sourceMappingURL=base.js.map