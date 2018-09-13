function hasTallAspectRatio(element: HTMLElement): boolean {
  return element.offsetHeight > element.offsetWidth;
}

export {hasTallAspectRatio};