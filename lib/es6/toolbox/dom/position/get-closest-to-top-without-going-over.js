import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
function getClosestToTopWithoutGoingOver(nodelist, container) {
    if (container === void 0) { container = null; }
    function getDistanceFromTop(element) {
        return getVisibleDistanceBetweenElements(element, container).y;
    }
    function mapElementToDistance(element) {
        return [element, getDistanceFromTop(element)];
    }
    function mapDistancesToAbs(_a) {
        var element = _a[0], distance = _a[1];
        return [element, distance, Math.abs(distance)];
    }
    var distances = Array.from(nodelist).map(mapElementToDistance);
    var absDistances = distances.map(mapDistancesToAbs);
    var sortedDistances = absDistances.sort(function (_a, _b) {
        var eA = _a[0], dA = _a[1], adA = _a[2];
        var eB = _b[0], dB = _b[1], adB = _b[2];
        return adA - adB;
    });
    var distancesBelowTop = sortedDistances.filter(function (_a) {
        var e = _a[0], distance = _a[1], ad = _a[2];
        return distance >= 0;
    });
    return distancesBelowTop.length ?
        distancesBelowTop[0] && distancesBelowTop[0][0] :
        sortedDistances[0] && sortedDistances[0][0];
}
export { getClosestToTopWithoutGoingOver };
//# sourceMappingURL=get-closest-to-top-without-going-over.js.map