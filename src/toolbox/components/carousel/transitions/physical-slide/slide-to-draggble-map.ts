import {ICarousel} from '../../interfaces';
import {DraggableFixedYConstraint} from '../../../draggable/constraints/fixed-y';
import {DynamicDefaultMap} from '../../../../utils/map/dynamic-default';
import {PhysicalSlideConstraint} from "./physical-slide-constraint";
import {HorizontallyDraggable} from "../../../draggable/horizontally-draggable";
import {Draggable} from "../../../draggable/draggable";


const DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();

class SlideToDraggableMap extends DynamicDefaultMap<HTMLElement, Draggable> {
  constructor(carousel: ICarousel, lockScroll: boolean = false) {
    const constraints = [];
    if (!lockScroll) {
      constraints.push(DEFAULT_CONSTRAINT);
    }
    if (!carousel.allowsLooping()) {
      constraints.push(new PhysicalSlideConstraint(carousel));
    }

    const options = {constraints: constraints};
    const defaultFn =
      lockScroll ?
        (slide: HTMLElement) => new HorizontallyDraggable(slide, options) :
        (slide: HTMLElement) => new Draggable(slide, options);
    super([], Map, defaultFn);
  }
}

export {SlideToDraggableMap};
