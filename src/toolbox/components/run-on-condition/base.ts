import {renderLoop} from "../../utils/render-loop";

class RunOnCondition {
  private actionFn_: () => void;
  private conditionFn_: () => boolean;
  private alternateFn_: () => void;
  private lastValue_: boolean;

  constructor(
    actionFn: () => void,
    conditionFn: () => boolean = () => true,
    alternateFn: () => void = null
  ) {
    this.actionFn_ = actionFn;
    this.conditionFn_ = conditionFn;
    this.alternateFn_ = alternateFn;
    this.init_();
  }

  protected shouldRun_(newValue: boolean): boolean {
    return this.lastValue_ !== newValue;
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const conditionResult = this.conditionFn_();
      if (this.shouldRun_(conditionResult)) {
        if (conditionResult) {
          this.actionFn_();
        } else if (this.alternateFn_) {
          this.alternateFn_();
        }
      }

      this.lastValue_ = conditionResult;
    });
  }
}

export {RunOnCondition};
