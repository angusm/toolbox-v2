"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbEvent = void 0;
var noop_1 = require("../../noop");
var TbEvent = (function () {
    function TbEvent(target) {
        this.target_ = target;
    }
    TbEvent.prototype.getTarget = function () {
        return this.target_;
    };
    TbEvent.createWatcher = function (target) {
        return noop_1.noop;
    };
    return TbEvent;
}());
exports.TbEvent = TbEvent;
//# sourceMappingURL=tb-event.js.map