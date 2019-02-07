import { Vector2d } from '../vector-2d';
var FixedXConstraint = (function () {
    function FixedXConstraint() {
    }
    FixedXConstraint.prototype.constrain = function (delta) {
        return new Vector2d(0, delta.y);
    };
    return FixedXConstraint;
}());
export { FixedXConstraint };
//# sourceMappingURL=fixed-x.js.map