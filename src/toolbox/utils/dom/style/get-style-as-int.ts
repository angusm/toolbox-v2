function getStyleAsInt(element: HTMLElement, style: string): number {
  const parsedOpacity: number =
    parseInt(getComputedStyle(element).getPropertyValue(style));
  return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

export {getStyleAsInt};
