import {DraggableConstraint} from './base';
import {IDraggable} from "../interfaces";
import {Dimensions as CachedDimensions} from "../../../utils/cached-vectors/dimensions";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {Dimensions2d} from "../../../utils/math/geometry/dimensions-2d";
import { getAncestorDimensions } from 'src/toolbox/utils/dom/position/get-ancestor-dimensions';
import {getVisibleDistanceBetweenElements} from '../../../utils/dom/position/get-visible-distance-between-elements';

class ContainerConstraint extends DraggableConstraint {
  private constrainingDimensions_: CachedDimensions;
  private container_: HTMLElement;

  constructor(container: HTMLElement) {
    super();
    this.constrainingDimensions_ =
        CachedDimensions.getForElement(this, [container]);
    this.container_ = container;
  }

  constrain(draggable: IDraggable, delta: Vector2d) {
    const draggableDimensions: Dimensions2d =
      getAncestorDimensions(draggable.getElement());
    const containerDimensions: Dimensions2d =
      this.constrainingDimensions_.getDimensions();

    const overlapDimensions: Dimensions2d =
      draggableDimensions.subtract(containerDimensions);
    const positiveDimensions: Dimensions2d =
      new Dimensions2d(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    const constrainedOverlap: Dimensions2d =
      overlapDimensions.clamp(...positiveDimensions.asRanges()).invert();

    const currentDistance: Vector2d =
      getVisibleDistanceBetweenElements(
          draggable.getElement(), this.container_);

    const clampedDistance: Vector2d =
      currentDistance.add(delta).clamp(...constrainedOverlap.asRanges());

    return clampedDistance.subtract(currentDistance);
  }

  destroy() {
    this.constrainingDimensions_.destroy(this);
  }
}

export {ContainerConstraint};
