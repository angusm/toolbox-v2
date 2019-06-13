import { getVisibleDistanceBetweenElementCenters } from "../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers";
import { getSign } from "../../../../utils/math/get-sign";
import { ROOT_ELEMENT } from "../../../../utils/dom/position/root-element";
import { translate2d } from "../../../../utils/dom/position/translate-2d";
import { Vector2d } from "../../../../utils/math/geometry/vector-2d";
import { MatrixService } from "../../../../utils/dom/position/matrix-service";
var matrixService = MatrixService.getSingleton();
function adjustSlideForLoop(carousel, slide) {
    if (!carousel.allowsLooping()) {
        return;
    }
    var totalWidth = carousel.getSlides()
        .reduce(function (total, slide) { return total + slide.offsetWidth; }, 0);
    var distanceFromCenter = getVisibleDistanceBetweenElementCenters(slide) +
        matrixService.getAlteredXTranslation(slide);
    var distanceFromCenterSign = getSign(distanceFromCenter);
    var isOffscreen = Math.abs(distanceFromCenter) > (totalWidth / 2);
    if (isOffscreen) {
        var xTranslation = -totalWidth * distanceFromCenterSign;
        var translatedDistanceFromCenter = (ROOT_ELEMENT.clientWidth * distanceFromCenterSign) +
            distanceFromCenter + xTranslation;
        if (Math.abs(translatedDistanceFromCenter) < Math.abs(distanceFromCenter)) {
            translate2d(slide, new Vector2d(xTranslation, 0));
        }
    }
}
export { adjustSlideForLoop };
//# sourceMappingURL=adjust-slide-for-loop.js.map