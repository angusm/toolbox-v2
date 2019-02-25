import {Matrix} from "../../../utils/dom/position/matrix";
import {renderLoop} from "../../../utils/render-loop";
import {Vector2d} from "../../../utils/math/geometry/vector-2d";
import {IEffect} from "./i-effect";

/**
 * Handles basic parallax by applying a portion of scroll as a translate.
 *
 * Parallax effect is applied to the target given to ScrollEffect.
 *
 * Works best with the distance function
 * DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER. In that case the translation
 * on the target element will be 0 when the element is centered.
 */
class Parallax implements IEffect {
  private readonly ratio_: number;

  /**
   * Initializes a new Parallax effect.
   *
   * As with most (if not all) classes that implement IEffect it must be passed
   * as a parameter to a ScrollEffect to have an effect on the DOM.
   *
   * @param ratio Amount of the scroll that should be applied as a translate.
   *
   * A value of 0 has no effect on the target element.
   */
  constructor(ratio: number) {
    this.ratio_ = ratio;
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const offset = distance * this.ratio_;
    const originalMatrix = Matrix.fromElementTransform(target);
    const translation =
      originalMatrix.set2dTranslation(new Vector2d(0, offset));

    renderLoop.scrollMutate(() => translation.applyToElementTransform(target));
  }

  /**
   * Destroys the effect.
   */
  destroy() {}
}

export {Parallax}
