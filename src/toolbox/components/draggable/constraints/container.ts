const BaseConstraint = require('./base');
const CachedDimensions = require('../../../utils/cached-vectors/dimensions');
const Dimensions2d = require('../../../utils/math/geometry/dimensions-2d');
const CachedVisibleDistance = require('../../../utils/cached-vectors/visible-distance');

class ContainerConstraint extends BaseConstraint {
  constructor(container) {
    super();
    this.constrainingDimensions_ = CachedDimensions.getForElement(container);
    this.container_ = container;
  }

  constrainDelta(draggable, delta) {
    const draggableDimensions =
      CachedDimensions.getForElement(draggable.getElement()).getDimensions();
    const containerDimensions = this.constrainingDimensions_.getDimensions();

    const overlapDimensions = draggableDimensions.subtract(containerDimensions);
    const positiveDimensions =
      new Dimensions2d(Number.MAX_VALUE, Number.MAX_VALUE);
    const constrainedOverlap =
      overlapDimensions.clamp(...positiveDimensions.asRanges()).invert();

    const currentDistance =
      CachedVisibleDistance
        .getForElement(draggable.getElement(), this.container_).getDistance();

    const clampedDistance =
      currentDistance.add(delta).clamp(...constrainedOverlap.asRanges());

    return clampedDistance.subtract(currentDistance);
  }
}

module.exports = ContainerConstraint;
