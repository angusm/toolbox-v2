"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var is_scrolled_past_1 = require("../../utils/dom/position/is-scrolled-past");
var update_class_modifiers_1 = require("../../utils/dom/update-class-modifiers");
var CLASS_NAME = 'tb-id-marker';
var IdMarker = (function () {
    function IdMarker(selector) {
        if (selector === void 0) { selector = '[id]'; }
        this.selector_ = selector;
        this.init_();
    }
    IdMarker.prototype.init_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var html = document.querySelector('html');
            var scrolledPastIds = Array.from(document.querySelectorAll(_this.selector_))
                .filter(function (element) { return is_scrolled_past_1.isScrolledPast(element); })
                .map(function (element) { return element.id; });
            render_loop_1.renderLoop.mutate(function () { return update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, scrolledPastIds); });
            render_loop_1.renderLoop.cleanup(function () { return _this.init_(); });
        });
    };
    return IdMarker;
}());
exports.IdMarker = IdMarker;
//# sourceMappingURL=base.js.map