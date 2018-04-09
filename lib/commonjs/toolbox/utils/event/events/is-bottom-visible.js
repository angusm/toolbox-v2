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
var tb_event_1 = require("./tb-event");
var is_bottom_visible_1 = require("../watchers/is-bottom-visible");
var IsBottomVisible = (function (_super) {
    __extends(IsBottomVisible, _super);
    function IsBottomVisible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsBottomVisible.createWatcher = function (target) {
        var trackerUid = is_bottom_visible_1.isBottomVisibleTracker.track(target);
        return function () { is_bottom_visible_1.isBottomVisibleTracker.untrack(trackerUid); };
    };
    return IsBottomVisible;
}(tb_event_1.TbEvent));
exports.IsBottomVisible = IsBottomVisible;
//# sourceMappingURL=is-bottom-visible.js.map