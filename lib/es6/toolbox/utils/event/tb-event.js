var TbEvent = (function () {
    function TbEvent(target) {
        this.target_ = target;
    }
    TbEvent.prototype.getTarget = function () {
        return this.target_;
    };
    return TbEvent;
}());
export { TbEvent, };
//# sourceMappingURL=tb-event.js.map