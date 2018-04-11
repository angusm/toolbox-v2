function getStyle(element: HTMLElement, style: string): string {
  return window.getComputedStyle(element).getPropertyValue(style);
}

export {getStyle};
