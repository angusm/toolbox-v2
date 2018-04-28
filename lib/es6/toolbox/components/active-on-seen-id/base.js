import { CommonSelector } from "../../utils/dom/common-selector";
import { renderLoop } from "../../utils/render-loop";
import { getClassModifiers } from "../../utils/dom/class/get-class-modifiers";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { isAbove } from "../../utils/dom/position/is-above";
import { subtract } from "../../utils/array/subtract";
import { getDisplayedAnchors } from "../../utils/dom/anchor/get-displayed-anchors";
var CLASS_NAME = 'tb-active-on-seen';
var ActiveOnSeenId = (function () {
    function ActiveOnSeenId(getCurrentAnchorFn, baseClass, querySelector) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.baseClass_ = baseClass;
        this.anchorTargetsQuerySelector_ = querySelector;
        this.init_();
    }
    ActiveOnSeenId.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnSeenId.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.anchorTargetsQuerySelector_);
            var elements = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var scrolledPastIds = getDisplayedAnchors(_this.anchorTargetsQuerySelector_)
                .filter(function (element) { return isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            var elementsToActivate = elements
                .filter(function (element) {
                return getClassModifiers(element, _this.baseClass_)
                    .some(function (modifier) { return scrolledPastIds.indexOf(modifier) !== -1; });
            });
            var elementsToDeactivate = subtract(elements, elementsToActivate);
            var activeClass = _this.baseClass_ + "--active";
            var inactiveClass = _this.baseClass_ + "--inactive";
            renderLoop.mutate(function () {
                elementsToDeactivate
                    .forEach(function (candidate) {
                    removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                    addClassIfMissing(candidate, inactiveClass);
                });
                elementsToActivate
                    .forEach(function (candidate) {
                    removeClassModifiers(candidate, _this.baseClass_, { whitelist: [inactiveClass] });
                    addClassIfMissing(candidate, activeClass);
                });
            });
            renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return ActiveOnSeenId;
}());
export { ActiveOnSeenId };
//# sourceMappingURL=base.js.map