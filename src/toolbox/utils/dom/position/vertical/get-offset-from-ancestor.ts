function getOffsetFromAncestor(
  element: HTMLElement, ancestor: HTMLElement = null
): number {
  if (!element || element === ancestor) {
    return 0;
  } else {
    return element.offsetTop +
      getOffsetFromAncestor(<HTMLElement>element.offsetParent, ancestor);
  }
}

export {getOffsetFromAncestor};
