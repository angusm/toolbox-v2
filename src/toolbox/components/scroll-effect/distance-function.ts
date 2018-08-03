import {getVisibleDistanceBetweenElementBottoms} from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import {getVisibleDistanceBetweenElementCenters} from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import {getVisibleDistanceBetweenElements} from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import {Scroll} from "../../utils/cached-vectors/scroll";

const scroll = Scroll.getSingleton();

class DistanceFunction {
  public static DISTANCE_FROM_DOCUMENT_TOP = getVisibleDistanceBetweenElements;
  public static DISTANCE_FROM_DOCUMENT_CENTER = getVisibleDistanceBetweenElementCenters;
  public static DISTANCE_FROM_DOCUMENT_BOTTOM = getVisibleDistanceBetweenElementBottoms;
  public static DOCUMENT_SCROLL = (unused_a: HTMLElement, unused_b:HTMLElement) => scroll.getPosition().y;
}

export {DistanceFunction}
