interface IVideoFilterOptions {

  /**
   * Factor to grow/shrink the video dimensions by before filtering
   * Scaling is useful to reduce the run-time of the filter by shrinking the
   * number of pixels to be processed. This does of course reduce the resolution
   * of the final output.
   */
  scale?: number;
}

export {IVideoFilterOptions};
