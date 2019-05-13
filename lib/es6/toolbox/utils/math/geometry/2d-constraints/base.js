import { Vector2d } from "../vector-2d";
var Constraint2d = (function () {
    function Constraint2d(xRange, yRange) {
        this.xRange_ = xRange;
        this.yRange_ = yRange;
    }
    Constraint2d.prototype.constrain = function (delta) {
        return new Vector2d(this.xRange_.clamp(delta.x), this.yRange_.clamp(delta.y));
    };
    Constraint2d.applyConstraints = function (delta, constraints) {
        return constraints.reduce(function (result, constraint) { return constraint.constrain(result); }, delta);
    };
    return Constraint2d;
}());
export { Constraint2d };
//# sourceMappingURL=base.js.map