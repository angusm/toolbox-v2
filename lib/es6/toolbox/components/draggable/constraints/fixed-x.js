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
import { DraggableConstraint } from './base';
import { FixedXConstraint } from "../../../utils/math/geometry/2d-constraints/fixed-x";
var fixedXConstraint = new FixedXConstraint();
var DraggableFixedXConstraint = (function (_super) {
    __extends(DraggableFixedXConstraint, _super);
    function DraggableFixedXConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableFixedXConstraint.prototype.constrain = function (draggable, delta) {
        return fixedXConstraint.constrain(delta);
    };
    return DraggableFixedXConstraint;
}(DraggableConstraint));
export { DraggableFixedXConstraint };
//# sourceMappingURL=fixed-x.js.map