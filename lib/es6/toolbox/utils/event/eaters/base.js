var EventEater = (function () {
    function EventEater(event, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.targetParam, targetParam = _c === void 0 ? null : _c, _d = _b.shouldEat, shouldEat = _d === void 0 ? function (e) { return true; } : _d;
        this.target_ = targetParam !== null ? targetParam : window;
        this.fn_ = function (e) {
            if (shouldEat(e)) {
                e.preventDefault();
            }
        };
        this.target_.addEventListener(event, this.fn_);
    }
    EventEater.prototype.destroy = function () {
        this.target_.removeEventListener(event, this.fn_);
    };
    return EventEater;
}());
export { EventEater };
//# sourceMappingURL=base.js.map