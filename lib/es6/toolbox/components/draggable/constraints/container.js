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
import { Dimensions as CachedDimensions } from "../../../utils/cached-vectors/dimensions";
import { Dimensions2d } from "../../../utils/math/geometry/dimensions-2d";
import { getAncestorDimensions } from 'src/toolbox/utils/dom/position/get-ancestor-dimensions';
import { getVisibleDistanceBetweenElements } from '../../../utils/dom/position/get-visible-distance-between-elements';
var ContainerConstraint = (function (_super) {
    __extends(ContainerConstraint, _super);
    function ContainerConstraint(container) {
        var _this = _super.call(this) || this;
        _this.constrainingDimensions_ = CachedDimensions.getForElement(container);
        _this.container_ = container;
        return _this;
    }
    ContainerConstraint.prototype.constrain = function (draggable, delta) {
        var _a;
        var draggableDimensions = getAncestorDimensions(draggable.getElement());
        var containerDimensions = this.constrainingDimensions_.getDimensions();
        var overlapDimensions = draggableDimensions.subtract(containerDimensions);
        var positiveDimensions = new Dimensions2d(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        var constrainedOverlap = overlapDimensions.clamp.apply(overlapDimensions, positiveDimensions.asRanges()).invert();
        var currentDistance = getVisibleDistanceBetweenElements(draggable.getElement(), this.container_);
        var clampedDistance = (_a = currentDistance.add(delta)).clamp.apply(_a, constrainedOverlap.asRanges());
        return clampedDistance.subtract(currentDistance);
    };
    ContainerConstraint.prototype.destroy = function () {
        this.constrainingDimensions_.destroy();
    };
    return ContainerConstraint;
}(DraggableConstraint));
export { ContainerConstraint };
//# sourceMappingURL=container.js.map