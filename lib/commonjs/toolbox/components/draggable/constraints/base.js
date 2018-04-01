"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constraint = (function () {
    function Constraint() {
    }
    Constraint.prototype.constrainDelta = function (draggable, delta) {
        console.warn('constrainDelta is not overridden from base case');
        return delta;
    };
    return Constraint;
}());
exports.Constraint = Constraint;
//# sourceMappingURL=base.js.map