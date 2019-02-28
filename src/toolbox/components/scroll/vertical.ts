import {Draggable} from '../draggable/draggable';
import {DraggableFixedXConstraint} from "../draggable/constraints/fixed-x";
import {ContainerConstraint} from "../draggable/constraints/container";

class VerticalScroll {
  constructor(element: HTMLElement, container: HTMLElement) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new DraggableFixedXConstraint()]
      });
  }
}

export {VerticalScroll};
