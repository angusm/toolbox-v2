function reverseMap<K, V>(map: Map<K, V>): Map<V, K> {
  const MapClass: typeof Map = <typeof Map>map.constructor;
  const entries: [K, V][] = Array.from(map.entries());
  const reversedEntries: [V, K][] =
    entries.map<[V, K]>(([key, value]) => [value, key]);
  return new MapClass<V,K>(reversedEntries);
}

export {reverseMap}
