function getStyleAsFloat(element: HTMLElement, style: string): number {
  const parsedOpacity: number =
    parseFloat(element.style.getPropertyValue(style));
  return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

export {getStyleAsFloat};
