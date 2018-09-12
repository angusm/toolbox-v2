import {defaultSymbol} from './default-symbol';

/**
 * Allows for maps of keys to functions to replace switches.
 * - Removes risk of accidental fall through.
 * - More concise syntax than if statements, and switch statements in some cases
 *
 * Uses Toolbox's default symbol as the key for the desired default case.
 *
 * So for instance:
 *
 * function someSwitchFn(value, a, b, c) {
 *   switch (value) {
 *     case 1:
 *       return fnJ(a, b, c);
 *     case 2:
 *       return fnK(a, b, c);
 *     case 'applesauce':
 *       return fnL(a, b, c);
 *     default:
 *       return fnM(a, b, c);
 *   }
 * }
 *
 * can become...
 *
 * function someSwitchFn(value, a, b, c) {
 *   const switchMap = new Map([
 *     [1, fnJ],
 *     [2, fnK],
 *     ['applesauce', fnL],
 *     [defaultSymbol, fnM],
 *   ]);
 *   return runMapAsSwitch(switchMap, value, a, b, c);
 * }
 */
function runMapAsSwitch<K, V, R>(
  map: Map<K|symbol, (...any:V[]) => R>, key: K, ...args: Array<V>
): R {
  if (map.has(key)) {
    return map.get(key)(...args);
  } else {
    return map.get(defaultSymbol)(...args);
  }
}

export {runMapAsSwitch};
