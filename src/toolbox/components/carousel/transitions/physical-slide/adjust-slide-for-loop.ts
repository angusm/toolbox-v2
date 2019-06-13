import {ICarousel} from "../../interfaces";
import {getVisibleDistanceBetweenElementCenters} from "../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers";
import {getSign} from "../../../../utils/math/get-sign";
import {ROOT_ELEMENT} from "../../../../utils/dom/position/root-element";
import {translate2d} from "../../../../utils/dom/position/translate-2d";
import {Vector2d} from "../../../../utils/math/geometry/vector-2d";
import {MatrixService} from "../../../../utils/dom/position/matrix-service";


// Micro-optimization
const matrixService = MatrixService.getSingleton();

function adjustSlideForLoop(carousel: ICarousel, slide: HTMLElement): void {
  if (!carousel.allowsLooping()) {
    return; // Never adjust non-looping carousels
  }

  const totalWidth =
    carousel.getSlides()
      .reduce((total, slide) => total + slide.offsetWidth, 0);

  const distanceFromCenter =
    getVisibleDistanceBetweenElementCenters(slide) +
    matrixService.getAlteredXTranslation(slide);
  const distanceFromCenterSign = getSign(distanceFromCenter);
  const isOffscreen = Math.abs(distanceFromCenter) > (totalWidth / 2);

  // Reset during drag if the drag has gone exceedingly far
  if (isOffscreen) {
    const xTranslation = -totalWidth * distanceFromCenterSign;
    const translatedDistanceFromCenter =
      (ROOT_ELEMENT.clientWidth * distanceFromCenterSign) +
      distanceFromCenter + xTranslation;

    if (
      Math.abs(translatedDistanceFromCenter) < Math.abs(distanceFromCenter)
    ) {
      translate2d(slide, new Vector2d(xTranslation, 0));
    }
  }
}

export {adjustSlideForLoop};
