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
export { Transition };
//# sourceMappingURL=base.js.map