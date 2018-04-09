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
import { isVisible } from "../../dom/position/is-visible";
import { ElementMeetsConditionTracker } from "./element-meets-condition";
import { IsVisible } from "../events/is-visible";
var IsVisibleTracker = (function (_super) {
    __extends(IsVisibleTracker, _super);
    function IsVisibleTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsVisibleTracker.prototype.doesElementMeetCondition = function (element) {
        return isVisible(element);
    };
    IsVisibleTracker.prototype.getEventClass = function () {
        return IsVisible;
    };
    return IsVisibleTracker;
}(ElementMeetsConditionTracker));
var isVisibleTracker = new IsVisibleTracker();
export { isVisibleTracker };
//# sourceMappingURL=is-visible.js.map