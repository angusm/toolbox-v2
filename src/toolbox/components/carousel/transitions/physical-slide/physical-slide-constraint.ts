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
    // Allow for centering the last slide
    const halfContainerWidth = this.container_.offsetWidth / 2;
    const widthOfAllSlides = sumOffsetWidthsFromArray(this.slides_);
    const widthOfLastSlide = this.slides_.slice(-1)[0].offsetWidth;
    const halfWidthOfLastSlide = widthOfLastSlide / 2;
    const halfWidthOfFirstSlide = this.slides_[0].offsetWidth / 2;

    const min =
      halfContainerWidth - widthOfAllSlides + halfWidthOfLastSlide;
    const max = halfContainerWidth - halfWidthOfFirstSlide;
    const currentX = Vector2d.fromElementTransform(draggable.getElement()).x;
    const finalX = currentX + delta.getX();
    const clampedFinalX = new NumericRange(min, max).clamp(finalX);
    const deltaX = clampedFinalX - currentX;

    return new Vector2d(deltaX, delta.getY());
  }
}
export {PhysicalSlideConstraint};
