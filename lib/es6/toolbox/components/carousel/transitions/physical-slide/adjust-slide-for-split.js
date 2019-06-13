import { sumOffsetWidthsFromArray } from "../../../../utils/dom/position/sum-offset-widths-from-array";
import { loopSlice } from "../../../../utils/array/loop-slice";
import { translate2d } from "../../../../utils/dom/position/translate-2d";
import { Vector2d } from "../../../../utils/math/geometry/vector-2d";
function adjustSlideForSplit(carousel, targetSlide, slide, distancesFromTarget, direction) {
    var targetOffset = getTargetSplitOffset(carousel, targetSlide, slide, direction);
    var distance = distancesFromTarget.get(slide);
    var difference = targetOffset - distance;
    if (difference !== 0) {
        translate2d(slide, new Vector2d(difference, 0));
    }
}
function getTargetSplitOffset(carousel, targetSlide, slide, direction) {
    if (targetSlide === slide) {
        return 0;
    }
    var inBetweenSlides = getInBetweenSlides(carousel, targetSlide, slide, direction);
    var inBetweenWidth = sumOffsetWidthsFromArray(inBetweenSlides);
    var halfSlideWidth = slide.offsetWidth / 2;
    var halfTargetSlideWidth = targetSlide.offsetWidth / 2;
    return (halfSlideWidth + inBetweenWidth + halfTargetSlideWidth) * direction;
}
function getInBetweenSlides(carousel, targetSlide, slide, direction) {
    var targetIndex = carousel.getSlideIndex(targetSlide);
    var endIndex = carousel.getSlideIndex(slide) - direction;
    if (carousel.allowsLooping()) {
        return loopSlice(carousel.getSlides(), endIndex, targetIndex, -direction);
    }
    else if (targetIndex === endIndex) {
        return [];
    }
    else {
        return carousel.getSlides().slice(Math.min(targetIndex + 1, endIndex), Math.max(targetIndex, endIndex + direction));
    }
}
export { adjustSlideForSplit };
//# sourceMappingURL=adjust-slide-for-split.js.map