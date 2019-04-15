function reverseMap<K, V>(map: Map<K, V>): Map<V, K> {
  const MapClass: typeof Map = <typeof Map>map.constructor;
  const entries = map.entries();

  let nextEntry = entries.next();
  const reversedMap = new MapClass<V, K>();
  while (!nextEntry.done) {
    const [key, value] = nextEntry.value;
    reversedMap.set(value, key);
    nextEntry = entries.next();
  }
  return reversedMap;
}

export {reverseMap}
