import {getStyle} from "./get-style";

function getStyleAsInt(element: HTMLElement, style: string): number {
  const parsedOpacity: number = parseInt(getStyle(element, style));
  return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}

export {getStyleAsInt};
