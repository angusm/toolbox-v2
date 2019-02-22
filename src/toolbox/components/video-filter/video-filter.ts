import {Dimensions2d} from "../../utils/math/geometry/dimensions-2d";
import {IFilter} from "./video-filter-interface";
import {IVideoFilterOptions} from "./i-video-filter-options";

class VideoFilter {
  // Off-screen canvas to render video to so that its pixel data can be grabbed
  private readonly backingCanvas_: HTMLCanvasElement;

  // Filter instance that will perform actual changes to the pixel data
  private readonly filter_: IFilter;

  // Where the filtered pixels will be rendered
  private readonly primaryCanvas_: HTMLCanvasElement;

  // Video element to pull frames from
  private readonly video_: HTMLVideoElement;

  // Factor to grow/shrink the video dimensions by before filtering
  // Scaling is useful to reduce the run-time of the filter by shrinking the
  // number of pixels to be processed. This does of course reduce the resolution
  // of the final output.
  private readonly scale_: number;

  // True if we're done with this and it can be de-allocated
  private destroyed_: boolean = false;

  constructor(
    videoElement: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    filter: IFilter,
    {
      scale = 1,
    }: IVideoFilterOptions
  ) {
    this.backingCanvas_ = document.createElement('canvas');
    this.filter_ = filter;
    this.primaryCanvas_= canvas;
    this.video_ = videoElement;
    this.scale_ = scale;
    this.init_();
  }

  private init_() {
    this.render_();
  }

  /**
   * Render loop running until destroyed. Sets up the backing canvas and the
   * primary canvas dimensions. Draws the video frame to the backing canvas
   * and calls the filter with the resulting pixels before applying them to
   * the primary canvas.
   * @private
   */
  private render_() {
    if (this.destroyed_) {
      return;
    }

    // Does not use renderLoop as there is no changes made during the loop that
    // would trigger a re-flow.
    // WARNING: This stuff is hyper-intensive. Micro-optimizations should not be
    // removed. New micro-optimizations are encouraged.
    window.requestAnimationFrame(() => {
      const videoSize = Dimensions2d.fromVideo(this.video_).scale(this.scale_);
      const primaryCanvasSize = Dimensions2d.fromCanvas(this.primaryCanvas_);
      const backingCanvasSize = Dimensions2d.fromCanvas(this.backingCanvas_);

      if (!videoSize.getArea() || this.video_.paused) {
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
