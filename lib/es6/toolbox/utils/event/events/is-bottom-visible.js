var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TbEvent } from "./tb-event";
import { isBottomVisibleTracker } from "../watchers/is-bottom-visible";
var IsBottomVisible = (function (_super) {
    __extends(IsBottomVisible, _super);
    function IsBottomVisible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsBottomVisible.createWatcher = function (target) {
        var trackerUid = isBottomVisibleTracker.track(target);
        return function () { isBottomVisibleTracker.untrack(trackerUid); };
    };
    return IsBottomVisible;
}(TbEvent));
export { IsBottomVisible };
//# sourceMappingURL=is-bottom-visible.js.map