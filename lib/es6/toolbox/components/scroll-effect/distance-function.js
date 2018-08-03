import { getVisibleDistanceBetweenElementBottoms } from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import { getVisibleDistanceBetweenElementCenters } from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import { getVisibleDistanceBetweenElements } from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import { Scroll } from "../../utils/cached-vectors/scroll";
var scroll = Scroll.getSingleton();
var DistanceFunction = (function () {
    function DistanceFunction() {
    }
    DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = getVisibleDistanceBetweenElements;
    DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = getVisibleDistanceBetweenElementCenters;
    DistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = getVisibleDistanceBetweenElementBottoms;
    DistanceFunction.DOCUMENT_SCROLL = function (unused_a, unused_b) { return scroll.getPosition().y; };
    return DistanceFunction;
}());
export { DistanceFunction };
//# sourceMappingURL=distance-function.js.map