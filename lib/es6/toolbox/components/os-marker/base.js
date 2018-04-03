import { UserAgent } from "../../utils/user-agent/user-agent";
import { renderLoop } from "../../utils/render-loop";
import { updateClassModifiers } from "../../utils/dom/class/update-class-modifiers";
var CLASS_NAME = 'os-marker';
var OSMarker = (function () {
    function OSMarker() {
        this.init_();
    }
    OSMarker.prototype.init_ = function () {
        renderLoop.measure(function () {
            var html = document.querySelector('html');
            renderLoop.mutate(function () { return updateClassModifiers(html, CLASS_NAME, [UserAgent.getOS().getAsCSSModifier()]); });
        });
    };
    return OSMarker;
}());
export { OSMarker };
//# sourceMappingURL=base.js.map