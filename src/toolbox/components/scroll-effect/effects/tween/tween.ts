import {IEffect} from "../i-effect";
import {renderLoop} from "../../../../utils/render-loop";
import {setStyle} from "../../../../utils/dom/style/set-style";
import {Animation} from "./animation";
import {KeyframeStyle} from "./keyframe-style";
import {TKeyframesConfig} from "./t-keyframes-config";
import {ITweenOptions} from "./interfaces/tween-options";

/**
 * Default values provided to Tween for optional parameters.
 * @hidden
 */
const defaultOptions: ITweenOptions = {
  keyframeStyle: KeyframeStyle.PERCENT,
  styleTarget: null,
};

/**
 * Effect for ScrollEffect that tweens CSS properties as the user scrolls.
 *
 * The intent is to create an effect that can replicate a CSS animation that
 * plays according to the scroll position rather than according to time.
 */
class Tween implements IEffect {
  private readonly animation_: Animation;
  private readonly keyframeStyle_: KeyframeStyle;
  private readonly styleTarget_: HTMLElement;

  /**
   * Creates a new instance of the tween effect.
   *
   * @param keyframes The frames which should be tweened between.
   *
   * Values are provided as an array of tuples containing a number and string
   * defining CSS styles.
   *
   * Ex.
   *     [
   *       [0, "opacity: 0"],
   *       [.5, "opacity: 0.5; background: blue"],
   *       [1, "opacity: 1; background: red"],
   *     ]
   *
   *
   * @param keyframeStyle Defines how keyframe positions should be treated.
   *
   * Receives values from KeyFrameStyle, can be either PIXEL or PERCENT.
   *
   * If the value is PIXEL then keyframe positions are treated as referring to
   * absolute scroll values at which they should take place.
   *
   * If the value is PERCENT then keyframe positions are treated as referring to
   * the scroll distance at that percentage of the valid scroll range.
   *
   * Assuming a standard GetDistanceFn that returns pixels, and the ScrollEffect
   * set to apply to a range between 0 and 200. A keyframe at position 15 would
   * apply after scrolling 15 pixels using the PIXEL key frame style, and at
   * 30 pixels using the PERCENT key frame style.
   *
   * If no value is provided, this defaults to KeyframeStyle.PERCENT
   *
   *
   * @param styleTarget The HTML element to apply tween styles to.
   *
   * If no value is provided this defaults to the ScrollEffect target.
   */
  constructor(
    keyframes: TKeyframesConfig,
    {
      keyframeStyle = defaultOptions.keyframeStyle,
      styleTarget = defaultOptions.styleTarget,
    }: ITweenOptions = defaultOptions
  ) {
    this.animation_ = Animation.fromKeyframesConfig(keyframes);
    this.keyframeStyle_ = keyframeStyle;
    this.styleTarget_ = styleTarget;
  }

  private getDistance_(
    distanceAsPx: number,
    distanceAsPercent: number
  ): number {
    if (this.keyframeStyle_ === KeyframeStyle.PERCENT) {
      return distanceAsPercent;
    } else {
      return distanceAsPx;
    }
  }


  /**
   * Applies the tween effect to an element.
   *
   * @param target Element to apply tweened styles to if no style target is set.
   *
   * If a style target has been set that element will receive the style values
   * instead.
   *
   *
   * @param rawDistance Numeric distance scrolled, typically as pixels.
   *
   * @param distanceAsPercent Distance scrolled as percent of valid range.
   */
  public run(
    target: HTMLElement,
    rawDistance: number,
    distanceAsPercent: number
  ): void {
    const distance = this.getDistance_(rawDistance, distanceAsPercent);
    const propertyValueMap =
      this.animation_.getPropertyValueMapFromPosition(distance);
    const styleTarget = this.styleTarget_ === null ? target : this.styleTarget_;

    renderLoop.mutate(() => {
      Array.from(propertyValueMap.entries())
        .forEach(
          ([property, value]) => {
            setStyle(styleTarget, property, value.toStyleString())
          });
    });
  }

  /**
   * Destroy the effect.
   */
  public destroy(): void {}
}

export {Tween};
