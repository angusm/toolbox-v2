import {isDefined} from './is-defined';
/**
 * DEPRECATED: Replace with more clearly named isDefined.
 */
function isDef(value: any): boolean {
  console.warn(
    "Toolbox's isDef is deprecated, please use the better named " +
    "isDefined instead");
  return isDefined(value);
}

export {isDef};
