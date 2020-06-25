import {getVisibleDistanceBetweenElementBottoms} from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import {getVisibleDistanceBetweenElementCenters} from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import {negateNumericFunction} from "../../utils/functions/negate-numeric-function";
import {getVisibleDistanceFromRoot} from "../../utils/dom/position/vertical/get-visible-distance-from-root";
import {SCROLL_ELEMENT} from '../../utils/dom/position/scroll-element';

/**
 * Collection of static functions that can be used to determine scrolled
 * distances for Scroll Effects.
 */
class DistanceFunction {
  /**
   * Returns distance from top of viewport to the top of the target.
   *
   * When the top of the target is below the top of the viewport the distance is
   * returned as a negative value representing the distance in pixels. When the
   * top of the target is above the top of the viewport the distance is returned
   * as a positive value.
   */
  public static DISTANCE_FROM_DOCUMENT_TOP =
    negateNumericFunction(getVisibleDistanceFromRoot);

  /**
   * Returns distance from the center of viewport to the center of the target.
   *
   * Distances are returned as per DISTANCE_FROM_DOCUMENT_TOP.
   */
  public static DISTANCE_FROM_DOCUMENT_CENTER =
    negateNumericFunction(getVisibleDistanceBetweenElementCenters);

  /**
   * Returns distance from the bottom of viewport to the bottom of the target.
   *
   * Distances are returned as per DISTANCE_FROM_DOCUMENT_TOP.
   */
  public static DISTANCE_FROM_DOCUMENT_BOTTOM =
    negateNumericFunction(getVisibleDistanceBetweenElementBottoms);

  /**
   * Returns the distance that the document has been scrolled.
   *
   * Values will range from 0 to the maximum scroll of the document.
   *
   * Scroll values is retrieved from the Scroll cached vector which pulls values
   * once a frame during the renderLoop.premeasure step.
   */
  public static DOCUMENT_SCROLL =
      () => window.pageYOffset || SCROLL_ELEMENT.scrollTop;
}

export {DistanceFunction}
