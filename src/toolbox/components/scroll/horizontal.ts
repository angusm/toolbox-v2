import {Draggable} from '../draggable/base';
import {DraggableFixedYConstraint} from "../draggable/constraints/fixed-y";
import {ContainerConstraint} from "../draggable/constraints/container";

class HorizontalScroll {
  constructor(element: HTMLElement, container: HTMLElement) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new DraggableFixedYConstraint()]
      });
  }
}

export {HorizontalScroll};
