"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var is_bottom_visible_1 = require("../../dom/position/is-bottom-visible");
var element_meets_condition_1 = require("./element-meets-condition");
var is_bottom_visible_2 = require("../events/is-bottom-visible");
var IsBottomVisibleTracker = (function (_super) {
    __extends(IsBottomVisibleTracker, _super);
    function IsBottomVisibleTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsBottomVisibleTracker.prototype.doesElementMeetCondition = function (element) {
        return is_bottom_visible_1.isBottomVisible(element);
    };
    IsBottomVisibleTracker.prototype.getEventClass = function () {
        return is_bottom_visible_2.IsBottomVisible;
    };
    return IsBottomVisibleTracker;
}(element_meets_condition_1.ElementMeetsConditionTracker));
var isBottomVisibleTracker = new IsBottomVisibleTracker();
exports.isBottomVisibleTracker = isBottomVisibleTracker;
//# sourceMappingURL=is-bottom-visible.js.map