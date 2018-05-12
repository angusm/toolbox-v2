"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var get_current_anchor_by_visible_or_seen_1 = require("../../utils/dom/anchor/get-current-anchor-by-visible-or-seen");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var NextIdButton = (function () {
    function NextIdButton(element, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
        this.element_ = element;
        this.getAnchorsFn_ = getAnchorsFn;
        this.render_();
    }
    NextIdButton.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            var anchors = _this.getAnchorsFn_();
            var currentAnchor = get_current_anchor_by_visible_or_seen_1.getCurrentAnchorByVisibleOrSeen(_this.getAnchorsFn_);
            var nextIndex = anchors.indexOf(currentAnchor) + 1;
            var nextId = anchors[nextIndex].attributes.getNamedItem('id').value;
            if (nextIndex < anchors.length) {
                render_loop_1.renderLoop.mutate(function () {
                    _this.element_.attributes.getNamedItem('href').value = '#' + nextId;
                });
            }
        });
    };
    return NextIdButton;
}());
exports.NextIdButton = NextIdButton;
//# sourceMappingURL=base.js.map