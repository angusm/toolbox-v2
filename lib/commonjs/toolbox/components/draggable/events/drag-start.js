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
exports.DragStart = void 0;
var tb_event_1 = require("../../../utils/event/events/tb-event");
var DragStart = (function (_super) {
    __extends(DragStart, _super);
    function DragStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragStart;
}(tb_event_1.TbEvent));
exports.DragStart = DragStart;
//# sourceMappingURL=drag-start.js.map