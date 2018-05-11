import { zip } from "../../utils/array/zip";
import { eventHandler } from "../../utils/event/event-handler";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { removeClassIfPresent } from "../../utils/dom/class/remove-class-if-present";
import { IsBottomVisible } from "../../utils/event/events/is-bottom-visible";
import { noop } from "../../utils/noop";
import { renderLoop } from "../../utils/render-loop";
var DefaultClassOptions = Object.freeze({
    base: 'tb-metered-progressive-disclosure',
    activeModifier: 'active',
    inactiveModifier: 'inactive',
});
var MeteredProgressiveDisclosure = (function () {
    function MeteredProgressiveDisclosure(targets, threshold, _a) {
        var _b = _a.base, base = _b === void 0 ? DefaultClassOptions.base : _b, _c = _a.activeModifier, activeModifier = _c === void 0 ? DefaultClassOptions.activeModifier : _c, _d = _a.inactiveModifier, inactiveModifier = _d === void 0 ? DefaultClassOptions.inactiveModifier : _d, _e = _a.updateFunction, updateFunction = _e === void 0 ? noop : _e;
        this.threshold_ = threshold;
        this.baseClass_ = base;
        this.activeModifier_ = activeModifier;
        this.inactiveModifier_ = inactiveModifier;
        this.updateFunction_ = updateFunction;
        this.timeBottomSeenByElement_ = new Map();
        this.nextTargets_ = new Map();
        this.init_(targets);
    }
    MeteredProgressiveDisclosure.prototype.init_ = function (targets) {
        this.initTargetElements_(targets);
        this.initNextTargets_(targets);
        this.initSeenBottomListeners_();
        this.update_();
    };
    MeteredProgressiveDisclosure.prototype.initTargetElements_ = function (targets) {
        var _this = this;
        targets
            .forEach(function (target) { return addClassIfMissing(target, _this.baseClass_); });
        targets
            .slice(1)
            .forEach(function (target) {
            addClassIfMissing(target, _this.getInactiveCSSClass_());
            removeClassIfPresent(target, _this.getActiveCSSClass_());
        });
        removeClassIfPresent(targets[0], this.getInactiveCSSClass_());
        addClassIfMissing(targets[0], this.getActiveCSSClass_());
    };
    MeteredProgressiveDisclosure.prototype.initNextTargets_ = function (targets) {
        var _this = this;
        var shiftedTargets = [null].concat(targets);
        var targetsWithNext = zip(shiftedTargets, targets).slice(1, targets.length);
        targetsWithNext.forEach(function (_a) {
            var target = _a[0], next = _a[1];
            return _this.nextTargets_.set(target, next);
        });
    };
    MeteredProgressiveDisclosure.prototype.initSeenBottomListeners_ = function () {
        var _this = this;
        Array.from(this.nextTargets_.keys())
            .forEach(function (target) {
            var seenBottomListener = eventHandler.addListener(target, IsBottomVisible, function () {
                eventHandler.removeListener(seenBottomListener);
                _this.timeBottomSeenByElement_
                    .set(target, new Date().valueOf());
            });
        });
    };
    MeteredProgressiveDisclosure.prototype.isFullyDisclosed_ = function () {
        return this.getTargets_().length <= 0;
    };
    MeteredProgressiveDisclosure.prototype.getTargets_ = function () {
        return Array.from(this.nextTargets_.keys());
    };
    MeteredProgressiveDisclosure.prototype.update_ = function () {
        var _this = this;
        if (!this.isFullyDisclosed_()) {
            renderLoop.measure(function () { return renderLoop.cleanup(function () { return _this.update_(); }); });
        }
        this.getTargets_().forEach(function (target) { return _this.updateTarget_(target); });
    };
    MeteredProgressiveDisclosure.prototype.updateTarget_ = function (target) {
        if (!this.timeBottomSeenByElement_.has(target)) {
            return;
        }
        var next = this.nextTargets_.get(target);
        var currentTime = new Date().valueOf();
        var timeSeen = this.timeBottomSeenByElement_.get(target);
        if (currentTime > timeSeen + this.threshold_) {
            this.nextTargets_.delete(target);
            this.disclose_(next);
        }
        else {
            this.updateFunction_(target, next, timeSeen, currentTime);
        }
    };
    MeteredProgressiveDisclosure.prototype.disclose_ = function (elementToDisclose) {
        removeClassIfPresent(elementToDisclose, this.getInactiveCSSClass_());
        addClassIfMissing(elementToDisclose, this.getActiveCSSClass_());
    };
    MeteredProgressiveDisclosure.prototype.getActiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.activeModifier_;
    };
    MeteredProgressiveDisclosure.prototype.getInactiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.inactiveModifier_;
    };
    return MeteredProgressiveDisclosure;
}());
export { MeteredProgressiveDisclosure };
//# sourceMappingURL=metered.js.map