import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {Scroll} from "../../../utils/cached-vectors/scroll";

type TGetVideoFunction = (target: HTMLElement) => HTMLMediaElement;

class VideoScrubByPlay implements IEffect {
  private targetPercentages_: Map<HTMLElement, number>;
  private wasScrollingDown_: boolean;
  private destroyed_: boolean;
  private scroll_: Scroll;
  private getForwardsVideo_: TGetVideoFunction;
  private getBackwardsVideo_: TGetVideoFunction;

  constructor(
    getForwardsVideoFunction: TGetVideoFunction,
    getBackwardsVideoFunction: TGetVideoFunction
  ) {
    this.getForwardsVideo_ = getForwardsVideoFunction;
    this.getBackwardsVideo_ = getBackwardsVideoFunction;
    this.targetPercentages_ =
      DynamicDefaultMap.usingFunction<HTMLElement, number>(() => 0);
    this.destroyed_ = false;
    this.scroll_ = Scroll.getSingleton();
    this.wasScrollingDown_ = true;
    this.render_();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    this.targetPercentages_.set(target, distanceAsPercent);
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }
    renderLoop.mutate(() => {
      renderLoop.cleanup(() => this.render_());
      Array.from(this.targetPercentages_.entries())
        .forEach(
          ([target, percentage]) => {
            const forwardsVideo = this.getForwardsVideo_(target);
            const backwardsVideo = this.getBackwardsVideo_(target);

            let primaryVideo;
            let secondaryVideo;
            let targetTime;
            if (!this.scroll_.isScrollingUp()) {
              if (!this.wasScrollingDown_) {
                forwardsVideo.currentTime =
                  forwardsVideo.duration - backwardsVideo.currentTime;
              }
              targetTime =
                Math.round(forwardsVideo.duration * percentage * 100) / 100;
              primaryVideo = forwardsVideo;
              secondaryVideo = backwardsVideo;
            } else {
              if (this.wasScrollingDown_) {
                backwardsVideo.currentTime =
                  backwardsVideo.duration - forwardsVideo.currentTime;
              }
              targetTime =
                Math.round(
                  backwardsVideo.duration * (1 - percentage) * 100) / 100;
              primaryVideo = backwardsVideo;
              secondaryVideo = forwardsVideo;
            }

            if (
              isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
              primaryVideo.currentTime >= targetTime
            ) {
              primaryVideo.pause();
            } else {
              primaryVideo.play();
            }

            secondaryVideo.currentTime =
              secondaryVideo.duration - primaryVideo.currentTime;
          });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoScrubByPlay}
