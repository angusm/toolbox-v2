import {ICarousel} from '../../interfaces';
import {DraggableFixedYConstraint} from '../../../draggable/constraints/fixed-y';
import {DynamicDefaultMap} from '../../../../utils/map/dynamic-default';
import {PhysicalSlideConstraint} from "./physical-slide-constraint";
import {Draggable} from "../../../draggable/draggable";

const DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();

class SlideToDraggableMap extends DynamicDefaultMap<HTMLElement, Draggable> {
  constructor(carousel: ICarousel) {
    const constraints =
      carousel.allowsLooping() ?
        [DEFAULT_CONSTRAINT] :
        [DEFAULT_CONSTRAINT, new PhysicalSlideConstraint(carousel)];
    const defaultFn =
      (slide: HTMLElement) => new Draggable(slide, {constraints: constraints});
    super([], Map, defaultFn);
  }
}

export {SlideToDraggableMap};
