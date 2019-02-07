var DraggableConstraint = (function () {
    function DraggableConstraint() {
    }
    DraggableConstraint.prototype.constrain = function (draggable, delta) {
        console.warn('constrain is not overridden from base case');
        return delta;
    };
    DraggableConstraint.applyConstraints = function (draggable, delta) {
        var constraints = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            constraints[_i - 2] = arguments[_i];
        }
        return constraints.reduce(function (result, constraint) { return constraint.constrain(draggable, result); }, delta);
    };
    return DraggableConstraint;
}());
export { DraggableConstraint };
//# sourceMappingURL=base.js.map