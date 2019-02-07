"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../vector-2d");
var FixedYConstraint = (function () {
    function FixedYConstraint() {
    }
    FixedYConstraint.prototype.constrain = function (delta) {
        return new vector_2d_1.Vector2d(delta.x, 0);
    };
    return FixedYConstraint;
}());
exports.FixedYConstraint = FixedYConstraint;
//# sourceMappingURL=fixed-y.js.map