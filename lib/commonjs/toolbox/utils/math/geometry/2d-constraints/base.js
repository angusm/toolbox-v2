"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../vector-2d");
var Constraint2d = (function () {
    function Constraint2d(xRange, yRange) {
        this.xRange_ = xRange;
        this.yRange_ = yRange;
    }
    Constraint2d.prototype.constrain = function (delta) {
        return new vector_2d_1.Vector2d(this.xRange_.clamp(delta.x), this.yRange_.clamp(delta.y));
    };
    Constraint2d.applyConstraints = function (delta, constraints) {
        return constraints.reduce(function (result, constraint) { return constraint.constrain(result); }, delta);
    };
    return Constraint2d;
}());
exports.Constraint2d = Constraint2d;
//# sourceMappingURL=base.js.map