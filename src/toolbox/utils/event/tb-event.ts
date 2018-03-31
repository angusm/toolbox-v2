class TbEvent {
  constructor(target) {
    this.target_ = target;
  }

  getTarget() {
    return this.target_;
  }
}

module.exports = TbEvent;
