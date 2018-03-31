const Draggable = require('../draggable/base');
const FixedYConstraint = require('../draggable/constraints/fixed-y');
const ContainerConstraint = require('../draggable/constraints/container');

class HorizontalScroll {
  constructor(element, container) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new FixedYConstraint()]
      });
  }
}

module.exports = HorizontalScroll;
