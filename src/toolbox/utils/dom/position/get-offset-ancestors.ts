function getOffsetAncestors(
  element: HTMLElement, terminusAncestor: HTMLElement = null
): HTMLElement[] {
  if (!element || element === terminusAncestor) {
    return [];
  }
  return [element].concat(
    getOffsetAncestors(<HTMLElement>element.offsetParent, terminusAncestor));
}

export {getOffsetAncestors};
