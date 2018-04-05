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
import { Dimensions as CachedDimensions } from '../../../utils/cached-vectors/dimensions';
import { Dimensions2d } from '../../../utils/math/geometry/dimensions-2d';
import { VisibleDistance as CachedVisibleDistance } from '../../../utils/cached-vectors/visible-distance';
var ContainerConstraint = (function (_super) {
    __extends(ContainerConstraint, _super);
    function ContainerConstraint(container) {
        var _this = _super.call(this) || this;
        _this.constrainingDimensions_ = CachedDimensions.getForElement(container);
        _this.container_ = container;
        return _this;
    }
    ContainerConstraint.prototype.constrainDelta = function (draggable, delta) {
        var draggableDimensions = CachedDimensions.getForElement(draggable.getElement()).getDimensions();
        var containerDimensions = this.constrainingDimensions_.getDimensions();
        var overlapDimensions = draggableDimensions.subtract(containerDimensions);
        var positiveDimensions = new Dimensions2d(Number.MAX_VALUE, Number.MAX_VALUE);
        var constrainedOverlap = overlapDimensions.clamp.apply(overlapDimensions, positiveDimensions.asRanges()).invert();
        var currentDistance = CachedVisibleDistance
            .getForElement(draggable.getElement(), this.container_)
            .getDistance();
        var clampedDistance = (_a = currentDistance.add(delta)).clamp.apply(_a, constrainedOverlap.asRanges());
        return clampedDistance.subtract(currentDistance);
        var _a;
    };
    return ContainerConstraint;
}(Constraint));
export { ContainerConstraint };
//# sourceMappingURL=container.js.map