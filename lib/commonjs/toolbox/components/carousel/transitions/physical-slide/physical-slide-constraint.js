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
exports.PhysicalSlideConstraint = void 0;
var vector_2d_1 = require("../../../../utils/math/geometry/vector-2d");
var sum_offset_widths_from_array_1 = require("../../../../utils/dom/position/sum-offset-widths-from-array");
var base_1 = require("../../../draggable/constraints/base");
var numeric_range_1 = require("../../../../utils/math/numeric-range");
var PhysicalSlideConstraint = (function (_super) {
    __extends(PhysicalSlideConstraint, _super);
    function PhysicalSlideConstraint(carousel) {
        var _this = _super.call(this) || this;
        _this.container_ = carousel.getContainer();
        _this.slides_ = carousel.getSlides();
        return _this;
    }
    PhysicalSlideConstraint.prototype.constrain = function (draggable, delta) {
        var min = this.container_.offsetWidth - sum_offset_widths_from_array_1.sumOffsetWidthsFromArray(this.slides_);
        var currentX = vector_2d_1.Vector2d.fromElementTransform(draggable.getElement()).x;
        var finalX = currentX + delta.getX();
        var clampedFinalX = new numeric_range_1.NumericRange(min, 0).clamp(finalX);
        var deltaX = clampedFinalX - currentX;
        return new vector_2d_1.Vector2d(deltaX, delta.getY());
    };
    return PhysicalSlideConstraint;
}(base_1.DraggableConstraint));
exports.PhysicalSlideConstraint = PhysicalSlideConstraint;
//# sourceMappingURL=physical-slide-constraint.js.map