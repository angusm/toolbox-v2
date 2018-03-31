const Draggable = require('../draggable/base');
const FixedXConstraint = require('../draggable/constraints/fixed-x');
const ContainerConstraint = require('../draggable/constraints/container');

class HorizontalScroll {
  constructor(element, container) {
    new Draggable(
      element,
      {
        constraints: [
          new ContainerConstraint(container), new FixedXConstraint()]
      });
  }
}

module.exports = HorizontalScroll;
