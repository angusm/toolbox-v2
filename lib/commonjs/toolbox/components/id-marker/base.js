"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var common_selector_1 = require("../../utils/dom/common-selector");
var is_above_1 = require("../../utils/dom/position/is-above");
var CLASS_NAME = 'tb-id-marker';
var IdMarker = (function () {
    function IdMarker(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    IdMarker.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.querySelector_))
                .filter(function (element) { return is_above_1.isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; });
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            render_loop_1.renderLoop.cleanup(function () { return _this.init_(); });
        });
    };
    return IdMarker;
}());
exports.IdMarker = IdMarker;
//# sourceMappingURL=base.js.map