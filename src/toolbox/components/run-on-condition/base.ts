import {renderLoop} from "../../utils/render-loop";

class RunOnCondtion {
  private actionFn_: () => void;
  private conditionFn_: () => boolean;

  constructor(
    actionFn: () => void,
    conditionFn: () => boolean
  ) {
    this.actionFn_ = actionFn;
    this.conditionFn_ = conditionFn;
    this.init_();
  }

  private init_(): void {
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      if (!this.conditionFn_()) {
        return;
      }

      renderLoop.mutate(() => this.actionFn_());
    });
  }
}

export {RunOnCondtion};
