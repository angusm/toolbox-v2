const getClosestToCenter = require('../../utils/dom/position/get-closest-to-center');
const isFullyVisible = require('../../utils/dom/position/is-fully-visible');


function getCurrentAnchorByCenter() {
  const hash = window.location.hash;
  if (hash) {
    const anchorElement = document.querySelector(hash);
    if (anchorElement && isFullyVisible(anchorElement)) {
      return anchorElement;
    }
  }
  const anchors = document.querySelectorAll('[id]');
  return getClosestToCenter(anchors);
}

module.exports = getCurrentAnchorByCenter;
