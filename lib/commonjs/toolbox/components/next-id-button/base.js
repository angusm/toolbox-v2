"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextIdButton = void 0;
var render_loop_1 = require("../../utils/render-loop");
var get_current_anchor_by_visible_or_seen_1 = require("../../utils/dom/anchor/get-current-anchor-by-visible-or-seen");
var get_anchors_with_common_selector_1 = require("../../utils/dom/anchor/get-anchors-with-common-selector");
var get_next_anchor_1 = require("../../utils/dom/anchor/get-next-anchor");
var is_displayed_1 = require("../../utils/dom/style/is-displayed");
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
            var nextAnchor = get_next_anchor_1.getNextAnchor(get_current_anchor_by_visible_or_seen_1.getCurrentAnchorByVisibleOrSeen, _this.getAnchorsFn_);
            if (nextAnchor) {
                var nextHref_1 = is_displayed_1.isDisplayed(nextAnchor) ?
                    "#" + nextAnchor.attributes.getNamedItem('id').value :
                    null;
                render_loop_1.renderLoop.mutate(function () {
                    if (nextHref_1) {
                        _this.element_.setAttribute('href', nextHref_1);
                    }
                    else {
                        _this.element_.removeAttribute('href');
                    }
                });
            }
        });
    };
    return NextIdButton;
}());
exports.NextIdButton = NextIdButton;
//# sourceMappingURL=base.js.map