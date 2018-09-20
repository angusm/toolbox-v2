import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {Range} from '../../../utils/math/range';
import {setStyle} from "../../../utils/dom/style/set-style";
import {Scroll} from "../../../utils/cached-vectors/scroll";

type TGetVideoFunction = (target: HTMLElement) => HTMLMediaElement;
const FRAME_STEP: number = 0.1;

class VideoScrubByPlay implements IEffect {
  private targetPercentages_: Map<HTMLElement, number>;
  private wasPlayingForwards_: boolean;
  private destroyed_: boolean;
  private getForwardsVideo_: TGetVideoFunction;
  private getBackwardsVideo_: TGetVideoFunction;
  private playableTime_: Range;
  private scroll_: Scroll;
  private activePercentages_: Range;

  constructor(
    getForwardsVideoFunction: TGetVideoFunction,
    getBackwardsVideoFunction: TGetVideoFunction,
    {
      playableTime = new Range(Number.MIN_VALUE, Number.MAX_VALUE),
      activePercentages = new Range(0, 1),
    }: {
      playableTime?: Range,
      activePercentages?: Range,
    } = {}
  ) {
    this.getForwardsVideo_ = getForwardsVideoFunction;
    this.getBackwardsVideo_ = getBackwardsVideoFunction;
    this.targetPercentages_ =
      DynamicDefaultMap.usingFunction<HTMLElement, number>(() => 0);
    this.destroyed_ = false;
    this.wasPlayingForwards_ = true;
    this.playableTime_ = playableTime;
    this.activePercentages_ = activePercentages;
    this.scroll_ = Scroll.getSingleton();

    this.render_();
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    this.targetPercentages_.set(target, distanceAsPercent);
  }

  static getTargetTime_(
    video: HTMLMediaElement, percentage: number, playableTime: Range): number {
    const actualRange = playableTime.getOverlap(new Range(0, video.duration));
    return actualRange.getPercentAsValue(percentage);
  }

  private getReversePlayableTime_(video: HTMLMediaElement): Range {
      return new Range(
        Math.max(0, video.duration - this.playableTime_.max),
        Math.min(video.duration, video.duration - this.playableTime_.min));
  }

  private getAdjustedPercentage_(rawPercentage: number): number {
    return this.activePercentages_.getValueAsPercent(rawPercentage);
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }
    renderLoop.mutate(() => {
      renderLoop.cleanup(() => this.render_());
      Array.from(this.targetPercentages_.entries())
        .forEach(
          ([target, rawPercentage]) => {
            const percentage = this.getAdjustedPercentage_(rawPercentage);
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
                forwardsVideo, percentage, this.playableTime_);
            const backwardsTargetTime =
              VideoScrubByPlay.getTargetTime_(
                backwardsVideo,
                (1 - percentage),
                this.getReversePlayableTime_(backwardsVideo));

            const backwardsGap = backwardsTargetTime - backwardsVideo.currentTime;

            let playForwards =
              !this.scroll_.isScrollingUp() && backwardsGap < -FRAME_STEP;

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
              primaryVideo.currentTime =
                primaryVideo.duration - secondaryVideo.currentTime;
            }

            if (!secondaryVideo.paused) {
              secondaryVideo.pause();
            }

            if (
              isNaN(targetTime) || isNaN(primaryVideo.currentTime) ||
              primaryVideo.currentTime >= targetTime
            ) {
              if (!primaryVideo.paused) {
                primaryVideo.pause();
              }
            } else if (primaryVideo.readyState >= 3) {
              setStyle(primaryVideo, 'opacity', '1');
              setStyle(secondaryVideo, 'opacity', '0');
              if (Math.abs(primaryVideo.currentTime - targetTime) < FRAME_STEP) {
                primaryVideo.currentTime = targetTime;
              } else {
                primaryVideo.play();
              }
            }

            secondaryVideo.currentTime =
              secondaryVideo.duration - primaryVideo.currentTime;

            this.wasPlayingForwards_ = playForwards;
          });
    });
  }

  destroy() {
    this.destroyed_ = true;
  }
}

export {VideoScrubByPlay}
