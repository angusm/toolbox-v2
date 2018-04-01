import {getClosestToCenter} from '../../utils/dom/position/get-closest-to-center';
import {isFullyVisible} from '../../utils/dom/position/is-fully-visible';
import {CommonSelector} from "../../utils/dom/common-selector";


function getCurrentAnchorByCenter(
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

export {getCurrentAnchorByCenter};
