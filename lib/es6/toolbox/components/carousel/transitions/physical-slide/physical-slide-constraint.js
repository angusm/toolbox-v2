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
import { Vector2d } from '../../../../utils/math/geometry/vector-2d';
import { sumOffsetWidthsFromArray } from '../../../../utils/dom/position/sum-offset-widths-from-array';
import { DraggableConstraint } from '../../../draggable/constraints/base';
import { NumericRange } from '../../../../utils/math/numeric-range';
var PhysicalSlideConstraint = (function (_super) {
    __extends(PhysicalSlideConstraint, _super);
    function PhysicalSlideConstraint(carousel) {
        var _this = _super.call(this) || this;
        _this.container_ = carousel.getContainer();
        _this.slides_ = carousel.getSlides();
        return _this;
    }
    PhysicalSlideConstraint.prototype.constrain = function (draggable, delta) {
        var min = this.container_.offsetWidth - sumOffsetWidthsFromArray(this.slides_);
        var currentX = Vector2d.fromElementTransform(draggable.getElement()).x;
        var finalX = currentX + delta.getX();
        var clampedFinalX = new NumericRange(min, 0).clamp(finalX);
        var deltaX = clampedFinalX - currentX;
        return new Vector2d(deltaX, delta.getY());
    };
    return PhysicalSlideConstraint;
}(DraggableConstraint));
export { PhysicalSlideConstraint };
//# sourceMappingURL=physical-slide-constraint.js.map