/**
 * Simply determines if a value is defined. This utility is provided to be
 * a terse alternative to typing its contents out repeatedly.
 */
function isDefined(value: any): boolean {
  return typeof value !== 'undefined';
}

export {isDefined};
