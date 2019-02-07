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
import { TbEvent } from '../../../utils/event/events/tb-event';
var DragEnd = (function (_super) {
    __extends(DragEnd, _super);
    function DragEnd(target, endVelocity) {
        var _this = _super.call(this, target) || this;
        _this.endVelocity_ = endVelocity;
        return _this;
    }
    DragEnd.prototype.getEndVelocity = function () {
        return this.endVelocity_;
    };
    return DragEnd;
}(TbEvent));
export { DragEnd };
//# sourceMappingURL=drag-end.js.map