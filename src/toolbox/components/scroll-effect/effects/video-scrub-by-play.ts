import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {setStyle} from "../../../utils/dom/style/set-style";

type TGetVideoFunction = (target: HTMLElement) => HTMLMediaElement;
const FRAME_STEP: number = 0.1;

class VideoScrubByPlay implements IEffect {
  private targetPercentages_: Map<HTMLElement, number>;
  private wasPlayingForwards_: boolean;
  private destroyed_: boolean;
  private getForwardsVideo_: TGetVideoFunction;
  private getBackwardsVideo_: TGetVideoFunction;
  private playStartOffset_: number;
  private playEndOffset_: number;
  private bufferedHandler_: () => void;
  private bufferedHandlerTimeout_: number;

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
    this.wasPlayingForwards_ = true;
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
            const forwardsTargetTime =
              VideoScrubByPlay.getTargetTime_(
                forwardsVideo,
                percentage,
                this.playStartOffset_,
                this.playEndOffset_);
            const backwardsTargetTime =
              VideoScrubByPlay.getTargetTime_(
                backwardsVideo,
                (1 - percentage),
                this.playEndOffset_,
                this.playStartOffset_);

            const forwardsGap = forwardsTargetTime - forwardsVideo.currentTime;
            const backwardsGap =
              backwardsTargetTime - backwardsVideo.currentTime;

            let playForwards;
            if (Math.abs(forwardsGap - backwardsGap) > FRAME_STEP) {
              playForwards = forwardsGap > backwardsGap;
            } else {
              playForwards = this.wasPlayingForwards_;
            }

            if (playForwards) {
              targetTime = forwardsTargetTime;
              primaryVideo = forwardsVideo;
              secondaryVideo = backwardsVideo;
            } else {
              targetTime = backwardsTargetTime;
              primaryVideo = backwardsVideo;
              secondaryVideo = forwardsVideo;
            }

            if (playForwards !== this.wasPlayingForwards_) {
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
                clearTimeout(this.bufferedHandlerTimeout_);
                this.bufferedHandler_ = null;
              };
              primaryVideo.addEventListener('canplay', this.bufferedHandler_);
              this.bufferedHandlerTimeout_ =
                setTimeout(this.bufferedHandler_, 500); // Emergency catch-all
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

            this.wasPlayingForwards_ = playForwards;
          });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoScrubByPlay}
