import { noop } from "../../noop";
var TbEvent = (function () {
    function TbEvent(target) {
        this.target_ = target;
    }
    TbEvent.prototype.getTarget = function () {
        return this.target_;
    };
    TbEvent.createWatcher = function (target) {
        return noop;
    };
    return TbEvent;
}());
export { TbEvent, };
//# sourceMappingURL=tb-event.js.map