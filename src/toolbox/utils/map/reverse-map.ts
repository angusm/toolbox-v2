import {forEach} from "../iterable-iterator/for-each";

function reverseMap<K, V>(map: Map<K, V>): Map<V, K> {
  const MapClass: typeof Map = <typeof Map>map.constructor;
  const entries = map.entries();

  const reversedMap = new MapClass<V, K>();
  forEach(entries, ([key, value]) => reversedMap.set(value, key));
  return reversedMap;
}

export {reverseMap}
