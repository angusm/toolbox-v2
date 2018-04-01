import { CommonSelector } from "../../utils/dom/common-selector";
import { renderLoop } from "../../utils/render-loop";
import { getClassModifiers } from "../../utils/dom/class/get-class-modifiers";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { isAbove } from "../../utils/dom/position/is-above";
import { subtract } from "../../utils/array/subtract";
var CLASS_NAME = 'tb-active-on-seen';
var ActiveOnSeen = (function () {
    function ActiveOnSeen(getCurrentAnchorFn, baseClass, querySelector) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
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
        renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.anchorTargetsQuerySelector_);
            var elements = Array.from(document.querySelectorAll("." + _this.baseClass_));
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.anchorTargetsQuerySelector_))
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
            renderLoop.mutate(function () {
                elementsToDeactivate
                    .forEach(function (candidate) {
                    return removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                elementsToActivate
                    .forEach(function (candidate) { return addClassIfMissing(candidate, activeClass); });
            });
            renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return ActiveOnSeen;
}());
export { ActiveOnSeen };
//# sourceMappingURL=base.js.map