import {getClosestToCenter} from '../position/get-closest-to-center';
import {frameMemoize} from "../../frame-memoize";
import {isAbove} from "../position/is-above";
import {getDisplayedAnchors} from "./get-displayed-anchors";

type getAnchorFn = (querySelector: string) => HTMLElement;

function getCurrentAnchorFromLimitedSet_(
  limitedQuerySelector: string, getCurrentAnchor: getAnchorFn
): getAnchorFn {
  return frameMemoize(function(querySelector: string) {
    const baseResult: HTMLElement =
      <HTMLElement>getCurrentAnchor(querySelector);

    const limitedCandidates: HTMLElement[] =
      getDisplayedAnchors(limitedQuerySelector);

    if (limitedCandidates.indexOf(baseResult) !== -1) {
      return baseResult;
    }

    const resultsAboveBase: HTMLElement[] =
      limitedCandidates.filter((candidate) => isAbove(candidate, baseResult));

    return getClosestToCenter(resultsAboveBase);
  });
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorFromLimitedSet:
  (s: string, f: getAnchorFn) => getAnchorFn =
  frameMemoize(getCurrentAnchorFromLimitedSet_);

export {getCurrentAnchorFromLimitedSet};
