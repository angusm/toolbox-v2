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
exports.DragEnd = void 0;
var tb_event_1 = require("../../../utils/event/events/tb-event");
var DragEnd = (function (_super) {
    __extends(DragEnd, _super);
    function DragEnd(target, delta, endVelocity) {
        var _this = _super.call(this, target) || this;
        _this.delta_ = delta;
        _this.endVelocity_ = endVelocity;
        return _this;
    }
    DragEnd.prototype.getDelta = function () {
        return this.delta_;
    };
    DragEnd.prototype.getEndVelocity = function () {
        return this.endVelocity_;
    };
    return DragEnd;
}(tb_event_1.TbEvent));
exports.DragEnd = DragEnd;
//# sourceMappingURL=drag-end.js.map