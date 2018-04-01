import {Draggable} from '../draggable/base';
import {FixedYConstraint} from '../draggable/constraints/fixed-y';
import {ContainerConstraint} from '../draggable/constraints/container';

class HorizontalScroll {
  constructor(element: HTMLElement, container: HTMLElement) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new FixedYConstraint()]
      });
  }
}

export {HorizontalScroll};
