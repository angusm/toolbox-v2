class RenderFunctionID {
  private readonly step_: symbol;

  constructor(step: symbol) {
    this.step_ = step;
  }

  get step() {
    return this.step_;
  }
}

export {RenderFunctionID};
