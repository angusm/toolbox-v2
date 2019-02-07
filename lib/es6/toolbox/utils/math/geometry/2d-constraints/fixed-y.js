import { Vector2d } from '../vector-2d';
var FixedYConstraint = (function () {
    function FixedYConstraint() {
    }
    FixedYConstraint.prototype.constrain = function (delta) {
        return new Vector2d(delta.x, 0);
    };
    return FixedYConstraint;
}());
export { FixedYConstraint };
//# sourceMappingURL=fixed-y.js.map