function getScrollElement(): Element {
  return document.scrollingElement || document.documentElement;
}

export {getScrollElement};
