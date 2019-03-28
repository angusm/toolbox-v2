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
import { Sticky2ContainerPosition } from "./sticky-2-container-position";
var Sticky2Positioned = (function (_super) {
    __extends(Sticky2Positioned, _super);
    function Sticky2Positioned(target, position) {
        var _this = _super.call(this, target) || this;
        _this.position_ = Sticky2ContainerPosition;
        return _this;
    }
    Sticky2Positioned.prototype.getPosition = function () {
        return this.position_;
    };
    return Sticky2Positioned;
}(TbEvent));
export { Sticky2Positioned };
//# sourceMappingURL=sticky-2-positioned.js.map