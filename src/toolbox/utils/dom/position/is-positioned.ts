const POSITIONED_VALUES = new Set([
  'absolute',
  'fixed',
  'relative',
  'sticky',
]);

function isPositioned(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  return POSITIONED_VALUES.has(computedStyle.position);
}

export {isPositioned};
