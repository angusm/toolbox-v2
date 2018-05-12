import { renderLoop } from "../../utils/render-loop";
import { getClassModifiers } from "../../utils/dom/class/get-class-modifiers";
import { removeClassModifiers } from "../../utils/dom/class/remove-class-modifiers";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
var CLASS_NAME = 'tb-id-marker';
var ActiveOnDeepLink = (function () {
    function ActiveOnDeepLink(getCurrentAnchorFn, baseClass, getAnchorsFn) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.baseClass_ = baseClass;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    ActiveOnDeepLink.prototype.init_ = function () {
        this.render_();
    };
    ActiveOnDeepLink.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchorId = _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            var candidates = document.querySelectorAll("." + _this.baseClass_);
            var candidatesToDeactivate = Array.from(candidates)
                .filter(function (candidate) {
                return getClassModifiers(candidate, _this.baseClass_)
                    .indexOf(currentAnchorId) === -1;
            });
            var candidatesToActivate = Array.from(candidates)
                .filter(function (candidate) { return candidatesToDeactivate.indexOf(candidate) === -1; });
            var activeClass = _this.baseClass_ + "--active";
            renderLoop.mutate(function () {
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