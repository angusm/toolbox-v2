import {defaultSymbol} from './default-symbol';

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
