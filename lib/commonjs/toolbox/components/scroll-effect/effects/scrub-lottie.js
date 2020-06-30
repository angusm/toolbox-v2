"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrubLottie = void 0;
var numeric_range_1 = require("../../../utils/math/numeric-range");
var ScrubLottie = (function () {
    function ScrubLottie(animationItem) {
        this.animationItem_ = animationItem;
        this.animationItem_.stop();
    }
    ScrubLottie.prototype.run = function (target, distance, distanceAsPercent) {
        var duration = new numeric_range_1.NumericRange(0, this.animationItem_.getDuration() * 1000);
        var targetTime = duration.getPercentAsValue(distanceAsPercent);
        this.animationItem_.goToAndStop(targetTime);
    };
    ScrubLottie.prototype.destroy = function () { };
    return ScrubLottie;
}());
exports.ScrubLottie = ScrubLottie;
//# sourceMappingURL=scrub-lottie.js.map