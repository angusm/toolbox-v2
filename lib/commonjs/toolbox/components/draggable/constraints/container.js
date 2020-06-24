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
var base_1 = require("./base");
var dimensions_1 = require("../../../utils/cached-vectors/dimensions");
var dimensions_2d_1 = require("../../../utils/math/geometry/dimensions-2d");
var get_ancestor_dimensions_1 = require("src/toolbox/utils/dom/position/get-ancestor-dimensions");
var get_visible_distance_between_elements_1 = require("../../../utils/dom/position/get-visible-distance-between-elements");
var ContainerConstraint = (function (_super) {
    __extends(ContainerConstraint, _super);
    function ContainerConstraint(container) {
        var _this = _super.call(this) || this;
        _this.constrainingDimensions_ = dimensions_1.Dimensions.getForElement(container);
        _this.container_ = container;
        return _this;
    }
    ContainerConstraint.prototype.constrain = function (draggable, delta) {
        var _a;
        var draggableDimensions = get_ancestor_dimensions_1.getAncestorDimensions(draggable.getElement());
        var containerDimensions = this.constrainingDimensions_.getDimensions();
        var overlapDimensions = draggableDimensions.subtract(containerDimensions);
        var positiveDimensions = new dimensions_2d_1.Dimensions2d(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        var constrainedOverlap = overlapDimensions.clamp.apply(overlapDimensions, positiveDimensions.asRanges()).invert();
        var currentDistance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(draggable.getElement(), this.container_);
        var clampedDistance = (_a = currentDistance.add(delta)).clamp.apply(_a, constrainedOverlap.asRanges());
        return clampedDistance.subtract(currentDistance);
    };
    ContainerConstraint.prototype.destroy = function () {
        this.constrainingDimensions_.destroy();
    };
    return ContainerConstraint;
}(base_1.DraggableConstraint));
exports.ContainerConstraint = ContainerConstraint;
//# sourceMappingURL=container.js.map