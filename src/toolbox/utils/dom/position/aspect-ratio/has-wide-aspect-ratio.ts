function hasWideAspectRatio(element: HTMLElement): boolean {
  return element.offsetHeight < element.offsetWidth;
}

export {hasWideAspectRatio};