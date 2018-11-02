import {Constraint} from './base';
import {Dimensions as CachedDimensions} from '../../../utils/cached-vectors/dimensions';
import {Dimensions2d} from '../../../utils/math/geometry/dimensions-2d';
import {VisibleDistance as CachedVisibleDistance} from '../../../utils/cached-vectors/visible-distance';
import {IDraggable} from "../interfaces";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";

class ContainerConstraint extends Constraint {
  private constrainingDimensions_: CachedDimensions;
  private container_: HTMLElement;

  constructor(container: HTMLElement) {
    super();
    this.constrainingDimensions_ = CachedDimensions.getForElement(container);
    this.container_ = container;
  }

  constrainDelta(draggable: IDraggable, delta: Vector2d) {
    const draggableDimensions: Dimensions2d =
      CachedDimensions.getForElement(draggable.getElement()).getDimensions();
    const containerDimensions: Dimensions2d =
      this.constrainingDimensions_.getDimensions();

    const overlapDimensions: Dimensions2d =
      draggableDimensions.subtract(containerDimensions);
    const positiveDimensions: Dimensions2d =
      new Dimensions2d(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    const constrainedOverlap: Dimensions2d =
      overlapDimensions.clamp(...positiveDimensions.asRanges()).invert();

    const currentDistance: Vector2d =
      CachedVisibleDistance
        .getForElement(draggable.getElement(), this.container_)
        .getDistance();

    const clampedDistance: Vector2d =
      currentDistance.add(delta).clamp(...constrainedOverlap.asRanges());

    return clampedDistance.subtract(currentDistance);
  }
}

export {ContainerConstraint};
