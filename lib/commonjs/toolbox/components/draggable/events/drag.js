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
exports.Drag = void 0;
var tb_event_1 = require("../../../utils/event/events/tb-event");
var Drag = (function (_super) {
    __extends(Drag, _super);
    function Drag(target, element, delta) {
        var _this = _super.call(this, target) || this;
        _this.element_ = element;
        _this.delta_ = delta;
        return _this;
    }
    Drag.prototype.getDelta = function () {
        return this.delta_;
    };
    Drag.prototype.getElement = function () {
        return this.element_;
    };
    return Drag;
}(tb_event_1.TbEvent));
exports.Drag = Drag;
//# sourceMappingURL=drag.js.map