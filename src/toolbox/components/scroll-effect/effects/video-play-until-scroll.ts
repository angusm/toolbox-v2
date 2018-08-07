import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";

class VideoPlayUntilScroll implements IEffect {
  private targetTimes_: Map<HTMLMediaElement, number>;
  private destroyed_: boolean;

  constructor() {
    this.targetTimes_ = new Map<HTMLMediaElement, number>();
    this.destroyed_ = false;
    this.render_();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const video = <HTMLMediaElement>target;
    this.targetTimes_.set(
      video, Math.round(video.duration * distanceAsPercent * 100) / 100);
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }
    renderLoop.mutate(() => {
      renderLoop.cleanup(() => this.render_());
      Array.from(this.targetTimes_.entries())
        .forEach(([video, targetTime]) => {
          if (video.currentTime >= targetTime) {
            video.pause();
          } else {
            video.play();
          }
        });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoPlayUntilScroll}
