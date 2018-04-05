"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var dimensions_1 = require("../../../utils/cached-vectors/dimensions");
var dimensions_2d_1 = require("../../../utils/math/geometry/dimensions-2d");
var visible_distance_1 = require("../../../utils/cached-vectors/visible-distance");
var ContainerConstraint = (function (_super) {
    __extends(ContainerConstraint, _super);
    function ContainerConstraint(container) {
        var _this = _super.call(this) || this;
        _this.constrainingDimensions_ = dimensions_1.Dimensions.getForElement(container);
        _this.container_ = container;
        return _this;
    }
    ContainerConstraint.prototype.constrainDelta = function (draggable, delta) {
        var draggableDimensions = dimensions_1.Dimensions.getForElement(draggable.getElement()).getDimensions();
        var containerDimensions = this.constrainingDimensions_.getDimensions();
        var overlapDimensions = draggableDimensions.subtract(containerDimensions);
        var positiveDimensions = new dimensions_2d_1.Dimensions2d(Number.MAX_VALUE, Number.MAX_VALUE);
        var constrainedOverlap = overlapDimensions.clamp.apply(overlapDimensions, positiveDimensions.asRanges()).invert();
        var currentDistance = visible_distance_1.VisibleDistance
            .getForElement(draggable.getElement(), this.container_)
            .getDistance();
        var clampedDistance = (_a = currentDistance.add(delta)).clamp.apply(_a, constrainedOverlap.asRanges());
        return clampedDistance.subtract(currentDistance);
        var _a;
    };
    return ContainerConstraint;
}(base_1.Constraint));
exports.ContainerConstraint = ContainerConstraint;
//# sourceMappingURL=container.js.map