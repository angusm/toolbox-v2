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
import { TbEvent } from "../../utils/event/events/tb-event";
var Move = (function (_super) {
    __extends(Move, _super);
    function Move(target, element, vector) {
        var _this = _super.call(this, target) || this;
        _this.element_ = element;
        _this.vector_ = vector;
        return _this;
    }
    Move.prototype.getElement = function () {
        return this.element_;
    };
    Move.prototype.getVector = function () {
        return this.vector_;
    };
    return Move;
}(TbEvent));
export { Move };
//# sourceMappingURL=move-event.js.map