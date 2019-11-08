import { onDomContentLoad } from "../../utils/dom/on-dom-content-load";
import { PoliteScrollJackCoordinator } from "./polite-scroll-jack-coordinator";
var PoliteScrollJack = (function () {
    function PoliteScrollJack(targets, _a) {
        var _b = (_a === void 0 ? {} : _a).scrollContainer, scrollContainer = _b === void 0 ? null : _b;
        this.coordinator_ =
            PoliteScrollJackCoordinator.getSingleton(scrollContainer);
        this.targets_ = targets;
    }
    PoliteScrollJack.fireAndForget = function (targets, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(targets, options);
        var _ignoredPromise = onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        this.coordinator_.registerElements(this.targets_);
    };
    PoliteScrollJack.prototype.destroy = function () {
        this.coordinator_.deregisterElements(this.targets_);
    };
    return PoliteScrollJack;
}());
export { PoliteScrollJack };
//# sourceMappingURL=polite-scroll-jack.js.map