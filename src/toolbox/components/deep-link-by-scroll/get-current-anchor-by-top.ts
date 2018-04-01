import {getClosestToTopWithoutGoingOver} from '../../utils/dom/position/get-closest-to-top-without-going-over';
import {isFullyVisible} from '../../utils/dom/position/is-fully-visible';


function getCurrentAnchorByTop() {
  const hash: string = window.location.hash;
  if (hash) {
    const anchorElement: Node = document.querySelector(hash);
    if (anchorElement && isFullyVisible(<HTMLElement>anchorElement)) {
      return anchorElement;
    }
  }
  const anchors: NodeList = document.querySelectorAll('[id]');
  return getClosestToTopWithoutGoingOver(anchors);
}

export {getCurrentAnchorByTop};
