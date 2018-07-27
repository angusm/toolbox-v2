import {TEffectFunction} from "./types/timed-effect-function";
import {renderLoop} from "../../utils/render-loop";
type TEffectFunctions = Array<TEffectFunction>;

class TimedEffect {
  private startTime_: number;
  private endTime_: number;
  private target_: HTMLElement;
  private effectFunctions_: TEffectFunctions;

  constructor(
    target: HTMLElement,
    duration: number,
    effectFunctions: TEffectFunctions
  ) {
    this.target_ = target;
    this.startTime_ = <number>new Date().valueOf();
    this.endTime_ = this.startTime_ + duration;
    this.effectFunctions_ = effectFunctions;
    this.init_();
  }

  private init_() {
    this.render_();
  }

  private getTime_() {
    return <number>new Date().valueOf();
  }

  private render_() {
    if (this.getTime_() > this.endTime_) {
      this.runEffectFunctions_(1);
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
}

export {TimedEffect};
