"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeenIdMarker = void 0;
var is_above_1 = require("../../utils/dom/position/is-above");
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var CLASS_NAME = 'tb-id-marker';
var SeenIdMarker = (function () {
    function SeenIdMarker(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    SeenIdMarker.prototype.init_ = function () {
        this.render_();
    };
    SeenIdMarker.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchor = _this.getCurrentAnchor_(_this.getAnchorsFn_);
            var html = document.querySelector('html');
            var scrolledPastIds = _this.getAnchorsFn_()
                .filter(function (element) { return is_above_1.isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
        });
    };
    return SeenIdMarker;
}());
exports.SeenIdMarker = SeenIdMarker;
//# sourceMappingURL=base.js.map