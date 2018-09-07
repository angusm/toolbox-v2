import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";

class VideoPlayUntilScroll implements IEffect {
  private targetPercentages_: Map<HTMLMediaElement, number>;
  private destroyed_: boolean;
  private playStartOffset_: number;
  private playEndOffset_: number;

  constructor({
    playStartOffset = 0,
    playEndOffset = 0,
  }: {
    playStartOffset?: number,
    playEndOffset?: number
  } = {}) {
    this.playStartOffset_ = playStartOffset;
    this.playEndOffset_ = playEndOffset;
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
            const viableDuration =
              video.duration - this.playEndOffset_ - this.playStartOffset_;
            const rawTargetTime =
              this.playStartOffset_ +
              Math.round(viableDuration * percentage * 1000) / 1000;
            const targetTime = Math.min(rawTargetTime, video.duration);
            if (isNaN(targetTime) || isNaN(video.currentTime)) {
              video.pause();
            } else if (video.currentTime >= targetTime) {
              video.pause();
              video.currentTime = video.duration;
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
