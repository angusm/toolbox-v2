"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tb_event_1 = require("./tb-event");
var is_visible_1 = require("../watchers/is-visible");
var IsVisible = (function (_super) {
    __extends(IsVisible, _super);
    function IsVisible() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsVisible.createWatcher = function (target) {
        var trackerUid = is_visible_1.isVisibleTracker.track(target);
        return function () { is_visible_1.isVisibleTracker.untrack(trackerUid); };
    };
    return IsVisible;
}(tb_event_1.TbEvent));
exports.IsVisible = IsVisible;
//# sourceMappingURL=is-visible.js.map