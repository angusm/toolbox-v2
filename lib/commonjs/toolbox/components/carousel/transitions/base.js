"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transition = (function () {
    function Transition() {
    }
    Transition.prototype.transition = function (targetSlide, carousel) {
        console.error('Child class should override');
    };
    Transition.prototype.init = function (initialSlide, carousel) {
        console.error('Child class should override, defaulting to transition');
        this.transition(initialSlide, carousel);
    };
    return Transition;
}());
exports.Transition = Transition;
//# sourceMappingURL=base.js.map