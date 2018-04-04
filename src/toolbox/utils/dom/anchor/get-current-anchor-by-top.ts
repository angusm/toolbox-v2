import {getClosestToTopWithoutGoingOver} from '../position/get-closest-to-top-without-going-over';
import {isFullyVisible} from '../position/is-fully-visible';
import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";
import {getDisplayedAnchors} from "./get-displayed-anchors";


function getCurrentAnchorByTop_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): HTMLElement {
  const hash: string = window.location.hash;
  if (hash) {
    const anchorElement: HTMLElement = <HTMLElement>document.querySelector(hash);
    if (anchorElement && isFullyVisible(anchorElement)) {
      return anchorElement;
    }
  }

  return getClosestToTopWithoutGoingOver(getDisplayedAnchors(querySelector));
}

const getCurrentAnchorByTop = frameMemoize(getCurrentAnchorByTop_);

export {getCurrentAnchorByTop};
