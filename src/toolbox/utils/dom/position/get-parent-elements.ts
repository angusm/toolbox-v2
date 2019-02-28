function getParentElements_(
  element: HTMLElement, terminusAncestor: HTMLElement = null
): HTMLElement[] {
  if (!element || element === terminusAncestor) {
    return [];
  }
  return [element].concat(
    getParentElements_(<HTMLElement>element.parentElement, terminusAncestor));
}

function getParentElements(
  element: HTMLElement, terminusAncestor: HTMLElement = null
): HTMLElement[] {
  return getParentElements_(element.parentElement, terminusAncestor);
}

export {getParentElements};
