"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../../utils/dom/common-selector");
var is_above_1 = require("../../utils/dom/position/is-above");
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var CLASS_NAME = 'tb-id-marker';
var SeenIdMarker = (function () {
    function SeenIdMarker(getCurrentAnchorFn, querySelector) {
        if (querySelector === void 0) { querySelector = common_selector_1.CommonSelector.DEEP_LINK_TARGETS; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.querySelector_ = querySelector;
        this.init_();
    }
    SeenIdMarker.prototype.init_ = function () {
        this.render_();
    };
    SeenIdMarker.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_(_this.querySelector_);
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.querySelector_))
                .filter(function (element) { return is_above_1.isAbove(element, currentAnchor); })
                .map(function (element) { return element.id; })
                .concat(currentAnchor.id);
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return SeenIdMarker;
}());
exports.SeenIdMarker = SeenIdMarker;
//# sourceMappingURL=base.js.map