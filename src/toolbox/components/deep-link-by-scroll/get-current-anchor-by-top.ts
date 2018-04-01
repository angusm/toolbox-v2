import {getClosestToTopWithoutGoingOver} from '../../utils/dom/position/get-closest-to-top-without-going-over';
import {isFullyVisible} from '../../utils/dom/position/is-fully-visible';
import {CommonSelector} from "../../utils/dom/common-selector";


function getCurrentAnchorByTop(
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

export {getCurrentAnchorByTop};
