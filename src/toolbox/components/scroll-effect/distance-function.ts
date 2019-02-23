import {getVisibleDistanceBetweenElementBottoms} from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import {getVisibleDistanceBetweenElementCenters} from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import {getVisibleDistanceBetweenElements} from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import {Scroll} from "../../utils/cached-vectors/scroll";
import {negateNumericFunction} from "../../utils/functions/negate-numeric-function";

const scroll = Scroll.getSingleton();

/**
 * Collection of static functions that can be used to determine scrolled
 * distances for Scroll Effects
 */
class DistanceFunction {
  public static DISTANCE_FROM_DOCUMENT_TOP = negateNumericFunction(getVisibleDistanceBetweenElements);
  public static DISTANCE_FROM_DOCUMENT_CENTER = negateNumericFunction(getVisibleDistanceBetweenElementCenters);
  public static DISTANCE_FROM_DOCUMENT_BOTTOM = negateNumericFunction(getVisibleDistanceBetweenElementBottoms);
  public static DOCUMENT_SCROLL = (unused_a: HTMLElement) => scroll.getPosition().y;
}

export {DistanceFunction}
