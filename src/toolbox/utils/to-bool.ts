/**
 * Sole purpose of this function is to ensure real boolean values instead of
 * truthy and falsey values.
 */

function toBool(val: any): boolean {
  return !!val;
}

export {toBool};
