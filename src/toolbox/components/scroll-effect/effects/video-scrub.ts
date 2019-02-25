import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./i-effect";
import {isVideoReady} from "../../../utils/dom/video/is-video-ready";

class VideoScrub implements IEffect {
  private updateOnScrollDownOnly_: boolean;
  private lastDistancePercent_: Map<HTMLElement, number>;
  private delayedUpdates_: Map<HTMLMediaElement, () => void>;

  constructor(updateOnScrollDownOnly: boolean) {
    this.updateOnScrollDownOnly_ = updateOnScrollDownOnly;
    this.lastDistancePercent_ = new Map<HTMLElement, number>();
    this.delayedUpdates_ = new Map<HTMLMediaElement, () => void>();
  }

  private shouldCullRun_(target: HTMLElement, distanceAsPercent: number) {
    return distanceAsPercent <= this.lastDistancePercent_.get(target) &&
      this.updateOnScrollDownOnly_;
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    if (this.shouldCullRun_(target, distanceAsPercent)) {
      return;
    }

    this.lastDistancePercent_.set(target, distanceAsPercent);

    // Assume a video element
    const video = <HTMLMediaElement>target;
    this.updateVideo_(video, distanceAsPercent);
  }

  private updateVideo_(video: HTMLMediaElement, distanceAsPercent: number) {
    this.clearDelayedUpdate_(video);
    if (isVideoReady(video)) {
      renderLoop
        .mutate(
          () => {
            video.pause();
            video.currentTime =
              Math.round(video.duration * distanceAsPercent * 100) / 100;
          }
        );
    } else {
      const delayedUpdateFn =
        () => this.updateVideo_(video, distanceAsPercent);
      this.delayedUpdates_.set(video, delayedUpdateFn);
      video.addEventListener('loadeddata', delayedUpdateFn);
    }
  }

  private clearDelayedUpdate_(video: HTMLMediaElement) {
    if (this.delayedUpdates_.has(video)) {
      video.removeEventListener('loadeddata', this.delayedUpdates_.get(video));
      this.delayedUpdates_.delete(video);
    }
  }

  destroy() {
    Array.from(this.delayedUpdates_.keys())
      .forEach((video) => this.clearDelayedUpdate_(video));
  }
}

export {VideoScrub}
