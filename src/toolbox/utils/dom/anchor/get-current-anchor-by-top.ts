import {getClosestToTopWithoutGoingOver} from '../position/get-closest-to-top-without-going-over';
import {isFullyVisible} from '../position/is-fully-visible';
import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";


function getCurrentAnchorByTop_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): Node {
  const hash: string = window.location.hash;
  if (hash) {
    const anchorElement: Node = document.querySelector(hash);
    if (anchorElement && isFullyVisible(<HTMLElement>anchorElement)) {
      return anchorElement;
    }
  }
  const anchors: NodeList = document.querySelectorAll(querySelector);
  return getClosestToTopWithoutGoingOver(anchors);
}

const getCurrentAnchorByTop = frameMemoize(getCurrentAnchorByTop_);

export {getCurrentAnchorByTop};
