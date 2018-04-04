function getStyle(element: HTMLElement, style: string): string {
  return getComputedStyle(element).getPropertyValue(style);
}

export {getStyle};
