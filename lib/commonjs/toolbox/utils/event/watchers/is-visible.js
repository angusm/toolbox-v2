"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var is_visible_1 = require("../../dom/position/is-visible");
var element_meets_condition_1 = require("./element-meets-condition");
var is_visible_2 = require("../events/is-visible");
var IsVisibleTracker = (function (_super) {
    __extends(IsVisibleTracker, _super);
    function IsVisibleTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsVisibleTracker.prototype.doesElementMeetCondition = function (element) {
        return is_visible_1.isVisible(element);
    };
    IsVisibleTracker.prototype.getEventClass = function () {
        return is_visible_2.IsVisible;
    };
    return IsVisibleTracker;
}(element_meets_condition_1.ElementMeetsConditionTracker));
var isVisibleTracker = new IsVisibleTracker();
exports.isVisibleTracker = isVisibleTracker;
//# sourceMappingURL=is-visible.js.map