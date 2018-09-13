function getAnchorElementFromHash(): Node {
  const hash = window.location.hash;
  return hash ? document.querySelector(hash): null;
}

export {getAnchorElementFromHash};
