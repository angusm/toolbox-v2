"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_1 = require("../../../utils/array/min");
var BreakpointEffects = (function () {
    function BreakpointEffects(tweenConfig) {
        this.effectsByBreakpoint_ = new Map(tweenConfig);
    }
    BreakpointEffects.prototype.run = function (target, distance, distanceAsPercent) {
        var windowWidth = window.innerWidth;
        var breakpoints = Array.from(this.effectsByBreakpoint_.keys());
        var validBreakpoints = breakpoints.filter(function (bp) { return windowWidth < bp; });
        var smallestValidBreakpoint = min_1.min(validBreakpoints, function (v) { return v; });
        var effects = this.effectsByBreakpoint_.get(smallestValidBreakpoint);
        effects
            .forEach(function (effect) { return effect.run(target, distance, distanceAsPercent); });
    };
    BreakpointEffects.prototype.destroy = function () {
        this.effectsByBreakpoint_.clear();
    };
    return BreakpointEffects;
}());
exports.BreakpointEffects = BreakpointEffects;
//# sourceMappingURL=breakpoint-effects.js.map