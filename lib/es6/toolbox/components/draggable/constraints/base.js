var Constraint = (function () {
    function Constraint() {
    }
    Constraint.prototype.constrainDelta = function (draggable, delta) {
        console.warn('constrainDelta is not overridden from base case');
        return delta;
    };
    return Constraint;
}());
export { Constraint };
//# sourceMappingURL=base.js.map