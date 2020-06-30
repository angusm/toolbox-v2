"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollEater = void 0;
var base_1 = require("./base");
var ScrollEater = (function () {
    function ScrollEater(_a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).shouldEat, shouldEat = _b === void 0 ? function (e, scrollAmount) { return true; } : _b;
        this.shouldEat_ = shouldEat;
        new base_1.EventEater('mousewheel', { shouldEat: function (e) { return _this.shouldEatMouseWheel_(e); } });
        new base_1.EventEater('wheel', { shouldEat: function (e) { return _this.shouldEatMouseWheel_(e); } });
        window.addEventListener('touchstart', function (e) {
            _this.lastTouchY_ = e.changedTouches[0].clientY;
        });
        new base_1.EventEater('touchmove', { shouldEat: function (e) { return _this.shouldEatTouchMove_(e); } }, { passive: false });
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
exports.ScrollEater = ScrollEater;
//# sourceMappingURL=scroll.js.map