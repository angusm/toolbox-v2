import { Scroll } from '../../utils/cached-vectors/scroll';
import { renderLoop } from '../../utils/render-loop';
import { setScrollTop } from '../../utils/dom/position/set-scroll-top';
var windowScroll = Scroll.getSingleton();
var CLASS_NAME = 'deep-link-by-scroll';
function updateClassList(anchorId) {
    var classToAdd = CLASS_NAME + "--" + anchorId;
    var html = document.querySelector('html');
    var classesToRemove = Array.from(html.classList)
        .filter(function (className) {
        return className.indexOf(CLASS_NAME) !== -1 &&
            className !== CLASS_NAME &&
            className !== classToAdd;
    });
    classesToRemove.forEach(function (className) { return html.classList.remove(className); });
    if (!html.classList.contains(classToAdd)) {
        html.classList.add(classToAdd);
    }
}
var DeepLinkByScroll = (function () {
    function DeepLinkByScroll(getCurrentAnchorFn, alterHash) {
        if (alterHash === void 0) { alterHash = true; }
        this.alterHash_ = alterHash;
        this.getCurrentAnchor_ = getCurrentAnchorFn;
        this.init_();
    }
    DeepLinkByScroll.prototype.init_ = function () {
        renderLoop.mutate(function () { return document.querySelector('html').classList.add(CLASS_NAME); });
        this.render_();
    };
    DeepLinkByScroll.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            var currentAnchor = _this.getCurrentAnchor_();
            renderLoop.mutate(function () {
                updateClassList(currentAnchor.id);
                if (!_this.alterHash_) {
                    return;
                }
                var currentScroll = windowScroll.getPosition().y;
                window.location.hash = currentAnchor.id;
                setScrollTop(currentScroll);
            });
            renderLoop.cleanup(function () { return _this.render_(); });
        });
    };
    return DeepLinkByScroll;
}());
export { DeepLinkByScroll };
//# sourceMappingURL=base.js.map