import { CommonSelector } from "../../utils/dom/common-selector";
import { renderLoop } from "../../utils/render-loop";
import { getClassModifiers } from "../../utils/dom/class/get-class-modifiers";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
var CLASS_NAME = 'tb-id-marker';
var ActiveOnDeepLink = (function () {
    function ActiveOnDeepLink(getCurrentAnchorFn, baseClass, querySelector) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.baseClass_ = baseClass;
        this.anchorTargetsQuerySelector_ = querySelector;
        this.init_();
    }
    ActiveOnDeepLink.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnDeepLink.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchorId = _this.getCurrentAnchor_(_this.anchorTargetsQuerySelector_)
                .id;
            var candidates = document.querySelectorAll("." + _this.baseClass_);
            var candidatesToDeactivate = Array.from(candidates)
                .filter(function (candidate) {
                return getClassModifiers(candidate, CLASS_NAME)
                    .indexOf(currentAnchorId) === -1;
            });
            var candidatesToActivate = Array.from(candidates)
                .filter(function (candidate) { return candidatesToDeactivate.indexOf(candidate) === -1; });
            var activeClass = _this.baseClass_ + "--active";
            renderLoop.measure(function () {
                candidatesToDeactivate
                    .forEach(function (candidate) {
                    return removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                candidatesToActivate
                    .forEach(function (candidate) {
                    return addClassIfMissing(candidate, activeClass);
                });
            });
        });
    };
    return ActiveOnDeepLink;
}());
export { ActiveOnDeepLink };
//# sourceMappingURL=base.js.map