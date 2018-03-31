function getStyleAsInt(element: HTMLElement, style: string): number {
  const parsedOpacity: number =
    parseInt(element.style.getPropertyValue(style));
  return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

export {getStyleAsInt};
