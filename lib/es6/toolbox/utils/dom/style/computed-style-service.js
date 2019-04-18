import { DynamicDefaultMap } from "../../map/dynamic-default";
import { renderLoop } from "../../render-loop";
var ComputedStyleService = (function () {
    function ComputedStyleService() {
        this.computedStyle_ =
            DynamicDefaultMap.usingFunction(function (element) { return window.getComputedStyle(element); });
        this.init_();
    }
    ComputedStyleService.prototype.init_ = function () {
        this.renderLoop_();
    };
    ComputedStyleService.prototype.getComputedStyle = function (element) {
        return this.computedStyle_.get(element);
    };
    ComputedStyleService.prototype.renderLoop_ = function () {
        var _this = this;
        renderLoop.anyMutate(function () {
            renderLoop.anyCleanup(function () {
                _this.computedStyle_.clear();
                _this.renderLoop_();
            });
        });
    };
    ComputedStyleService.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    ComputedStyleService.singleton_ = null;
    return ComputedStyleService;
}());
export { ComputedStyleService };
//# sourceMappingURL=computed-style-service.js.map