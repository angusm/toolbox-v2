import {ComputedStyleService} from "../style/computed-style-service";

const computedStyleService = ComputedStyleService.getSingleton();
const POSITIONED_VALUES = new Set([
  'absolute',
  'fixed',
  'relative',
  'sticky',
]);

function isPositioned(element: HTMLElement) {
  const computedStyle = computedStyleService.getComputedStyle(element);
  return POSITIONED_VALUES.has(computedStyle.position);
}

export {isPositioned};
