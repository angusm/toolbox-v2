const getClosestToTopWithoutGoingOver = require('../../utils/dom/position/get-closest-to-top-without-going-over');
const isFullyVisible = require('../../utils/dom/position/is-fully-visible');


function getCurrentAnchorByTop() {
  const hash = window.location.hash;
  if (hash) {
    const anchorElement = document.querySelector(hash);
    if (anchorElement && isFullyVisible(anchorElement)) {
      return anchorElement;
    }
  }
  const anchors = document.querySelectorAll('[id]');
  return getClosestToTopWithoutGoingOver(anchors);
}

module.exports = getCurrentAnchorByTop();
