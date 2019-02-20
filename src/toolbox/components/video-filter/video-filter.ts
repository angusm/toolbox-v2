import {Dimensions2d} from "../../utils/math/geometry/dimensions-2d";
import {IFilter} from "./video-filter-interface";

class VideoFilter {
  readonly backingCanvas_: HTMLCanvasElement;
  readonly filter_: IFilter;
  readonly primaryCanvas_: HTMLCanvasElement;
  readonly video_: HTMLVideoElement;
  private destroyed_: boolean = false;

  constructor(
    videoElement: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    filter: IFilter
  ) {
    this.backingCanvas_ = document.createElement('canvas');
    this.filter_ = filter;
    this.primaryCanvas_= canvas;
    this.video_ = videoElement;
    this.init_();
  }

  private init_() {
    this.render_();
  }

  private render_() {
    if (this.destroyed_) {
      return;
    }

    window.requestAnimationFrame(() => {
      const videoSize = Dimensions2d.fromVideo(this.video_);
      const primaryCanvasSize = Dimensions2d.fromCanvas(this.primaryCanvas_);
      const backingCanvasSize = Dimensions2d.fromCanvas(this.backingCanvas_);

      if (videoSize.getArea() === 0 || this.video_.paused) {
        this.render_();
        return; // Do nothing if there's no visible area in the video.
      }

      if (!videoSize.equals(primaryCanvasSize)) {
        this.primaryCanvas_.width = videoSize.width;
        this.primaryCanvas_.height = videoSize.height;
      }
      if (!videoSize.equals(backingCanvasSize)) {
        this.backingCanvas_.width = videoSize.width;
        this.backingCanvas_.height = videoSize.height;
      }

      const primaryContext = this.primaryCanvas_.getContext('2d');
      const backingContext = this.backingCanvas_.getContext('2d');

      backingContext
        .drawImage(this.video_, 0, 0, videoSize.width, videoSize.height);
      const videoImageData =
        backingContext.getImageData(0, 0, videoSize.width, videoSize.height);
      const filteredImageData = this.filter_.filter(videoImageData);
      primaryContext.putImageData(filteredImageData, 0, 0);

      this.render_();
    });
  }

  public destroy() {
    this.destroyed_ = true;
  }
}

export {VideoFilter};
