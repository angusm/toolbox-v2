import { getVisibleDistanceBetweenElementBottoms } from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import { getVisibleDistanceBetweenElementCenters } from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import { getVisibleDistanceBetweenElements } from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import { Scroll } from "../../utils/cached-vectors/scroll";
var scroll = Scroll.getSingleton();
var ParallaxDistanceFunction = (function () {
    function ParallaxDistanceFunction() {
    }
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = getVisibleDistanceBetweenElements;
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = getVisibleDistanceBetweenElementCenters;
    ParallaxDistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = getVisibleDistanceBetweenElementBottoms;
    ParallaxDistanceFunction.DOCUMENT_SCROLL = function (unused_a, unused_b) { return scroll.getPosition().y; };
    return ParallaxDistanceFunction;
}());
export { ParallaxDistanceFunction };
//# sourceMappingURL=parallax-distance-function.js.map