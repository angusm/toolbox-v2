var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TbEvent } from "./tb-event";
import { deepLinkChangedTracker } from "../watchers/deep-link-changed";
var DeepLinkChanged = (function (_super) {
    __extends(DeepLinkChanged, _super);
    function DeepLinkChanged(target, deepLink) {
        var _this = _super.call(this, target) || this;
        _this.deepLink_ = deepLink;
        return _this;
    }
    DeepLinkChanged.createWatcher = function (target) {
        var uid = deepLinkChangedTracker.track(target);
        return function () { deepLinkChangedTracker.untrack(target, uid); };
    };
    return DeepLinkChanged;
}(TbEvent));
export { DeepLinkChanged };
//# sourceMappingURL=deep-link-changed.js.map