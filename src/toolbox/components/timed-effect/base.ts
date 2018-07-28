import {TEffectFunction} from "./types/timed-effect-function";
import {renderLoop} from "../../utils/render-loop";
type TEffectFunctions = Array<TEffectFunction>;

class TimedEffect {
  private startTime_: number;
  private endTime_: number;
  private target_: HTMLElement;
  private effectFunctions_: TEffectFunctions;
  private destroyed_: boolean;

  constructor(
    target: HTMLElement,
    duration: number,
    effectFunctions: TEffectFunctions
  ) {
    this.target_ = target;
    this.startTime_ = <number>new Date().valueOf();
    this.endTime_ = this.startTime_ + duration;
    this.effectFunctions_ = effectFunctions;
    this.destroyed_ = false;
    this.init_();
  }

  private init_() {
    this.render_();
  }

  private getTime_() {
    return <number>new Date().valueOf();
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }

    if (this.getTime_() > this.endTime_) {
      this.runEffectFunctions_(1);
      return
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());
      this.runEffectFunctions_(this.getPercent_());
    });
  }

  private getPercent_(): number {
    return (this.getTime_() - this.startTime_) /
      (this.endTime_ - this.startTime_);
  }

  private runEffectFunctions_(percent: number) {
    renderLoop.measure(() => {
      this.effectFunctions_
        .forEach((effectFunction) => effectFunction(this.target_, percent));
    });
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {TimedEffect};
