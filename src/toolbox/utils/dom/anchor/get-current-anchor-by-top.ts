import {getClosestToTopWithoutGoingOver} from '../position/get-closest-to-top-without-going-over';
import {frameMemoize} from "../../frame-memoize";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {isAnchorElementFromHashFullyVisible} from "./is-anchor-element-from-hash-fully-visible";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";


function getCurrentAnchorByTop(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement {
  return isAnchorElementFromHashFullyVisible() ?
    getAnchorElementFromHash() :
    getClosestToTopWithoutGoingOver(getDisplayedAnchors(getAnchorsFn));
}

export {getCurrentAnchorByTop};
