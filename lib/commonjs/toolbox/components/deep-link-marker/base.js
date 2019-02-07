"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var update_class_modifiers_1 = require("../../utils/dom/class/update-class-modifiers");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var CLASS_NAME = 'tb-deep-link-by-scroll';
var DeepLinkMarker = (function () {
    function DeepLinkMarker(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    DeepLinkMarker.prototype.init_ = function () {
        render_loop_1.renderLoop.mutate(function () { return document.querySelector('html').classList.add(CLASS_NAME); });
        this.render_();
    };
    DeepLinkMarker.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchorId = _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            var html = document.querySelector('html');
            render_loop_1.renderLoop.measure(function () {
                update_class_modifiers_1.updateClassModifiers(html, CLASS_NAME, [currentAnchorId]);
            });
        });
    };
    return DeepLinkMarker;
}());
exports.DeepLinkMarker = DeepLinkMarker;
//# sourceMappingURL=base.js.map