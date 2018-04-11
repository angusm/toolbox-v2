"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip_1 = require("../../utils/array/zip");
var event_handler_1 = require("../../utils/event/event-handler");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var seen_bottom_for_duration_1 = require("../../utils/event/events/seen-bottom-for-duration");
var remove_class_modifiers_1 = require("../../utils/dom/class/remove-class-modifiers");
var DefaultClassOptions = Object.freeze({
    base: 'tb-metered-progressive-disclosure',
    activeModifier: 'active',
    inactiveModifier: 'inactive',
});
var MeteredProgressiveDisclosure = (function () {
    function MeteredProgressiveDisclosure(targets, threshold, _a) {
        var _b = _a.base, base = _b === void 0 ? DefaultClassOptions.base : _b, _c = _a.activeModifier, activeModifier = _c === void 0 ? DefaultClassOptions.activeModifier : _c, _d = _a.inactiveModifier, inactiveModifier = _d === void 0 ? DefaultClassOptions.inactiveModifier : _d;
        this.targets_ = targets;
        this.threshold_ = threshold;
        this.baseClass_ = base;
        this.activeModifier_ = activeModifier;
        this.inactiveModifier_ = inactiveModifier;
        this.init_();
    }
    MeteredProgressiveDisclosure.prototype.init_ = function () {
        var _this = this;
        this.targets_
            .forEach(function (target, index) {
            add_class_if_missing_1.addClassIfMissing(target, _this.baseClass_);
            if (index !== 0) {
                add_class_if_missing_1.addClassIfMissing(target, _this.getInactiveCSSClass_());
                remove_class_modifiers_1.removeClassModifiers(target, _this.baseClass_, { whitelist: [_this.activeModifier_] });
            }
        });
        add_class_if_missing_1.addClassIfMissing(this.targets_[0]);
        var shiftedTargets = [null].concat(this.targets_);
        var targetsWithNext = zip_1.zip(shiftedTargets, this.targets_)
            .slice(1, this.targets_.length);
        targetsWithNext.forEach(function (_a) {
            var target = _a[0], next = _a[1];
            event_handler_1.eventHandler.addListener(target, _this.getSeenForDurationClass_(), function () {
                add_class_if_missing_1.addClassIfMissing(next, _this.getActiveCSSClass_());
                remove_class_modifiers_1.removeClassModifiers(next, _this.baseClass_, { whitelist: [_this.inactiveModifier_] });
            });
        });
    };
    MeteredProgressiveDisclosure.prototype.getActiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.activeModifier_;
    };
    MeteredProgressiveDisclosure.prototype.getInactiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.inactiveModifier_;
    };
    MeteredProgressiveDisclosure.prototype.getSeenForDurationClass_ = function () {
        return seen_bottom_for_duration_1.SeenBottomForDuration.getClassforDuration(this.threshold_);
    };
    return MeteredProgressiveDisclosure;
}());
exports.MeteredProgressiveDisclosure = MeteredProgressiveDisclosure;
//# sourceMappingURL=metered.js.map