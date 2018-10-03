import { EventEater } from './base';
var ScrollEater = (function () {
    function ScrollEater(_a) {
        var _b = (_a === void 0 ? {} : _a).shouldEat, shouldEat = _b === void 0 ? function (e, scrollAmount) { return true; } : _b;
        var _this = this;
        this.shouldEat_ = shouldEat;
        new EventEater('mousewheel', { shouldEat: function (e) { return _this.shouldEatMouseWheel_(e); } });
        window.addEventListener('touchstart', function (e) {
            _this.lastTouchY_ = e.changedTouches[0].clientY;
        });
        new EventEater('touchmove', { shouldEat: function (e) { return _this.shouldEatTouchMove_(e); } }, { passive: false });
    }
    ScrollEater.prototype.shouldEatMouseWheel_ = function (e) {
        return this.shouldEat_(e, e.deltaY);
    };
    ScrollEater.prototype.shouldEatTouchMove_ = function (e) {
        var touchY = e.changedTouches[0].clientY;
        var deltaY = this.lastTouchY_ - touchY;
        this.lastTouchY_ = touchY;
        return this.shouldEat_(e, deltaY);
    };
    return ScrollEater;
}());
export { ScrollEater };
//# sourceMappingURL=scroll.js.map