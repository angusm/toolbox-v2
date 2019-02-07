import {Draggable} from '../draggable/base';
import {DraggableFixedXConstraint} from "../draggable/constraints/fixed-x";
import {ContainerConstraint} from "../draggable/constraints/container";

class HorizontalScroll {
  constructor(element: HTMLElement, container: HTMLElement) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new DraggableFixedXConstraint()]
      });
  }
}

export {HorizontalScroll};
