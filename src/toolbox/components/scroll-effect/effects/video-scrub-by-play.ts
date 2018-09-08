import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {Scroll} from "../../../utils/cached-vectors/scroll";
import {setStyle} from "../../../utils/dom/style/set-style";

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
  private bufferedHandler_: () => void;

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

            let primaryVideo: HTMLMediaElement;
            let secondaryVideo: HTMLMediaElement;
            let targetTime;

            if (
              isNaN(forwardsVideo.duration) || isNaN(backwardsVideo.duration)
            ) {
              return;
            }

            const isScrollingDown = !this.scroll_.isScrollingUp();
            if (isScrollingDown) {
              targetTime =
                VideoScrubByPlay.getTargetTime_(
                  forwardsVideo,
                  percentage,
                  this.playStartOffset_,
                  this.playEndOffset_);
              primaryVideo = forwardsVideo;
              secondaryVideo = backwardsVideo;
            } else {
              targetTime =
                VideoScrubByPlay.getTargetTime_(
                  backwardsVideo,
                  (1 - percentage),
                  this.playEndOffset_,
                  this.playStartOffset_);
              primaryVideo = backwardsVideo;
              secondaryVideo = forwardsVideo;
            }

            if (isScrollingDown !== this.wasScrollingDown_) {
              // Remove previous listener to swap the opacities
              secondaryVideo
                .removeEventListener('canplay', this.bufferedHandler_);
              this.bufferedHandler_ = () => {
                renderLoop.mutate(() => {
                  setStyle(primaryVideo, 'opacity', '1');
                  setStyle(secondaryVideo, 'opacity', '0');
                  primaryVideo.play();
                });
                primaryVideo
                  .removeEventListener('canplay', this.bufferedHandler_);
                this.bufferedHandler_ = null;
              };
              primaryVideo.addEventListener('canplay', this.bufferedHandler_);
              primaryVideo.currentTime =
                primaryVideo.duration - secondaryVideo.currentTime;
            } else {
              secondaryVideo.currentTime =
                secondaryVideo.duration - primaryVideo.currentTime;
            }

            secondaryVideo.pause();

            if (
              isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
              primaryVideo.currentTime >= targetTime
            ) {
              primaryVideo.pause();
            } else if (this.bufferedHandler_ === null && primaryVideo.paused) {
              primaryVideo.play();
            }

            this.wasScrollingDown_ = isScrollingDown;
          });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoScrubByPlay}
