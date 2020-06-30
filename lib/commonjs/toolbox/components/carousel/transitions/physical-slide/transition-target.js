"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionTarget = void 0;
var TransitionTarget = (function () {
    function TransitionTarget(target, timeRange, translationRange) {
        this.translationRange_ = translationRange;
        this.target_ = target;
        this.timeRange_ = timeRange;
    }
    TransitionTarget.prototype.getTarget = function () {
        return this.target_;
    };
    TransitionTarget.prototype.getEndTime = function () {
        return this.timeRange_.getMax();
    };
    TransitionTarget.prototype.getTranslationRange = function () {
        return this.translationRange_;
    };
    TransitionTarget.prototype.getTimeRange = function () {
        return this.timeRange_;
    };
    TransitionTarget.prototype.getTargetTime = function () {
        console.warn('TransitionTarget.getTargetTime() is deprecated.');
        return this.getEndTime();
    };
    return TransitionTarget;
}());
exports.TransitionTarget = TransitionTarget;
//# sourceMappingURL=transition-target.js.map