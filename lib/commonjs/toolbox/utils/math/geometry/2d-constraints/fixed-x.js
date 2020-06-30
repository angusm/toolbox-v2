"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedXConstraint = void 0;
var vector_2d_1 = require("../vector-2d");
var FixedXConstraint = (function () {
    function FixedXConstraint() {
    }
    FixedXConstraint.prototype.constrain = function (delta) {
        return new vector_2d_1.Vector2d(0, delta.y);
    };
    return FixedXConstraint;
}());
exports.FixedXConstraint = FixedXConstraint;
//# sourceMappingURL=fixed-x.js.map