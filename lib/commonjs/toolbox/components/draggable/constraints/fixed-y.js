"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableFixedYConstraint = void 0;
var base_1 = require("./base");
var fixed_y_1 = require("../../../utils/math/geometry/2d-constraints/fixed-y");
var fixedYConstraint = new fixed_y_1.FixedYConstraint();
var DraggableFixedYConstraint = (function (_super) {
    __extends(DraggableFixedYConstraint, _super);
    function DraggableFixedYConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableFixedYConstraint.prototype.constrain = function (draggable, delta) {
        return fixedYConstraint.constrain(delta);
    };
    return DraggableFixedYConstraint;
}(base_1.DraggableConstraint));
exports.DraggableFixedYConstraint = DraggableFixedYConstraint;
//# sourceMappingURL=fixed-y.js.map