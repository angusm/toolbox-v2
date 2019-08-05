function getParentElement(element: HTMLElement): HTMLElement[] {
  const result = [];
  let candidate = element.parentElement;
  while (candidate) {
    result.push(element);
    candidate = candidate.parentElement;
  }
  return result;
}

export {getParentElement};
