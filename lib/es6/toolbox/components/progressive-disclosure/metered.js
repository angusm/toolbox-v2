import { zip } from "../../utils/array/zip";
import { eventHandler } from "../../utils/event/event-handler";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { SeenBottomForDuration } from "../../utils/event/events/seen-bottom-for-duration";
import { removeClassIfPresent } from "../../utils/dom/class/remove-class-if-present";
var DefaultClassOptions = Object.freeze({
    base: 'tb-metered-progressive-disclosure',
    activeModifier: 'active',
    inactiveModifier: 'inactive',
});
var MeteredProgressiveDisclosure = (function () {
    function MeteredProgressiveDisclosure(targets, threshold, _a) {
        var _b = _a.base, base = _b === void 0 ? DefaultClassOptions.base : _b, _c = _a.activeModifier, activeModifier = _c === void 0 ? DefaultClassOptions.activeModifier : _c, _d = _a.inactiveModifier, inactiveModifier = _d === void 0 ? DefaultClassOptions.inactiveModifier : _d, _e = _a.transitionTime, transitionTime = _e === void 0 ? 0 : _e;
        this.targets_ = targets;
        this.threshold_ = threshold;
        this.baseClass_ = base;
        this.activeModifier_ = activeModifier;
        this.inactiveModifier_ = inactiveModifier;
        this.transitionTime_ = transitionTime;
        this.init_();
    }
    MeteredProgressiveDisclosure.prototype.init_ = function () {
        var _this = this;
        this.targets_
            .forEach(function (target, index) {
            addClassIfMissing(target, _this.baseClass_);
            if (index !== 0) {
                addClassIfMissing(target, _this.getInactiveCSSClass_());
                removeClassIfPresent(_this.targets_[0], _this.getActiveCSSClass_());
            }
        });
        addClassIfMissing(this.targets_[0], this.getActiveCSSClass_());
        removeClassIfPresent(this.targets_[0], this.getInactiveCSSClass_());
        var shiftedTargets = [null].concat(this.targets_);
        var targetsWithNext = zip(shiftedTargets, this.targets_)
            .slice(1, this.targets_.length);
        this.setupSequence_(targetsWithNext, 0);
    };
    MeteredProgressiveDisclosure.prototype.setupSequence_ = function (targetsWithNext, transitionTime) {
        var _this = this;
        if (targetsWithNext.length === 0) {
            return;
        }
        var _a = targetsWithNext[0], target = _a[0], next = _a[1];
        var remaining = targetsWithNext.slice(1);
        setTimeout(function () {
            var seenForDurationListener = eventHandler.addListener(target, _this.getSeenForDurationClass_(), function () {
                eventHandler.removeListener(seenForDurationListener);
                addClassIfMissing(next, _this.getActiveCSSClass_());
                removeClassIfPresent(next, _this.getInactiveCSSClass_());
                _this.setupSequence_(remaining, _this.transitionTime_);
            });
        }, transitionTime);
    };
    MeteredProgressiveDisclosure.prototype.getActiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.activeModifier_;
    };
    MeteredProgressiveDisclosure.prototype.getInactiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.inactiveModifier_;
    };
    MeteredProgressiveDisclosure.prototype.getSeenForDurationClass_ = function () {
        return SeenBottomForDuration.getClassforDuration(this.threshold_);
    };
    return MeteredProgressiveDisclosure;
}());
export { MeteredProgressiveDisclosure };
//# sourceMappingURL=metered.js.map