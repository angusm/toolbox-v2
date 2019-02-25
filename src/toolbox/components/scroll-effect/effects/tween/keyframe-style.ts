/**
 * The different ways that Keyframe positions can be interpreted.
 */
enum KeyframeStyle {
  /**
   * Treat keyframe positions as representing a scroll position in pixels.
   */
  PERCENT,

  /**
   * Treat keyframe positions as representing a percentage of a scroll range.
   */
  PIXEL,
}

export {KeyframeStyle}
