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
var deep_link_changed_1 = require("../watchers/deep-link-changed");
var DeepLinkChanged = (function (_super) {
    __extends(DeepLinkChanged, _super);
    function DeepLinkChanged(target, deepLink) {
        var _this = _super.call(this, target) || this;
        _this.deepLink_ = deepLink;
        return _this;
    }
    DeepLinkChanged.createWatcher = function (target) {
        var uid = deep_link_changed_1.deepLinkChangedTracker.track(target);
        return function () { deep_link_changed_1.deepLinkChangedTracker.untrack(target, uid); };
    };
    return DeepLinkChanged;
}(tb_event_1.TbEvent));
exports.DeepLinkChanged = DeepLinkChanged;
//# sourceMappingURL=deep-link-changed.js.map