import {IEffect} from "./i-effect";
import {Scroll} from "../../../utils/cached-vectors/scroll";
import {setStyle} from "../../../utils/dom/style/set-style";
import {renderLoop} from "../../../utils/render-loop";

/**
 * Removes the transform on an element after a minimum scroll.
 *
 * This can be used to only display a header when the document is scrolled down.
 * For such a setup place a header with a transform that slides it up and out of
 * view. Then when scrolling down and the transform is removed the header will
 * be displayed.
 */
class RemoveTransformOnScrollDown implements IEffect {
  private readonly minimumScrollDistance_: number;

  /**
   * @param minimumScrollDistance Amount to scroll before running effect.
   */
  constructor(minimumScrollDistance: number = 0) {
    this.minimumScrollDistance_ = minimumScrollDistance;
  }

  /**
   * Applies the effect.
   * @param target The HTMLElement to apply the effect to.
   * @param distance The amount of scrolling performed.
   * @param distanceAsPercent Scrolled amount as a percent of the valid range.
   */
  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    if (
      distance > this.minimumScrollDistance_ &&
      Scroll.getSingleton().isScrollingDown()
    ) {
      renderLoop.anyMutate(() => setStyle(target, 'transform', 'none'));
    } else {
      renderLoop.anyMutate(() => setStyle(target, 'transform', ''));
    }
  }

  destroy() {}
}

export {RemoveTransformOnScrollDown}
