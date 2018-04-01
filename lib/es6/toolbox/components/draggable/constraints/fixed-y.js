var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Constraint } from './base';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
var FixedYConstraint = (function (_super) {
    __extends(FixedYConstraint, _super);
    function FixedYConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FixedYConstraint.prototype.constrainDelta = function (draggable, delta) {
        return new Vector2d(0, delta.y);
    };
    return FixedYConstraint;
}(Constraint));
export { FixedYConstraint };
//# sourceMappingURL=fixed-y.js.map