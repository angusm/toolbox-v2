import {ICarousel} from "../../interfaces";
import {sumOffsetWidthsFromArray} from "../../../../utils/dom/position/sum-offset-widths-from-array";
import {loopSlice} from "../../../../utils/array/loop-slice";
import {translate2d} from "../../../../utils/dom/position/translate-2d";
import {Vector2d} from "../../../../utils/math/geometry/vector-2d";

function adjustSlideForSplit(
  carousel: ICarousel,
  targetSlide: HTMLElement,
  slide: HTMLElement,
  distancesFromTarget: Map<HTMLElement, number>,
  direction: number
): void {
  const targetOffset =
    getTargetSplitOffset(carousel, targetSlide, slide, direction);
  const distance = distancesFromTarget.get(slide);

  const difference = targetOffset - distance;
  if (difference !== 0) {
    translate2d(slide, new Vector2d(difference, 0));
  }
}

function getTargetSplitOffset(
  carousel: ICarousel,
  targetSlide: HTMLElement,
  slide: HTMLElement,
  direction: number
): number {
  if (targetSlide === slide) {
    return 0;
  }
  const inBetweenSlides =
    getInBetweenSlides(carousel, targetSlide, slide, direction);
  const inBetweenWidth = sumOffsetWidthsFromArray(inBetweenSlides);
  const halfSlideWidth = slide.offsetWidth / 2;
  const halfTargetSlideWidth = targetSlide.offsetWidth / 2;
  return (halfSlideWidth + inBetweenWidth + halfTargetSlideWidth) * direction;
}

function getInBetweenSlides(
  carousel: ICarousel,
  targetSlide: HTMLElement,
  slide: HTMLElement,
  direction: number
): HTMLElement[] {
  const targetIndex = carousel.getSlideIndex(targetSlide);
  const endIndex = carousel.getSlideIndex(slide) - direction;
  if (carousel.allowsLooping()) {
    return loopSlice(carousel.getSlides(), endIndex, targetIndex, -direction);
  } else if (targetIndex === endIndex) {
    return [];
  } else {
    return carousel.getSlides().slice(
      Math.min(targetIndex + 1, endIndex),
      Math.max(targetIndex, endIndex + direction));
  }
}

export {adjustSlideForSplit};
