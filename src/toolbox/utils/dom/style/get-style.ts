import {ComputedStyleService} from "./computed-style-service";

const computedStyleService = ComputedStyleService.getSingleton();

function getStyle(element: HTMLElement, style: string): string {
  return computedStyleService.getComputedStyle(element).getPropertyValue(style);
}

export {getStyle};
