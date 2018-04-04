import {getStyle} from "./get-style";

function getStyleAsFloat(element: HTMLElement, style: string): number {
  const parsedOpacity: number = parseFloat(getStyle(element, style));
  return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

export {getStyleAsFloat};
