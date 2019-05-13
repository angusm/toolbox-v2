"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DoNothingConstraint = (function () {
    function DoNothingConstraint() {
    }
    DoNothingConstraint.prototype.constrain = function (delta) {
        return delta;
    };
    return DoNothingConstraint;
}());
var DO_NOTHING_CONSTRAINT = new DoNothingConstraint();
exports.DO_NOTHING_CONSTRAINT = DO_NOTHING_CONSTRAINT;
//# sourceMappingURL=do-nothing.js.map