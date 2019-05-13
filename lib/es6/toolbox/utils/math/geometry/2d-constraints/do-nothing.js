var DoNothingConstraint = (function () {
    function DoNothingConstraint() {
    }
    DoNothingConstraint.prototype.constrain = function (delta) {
        return delta;
    };
    return DoNothingConstraint;
}());
var DO_NOTHING_CONSTRAINT = new DoNothingConstraint();
export { DO_NOTHING_CONSTRAINT };
//# sourceMappingURL=do-nothing.js.map