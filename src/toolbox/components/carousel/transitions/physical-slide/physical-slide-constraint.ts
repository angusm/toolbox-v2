import {Vector2d} from '../../../../utils/math/geometry/vector-2d';
import {ICarousel} from '../../interfaces';
import {sumOffsetWidthsFromArray} from '../../../../utils/dom/position/sum-offset-widths-from-array';
import {DraggableConstraint} from '../../../draggable/constraints/base';
import {IDraggable} from '../../../draggable/interfaces';
import {NumericRange} from '../../../../utils/math/numeric-range';

class PhysicalSlideConstraint extends DraggableConstraint {
  private readonly container_: HTMLElement;
  private readonly slides_: HTMLElement[];

  constructor(carousel: ICarousel) {
    super();
    this.container_ = carousel.getContainer();
    this.slides_ = carousel.getSlides();
  }

  constrain(draggable: IDraggable, delta: Vector2d): Vector2d {
    const min =
      this.container_.offsetWidth - sumOffsetWidthsFromArray(this.slides_);
    const currentX = Vector2d.fromElementTransform(draggable.getElement()).x;
    const finalX = currentX + delta.getX();
    const clampedFinalX = new NumericRange(min, 0).clamp(finalX);
    const deltaX = clampedFinalX - currentX;

    return new Vector2d(deltaX, delta.getY());
  }
}
export {PhysicalSlideConstraint};
