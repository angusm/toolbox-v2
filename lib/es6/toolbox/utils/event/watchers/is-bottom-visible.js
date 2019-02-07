var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isBottomVisible } from "../../dom/position/is-bottom-visible";
import { ElementMeetsConditionTracker } from "./element-meets-condition";
import { IsBottomVisible } from "../events/is-bottom-visible";
var IsBottomVisibleTracker = (function (_super) {
    __extends(IsBottomVisibleTracker, _super);
    function IsBottomVisibleTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsBottomVisibleTracker.prototype.doesElementMeetCondition = function (element) {
        return isBottomVisible(element);
    };
    IsBottomVisibleTracker.prototype.getEventClass = function () {
        return IsBottomVisible;
    };
    return IsBottomVisibleTracker;
}(ElementMeetsConditionTracker));
var isBottomVisibleTracker = new IsBottomVisibleTracker();
export { isBottomVisibleTracker };
//# sourceMappingURL=is-bottom-visible.js.map