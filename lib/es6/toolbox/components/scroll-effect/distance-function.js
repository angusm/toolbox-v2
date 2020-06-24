import { getVisibleDistanceBetweenElementBottoms } from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import { getVisibleDistanceBetweenElementCenters } from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import { negateNumericFunction } from "../../utils/functions/negate-numeric-function";
import { getVisibleDistanceFromRoot } from "../../utils/dom/position/vertical/get-visible-distance-from-root";
import { SCROLL_ELEMENT } from '../../utils/dom/position/scroll-element';
var DistanceFunction = (function () {
    function DistanceFunction() {
    }
    DistanceFunction.DISTANCE_FROM_DOCUMENT_TOP = negateNumericFunction(getVisibleDistanceFromRoot);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER = negateNumericFunction(getVisibleDistanceBetweenElementCenters);
    DistanceFunction.DISTANCE_FROM_DOCUMENT_BOTTOM = negateNumericFunction(getVisibleDistanceBetweenElementBottoms);
    DistanceFunction.DOCUMENT_SCROLL = function () { return window.pageYOffset || SCROLL_ELEMENT.scrollTop; };
    return DistanceFunction;
}());
export { DistanceFunction };
//# sourceMappingURL=distance-function.js.map