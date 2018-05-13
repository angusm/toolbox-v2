import { renderLoop } from '../../utils/render-loop';
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
import { getAnchorsWithCommonSelector } from "../../utils/dom/anchor/get-anchors-with-common-selector";
var CLASS_NAME = 'tb-deep-link-by-scroll';
var DeepLinkMarker = (function () {
    function DeepLinkMarker(getCurrentAnchorFn, getAnchorsFn) {
        if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.getAnchorsFn_ = getAnchorsFn;
        this.init_();
    }
    DeepLinkMarker.prototype.init_ = function () {
        renderLoop.mutate(function () { return document.querySelector('html').classList.add(CLASS_NAME); });
        this.render_();
    };
    DeepLinkMarker.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            var currentAnchorId = _this.getCurrentAnchor_(_this.getAnchorsFn_).id;
            var html = document.querySelector('html');
            renderLoop.measure(function () {
                updateClassModifiers(html, CLASS_NAME, [currentAnchorId]);
            });
        });
    };
    return DeepLinkMarker;
}());
export { DeepLinkMarker };
//# sourceMappingURL=base.js.map