import {getClosestToCenter} from '../position/get-closest-to-center';
import {isFullyVisible} from '../position/is-fully-visible';
import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";

function getCurrentAnchorByCenter_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): Node {
  const hash = window.location.hash;
  if (hash) {
    const anchorElement: Node = document.querySelector(hash);
    if (anchorElement && isFullyVisible(<HTMLElement>anchorElement)) {
      return anchorElement;
    }
  }
  const anchors = document.querySelectorAll(querySelector);
  return getClosestToCenter(anchors);
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);

export {getCurrentAnchorByCenter};
