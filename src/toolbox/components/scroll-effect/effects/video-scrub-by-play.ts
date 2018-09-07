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
  private playStartOffset_: number;
  private playEndOffset_: number;

  constructor(
    getForwardsVideoFunction: TGetVideoFunction,
    getBackwardsVideoFunction: TGetVideoFunction,
    {
      playStartOffset = 0,
      playEndOffset = 0,
    }: {
      playStartOffset?: number,
      playEndOffset?: number
    } = {}
  ) {
    this.getForwardsVideo_ = getForwardsVideoFunction;
    this.getBackwardsVideo_ = getBackwardsVideoFunction;
    this.targetPercentages_ =
      DynamicDefaultMap.usingFunction<HTMLElement, number>(() => 0);
    this.destroyed_ = false;
    this.scroll_ = Scroll.getSingleton();
    this.wasScrollingDown_ = true;
    this.playStartOffset_ = playStartOffset;
    this.playEndOffset_ = playEndOffset;
    this.render_();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    this.targetPercentages_.set(target, distanceAsPercent);
  }

  static getTargetTime_(
    video: HTMLMediaElement,
    percentage: number,
    startOffset: number,
    endOffset: number
  ): number {
    const viableDuration = video.duration - startOffset - endOffset;
    const rawTargetTime =
      startOffset +
      Math.round(viableDuration * percentage * 1000) / 1000;
    return Math.min(rawTargetTime, video.duration);
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
                VideoScrubByPlay.getTargetTime_(
                  forwardsVideo,
                  percentage,
                  this.playStartOffset_,
                  this.playEndOffset_);
              primaryVideo = forwardsVideo;
              secondaryVideo = backwardsVideo;
            } else {
              if (this.wasScrollingDown_) {
                backwardsVideo.currentTime =
                  backwardsVideo.duration - forwardsVideo.currentTime;
              }
              targetTime =
                VideoScrubByPlay.getTargetTime_(
                  backwardsVideo,
                  percentage,
                  this.playEndOffset_,
                  this.playStartOffset_);
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
            secondaryVideo.pause();
          });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoScrubByPlay}
