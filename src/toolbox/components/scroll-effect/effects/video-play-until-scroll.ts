import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";

class VideoPlayUntilScroll implements IEffect {
  private targetPercentages_: Map<HTMLMediaElement, number>;
  private destroyed_: boolean;

  constructor() {
    this.targetPercentages_ =
      DynamicDefaultMap.usingFunction<HTMLMediaElement, number>(() => 0);
    this.destroyed_ = false;
    this.render_();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    this.targetPercentages_.set(<HTMLMediaElement>target, distanceAsPercent);
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }
    renderLoop.mutate(() => {
      renderLoop.cleanup(() => this.render_());
      Array.from(this.targetPercentages_.entries())
        .forEach(
          ([video, percentage]) => {
            const targetTime =
              Math.round(video.duration * percentage * 100) / 100;
            if (
              isNaN(targetTime) || isNaN(video.currentTime) ||
              video.currentTime >= targetTime
            ) {
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