const TbEvent = require('../../../utils/event/tb-event');

class Drag extends TbEvent {
  constructor(target, element, delta) {
    super(target);
    this.element_ = element;
    this.delta_ = delta;
  }

  getDelta() {
    return this.delta_;
  }

  getElement() {
    return this.element_;
  }
}

module.exports = Drag;
