function getStyle(element: HTMLElement, style: string): string {
  return element.style.getPropertyValue(style);
}

export {getStyle};
