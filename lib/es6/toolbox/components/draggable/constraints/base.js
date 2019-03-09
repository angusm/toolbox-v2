var DraggableConstraint = (function () {
    function DraggableConstraint() {
    }
    DraggableConstraint.prototype.constrain = function (draggable, delta) {
        console.warn('constrain is not overridden from base case');
        return delta;
    };
    DraggableConstraint.applyConstraints = function (draggable, delta, constraints) {
        return constraints.reduce(function (result, constraint) { return constraint.constrain(draggable, result); }, delta);
    };
    return DraggableConstraint;
}());
export { DraggableConstraint };
//# sourceMappingURL=base.js.map