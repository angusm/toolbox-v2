import {renderLoop} from "../../utils/render-loop";

class RunOnCondition {
  private actionFn_: () => void;
  private conditionFn_: () => boolean;
  private alternateFn_: () => void;

  constructor(
    actionFn: () => void,
    conditionFn: () => boolean,
    alternateFn: () => void = null
  ) {
    this.actionFn_ = actionFn;
    this.conditionFn_ = conditionFn;
    this.alternateFn_ = alternateFn;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      if (this.conditionFn_()) {
        this.actionFn_();
      } else if (this.alternateFn_) {
        this.alternateFn_();
      }

    });
  }
}

export {RunOnCondition};
