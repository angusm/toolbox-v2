"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveOnSeenId = void 0;
var render_loop_1 = require("../../utils/render-loop");
var get_class_modifiers_1 = require("../../utils/dom/class/get-class-modifiers");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var is_above_1 = require("../../utils/dom/position/is-above");
var subtract_1 = require("../../utils/array/subtract");
var get_displayed_anchors_1 = require("../../utils/dom/anchor/get-displayed-anchors");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var CLASS_NAME = 'tb-active-on-seen';
var ActiveOnSeenId = (function () {
    function ActiveOnSeenId(getCurrentAnchorFn, baseClass, getAnchorsFn) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.baseClass_ = baseClass;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    ActiveOnSeenId.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnSeenId.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.getAnchorsFn_);
            var elements = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var scrolledPastIds = get_displayed_anchors_1.getDisplayedAnchors(_this.getAnchorsFn_)
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
            var inactiveClass = _this.baseClass_ + "--inactive";
            render_loop_1.renderLoop.mutate(function () {
                elementsToDeactivate
                    .forEach(function (candidate) {
                    remove_class_modifiers_1.removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                    add_class_if_missing_1.addClassIfMissing(candidate, inactiveClass);
                });
                elementsToActivate
                    .forEach(function (candidate) {
                    remove_class_modifiers_1.removeClassModifiers(candidate, _this.baseClass_, { whitelist: [inactiveClass] });
                    add_class_if_missing_1.addClassIfMissing(candidate, activeClass);
                });
            });
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return ActiveOnSeenId;
}());
exports.ActiveOnSeenId = ActiveOnSeenId;
//# sourceMappingURL=base.js.map