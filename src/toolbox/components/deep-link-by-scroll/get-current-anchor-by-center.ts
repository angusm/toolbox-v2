import {getClosestToCenter} from '../../utils/dom/position/get-closest-to-center';
import {isFullyVisible} from '../../utils/dom/position/is-fully-visible';


function getCurrentAnchorByCenter(): Node {
  const hash = window.location.hash;
  if (hash) {
    const anchorElement: Node = document.querySelector(hash);
    if (anchorElement && isFullyVisible(<HTMLElement>anchorElement)) {
      return anchorElement;
    }
  }
  const anchors = document.querySelectorAll('[id]');
  return getClosestToCenter(anchors);
}

export {getCurrentAnchorByCenter};
