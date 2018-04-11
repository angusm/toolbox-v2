import { zip } from "../../utils/array/zip";
import { eventHandler } from "../../utils/event/event-handler";
import { SeenForXMs } from "../../utils/event/events/seen-for-x-ms";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
var DefaultClassOptions = Object.freeze({
    base: 'tb-metered-progressive-disclosure',
    modifier: 'active',
});
var MeteredProgressiveDisclosure = (function () {
    function MeteredProgressiveDisclosure(targets, threshold, _a) {
        var _b = _a.base, base = _b === void 0 ? DefaultClassOptions.base : _b, _c = _a.modifier, modifier = _c === void 0 ? DefaultClassOptions.modifier : _c;
        this.targets_ = targets;
        this.threshold_ = threshold;
        this.baseClass_ = base;
        this.modifier_ = modifier;
        this.init_();
    }
    MeteredProgressiveDisclosure.prototype.init_ = function () {
        var _this = this;
        this.targets_
            .forEach(function (target) { return addClassIfMissing(target, _this.baseClass_); });
        var shiftedTargets = [null].concat(this.targets_);
        var targetsWithNext = zip(shiftedTargets, this.targets_)
            .slice(1, this.targets_.length);
        targetsWithNext.forEach(function (_a) {
            var target = _a[0], next = _a[1];
            eventHandler.addListener(target, _this.getSeenForXMsClass_(), function () { return addClassIfMissing(next, _this.getActiveCSSClass_()); });
        });
    };
    MeteredProgressiveDisclosure.prototype.getActiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.modifier_;
    };
    MeteredProgressiveDisclosure.prototype.getSeenForXMsClass_ = function () {
        return SeenForXMs.getClassForXMs(this.threshold_);
    };
    return MeteredProgressiveDisclosure;
}());
export { MeteredProgressiveDisclosure };
//# sourceMappingURL=metered.js.map