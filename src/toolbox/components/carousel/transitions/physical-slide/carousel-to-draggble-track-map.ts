
import {ICarousel} from '../../interfaces';
import {DraggableFixedYConstraint} from '../../../draggable/constraints/fixed-y';
import {DynamicDefaultMap} from '../../../../utils/map/dynamic-default';
import {PhysicalSlideConstraint} from "./physical-slide-constraint";
import {Draggable} from "../../../draggable/draggable";

const DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();

class CarouselToDraggableTrackMap extends DynamicDefaultMap<ICarousel, Draggable> {
  constructor() {
    const defaultFn =
      (carousel: ICarousel) => {
        const constraints =
          carousel.allowsLooping() ?
            [DEFAULT_CONSTRAINT] :
            [DEFAULT_CONSTRAINT, new PhysicalSlideConstraint(carousel)];
        return new Draggable(carousel.getTrack(), {constraints: constraints});
      };
    super([], Map, defaultFn);
  }
}

export {CarouselToDraggableTrackMap};
