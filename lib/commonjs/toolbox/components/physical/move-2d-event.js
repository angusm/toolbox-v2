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
exports.Move2d = void 0;
var tb_event_1 = require("../../utils/event/events/tb-event");
var Move2d = (function (_super) {
    __extends(Move2d, _super);
    function Move2d(target, distanceMoved) {
        var _this = _super.call(this, target) || this;
        _this.distanceMoved_ = distanceMoved;
        return _this;
    }
    Move2d.prototype.getDistanceMoved = function () {
        return this.distanceMoved_;
    };
    return Move2d;
}(tb_event_1.TbEvent));
exports.Move2d = Move2d;
//# sourceMappingURL=move-2d-event.js.map