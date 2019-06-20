import { NumericRange } from "../../../utils/math/numeric-range";
var ScrubLottie = (function () {
    function ScrubLottie(animationItem) {
        this.animationItem_ = animationItem;
        this.animationItem_.stop();
    }
    ScrubLottie.prototype.run = function (target, distance, distanceAsPercent) {
        var duration = new NumericRange(0, this.animationItem_.getDuration() * 1000);
        var targetTime = duration.getPercentAsValue(distanceAsPercent);
        this.animationItem_.goToAndStop(targetTime);
    };
    ScrubLottie.prototype.destroy = function () { };
    return ScrubLottie;
}());
export { ScrubLottie };
//# sourceMappingURL=scrub-lottie.js.map