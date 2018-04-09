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
import { isVisibleTracker } from "../watchers/is-visible";
var IsVisible = (function (_super) {
    __extends(IsVisible, _super);
    function IsVisible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsVisible.createWatcher = function (target) {
        var trackerUid = isVisibleTracker.track(target);
        return function () { isVisibleTracker.untrack(trackerUid); };
    };
    return IsVisible;
}(TbEvent));
export { IsVisible };
//# sourceMappingURL=is-visible.js.map