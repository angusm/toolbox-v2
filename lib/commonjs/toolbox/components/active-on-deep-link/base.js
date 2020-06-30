"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveOnDeepLink = void 0;
var render_loop_1 = require("../../utils/render-loop");
var get_class_modifiers_1 = require("../../utils/dom/class/get-class-modifiers");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var CLASS_NAME = 'tb-id-marker';
var ActiveOnDeepLink = (function () {
    function ActiveOnDeepLink(getCurrentAnchorFn, baseClass, getAnchorsFn) {
        if (baseClass === void 0) { baseClass = CLASS_NAME; }
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
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
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchorId = _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            var candidates = document.querySelectorAll("." + _this.baseClass_);
            var candidatesToDeactivate = Array.from(candidates)
                .filter(function (candidate) {
                return get_class_modifiers_1.getClassModifiers(candidate, _this.baseClass_)
                    .indexOf(currentAnchorId) === -1;
            });
            var candidatesToActivate = Array.from(candidates)
                .filter(function (candidate) { return candidatesToDeactivate.indexOf(candidate) === -1; });
            var activeClass = _this.baseClass_ + "--active";
            render_loop_1.renderLoop.mutate(function () {
                candidatesToDeactivate
                    .forEach(function (candidate) {
                    return remove_class_modifiers_1.removeClassModifiers(candidate, _this.baseClass_, { whitelist: [activeClass] });
                });
                candidatesToActivate
                    .forEach(function (candidate) {
                    return add_class_if_missing_1.addClassIfMissing(candidate, activeClass);
                });
            });
        });
    };
    return ActiveOnDeepLink;
}());
exports.ActiveOnDeepLink = ActiveOnDeepLink;
//# sourceMappingURL=base.js.map