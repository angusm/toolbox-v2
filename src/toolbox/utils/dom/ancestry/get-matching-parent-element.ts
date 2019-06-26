function getMatchingParentElement(
  element: HTMLElement, testFunction: (element: HTMLElement) => boolean
): HTMLElement {
  let candidate = element.parentElement;
  while (candidate) {
    if (testFunction(candidate)) {
      return candidate;
    }
    candidate = candidate.parentElement;
  }
  return null;
}

export {getMatchingParentElement};
