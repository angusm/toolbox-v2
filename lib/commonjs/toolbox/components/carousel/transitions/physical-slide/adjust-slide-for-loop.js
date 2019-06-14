"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_element_centers_1 = require("../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers");
var get_sign_1 = require("../../../../utils/math/get-sign");
var root_element_1 = require("../../../../utils/dom/position/root-element");
var translate_2d_1 = require("../../../../utils/dom/position/translate-2d");
var vector_2d_1 = require("../../../../utils/math/geometry/vector-2d");
var matrix_service_1 = require("../../../../utils/dom/position/matrix-service");
var matrixService = matrix_service_1.MatrixService.getSingleton();
function adjustSlideForLoop(carousel, slide) {
    if (!carousel.allowsLooping()) {
        return;
    }
    var totalWidth = carousel.getSlides()
        .reduce(function (total, slide) { return total + slide.offsetWidth; }, 0);
    var distanceFromCenter = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide) +
        matrixService.getAlteredXTranslation(slide);
    var distanceFromCenterSign = get_sign_1.getSign(distanceFromCenter);
    var isOffscreen = Math.abs(distanceFromCenter) > (totalWidth / 2);
    if (isOffscreen) {
        var xTranslation = -totalWidth * distanceFromCenterSign;
        var translatedDistanceFromCenter = (root_element_1.ROOT_ELEMENT.clientWidth * distanceFromCenterSign) +
            distanceFromCenter + xTranslation;
        if (Math.abs(translatedDistanceFromCenter) < Math.abs(distanceFromCenter)) {
            translate_2d_1.translate2d(slide, new vector_2d_1.Vector2d(xTranslation, 0));
        }
    }
}
exports.adjustSlideForLoop = adjustSlideForLoop;
//# sourceMappingURL=adjust-slide-for-loop.js.map