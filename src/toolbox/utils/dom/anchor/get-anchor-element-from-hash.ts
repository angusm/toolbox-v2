import {frameMemoize} from "../../frame-memoize";

function getAnchorElementFromHash_(): Node {
  const hash = window.location.hash;
  return hash ? document.querySelector(hash): null;
}

const getAnchorElementFromHash = frameMemoize(getAnchorElementFromHash_);

export {getAnchorElementFromHash};
