"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sum_offset_widths_from_array_1 = require("../../../../utils/dom/position/sum-offset-widths-from-array");
var loop_slice_1 = require("../../../../utils/array/loop-slice");
var translate_2d_1 = require("../../../../utils/dom/position/translate-2d");
var vector_2d_1 = require("../../../../utils/math/geometry/vector-2d");
function adjustSlideForSplit(carousel, targetSlide, slide, distancesFromTarget, direction) {
    var targetOffset = getTargetSplitOffset(carousel, targetSlide, slide, direction);
    var distance = distancesFromTarget.get(slide);
    var difference = targetOffset - distance;
    if (difference !== 0) {
        translate_2d_1.translate2d(slide, new vector_2d_1.Vector2d(difference, 0));
    }
}
exports.adjustSlideForSplit = adjustSlideForSplit;
function getTargetSplitOffset(carousel, targetSlide, slide, direction) {
    if (targetSlide === slide) {
        return 0;
    }
    var inBetweenSlides = getInBetweenSlides(carousel, targetSlide, slide, direction);
    var inBetweenWidth = sum_offset_widths_from_array_1.sumOffsetWidthsFromArray(inBetweenSlides);
    var halfSlideWidth = slide.offsetWidth / 2;
    var halfTargetSlideWidth = targetSlide.offsetWidth / 2;
    return (halfSlideWidth + inBetweenWidth + halfTargetSlideWidth) * direction;
}
function getInBetweenSlides(carousel, targetSlide, slide, direction) {
    var targetIndex = carousel.getSlideIndex(targetSlide);
    var endIndex = carousel.getSlideIndex(slide) - direction;
    if (carousel.allowsLooping()) {
        return loop_slice_1.loopSlice(carousel.getSlides(), endIndex, targetIndex, -direction);
    }
    else if (targetIndex === endIndex) {
        return [];
    }
    else {
        return carousel.getSlides().slice(Math.min(targetIndex + 1, endIndex), Math.max(targetIndex, endIndex + direction));
    }
}
//# sourceMappingURL=adjust-slide-for-split.js.map