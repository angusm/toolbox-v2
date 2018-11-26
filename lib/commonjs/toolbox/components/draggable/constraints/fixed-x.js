"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
var FixedXConstraint = (function (_super) {
    __extends(FixedXConstraint, _super);
    function FixedXConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FixedXConstraint.prototype.constrainDelta = function (draggable, delta) {
        return new vector_2d_1.Vector2d(delta.x, 0);
    };
    return FixedXConstraint;
}(base_1.Constraint));
exports.FixedXConstraint = FixedXConstraint;
//# sourceMappingURL=fixed-x.js.map