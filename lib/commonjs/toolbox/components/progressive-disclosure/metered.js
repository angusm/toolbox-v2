"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zip_1 = require("../../utils/array/zip");
var event_handler_1 = require("../../utils/event/event-handler");
var seen_for_x_ms_1 = require("../../utils/event/events/seen-for-x-ms");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
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
        var shiftedTargets = [null].concat(this.targets_);
        var targetsWithNext = zip_1.zip(shiftedTargets, this.targets_)
            .slice(0, this.targets_.length);
        targetsWithNext.forEach(function (_a) {
            var target = _a[0], next = _a[1];
            event_handler_1.eventHandler.addListener(target, _this.getSeenForXMsClass_(), function () { return add_class_if_missing_1.addClassIfMissing(next, _this.getActiveCSSClass_()); });
        });
    };
    MeteredProgressiveDisclosure.prototype.getActiveCSSClass_ = function () {
        return this.baseClass_ + "--" + this.modifier_;
    };
    MeteredProgressiveDisclosure.prototype.getSeenForXMsClass_ = function () {
        return seen_for_x_ms_1.SeenForXMs.getClassForXMs(this.threshold_);
    };
    return MeteredProgressiveDisclosure;
}());
exports.MeteredProgressiveDisclosure = MeteredProgressiveDisclosure;
//# sourceMappingURL=metered.js.map