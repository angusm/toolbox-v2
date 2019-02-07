import { UserAgent } from "../../utils/user-agent/user-agent";
import { renderLoop } from "../../utils/render-loop";
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
var CLASS_NAME = 'tb-browser-marker';
var BrowserMarker = (function () {
    function BrowserMarker() {
        this.init_();
    }
    BrowserMarker.prototype.init_ = function () {
        renderLoop.measure(function () {
            var html = document.querySelector('html');
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, [UserAgent.getBrowser().getAsCSSModifier()]); });
        });
    };
    return BrowserMarker;
}());
export { BrowserMarker };
//# sourceMappingURL=base.js.map