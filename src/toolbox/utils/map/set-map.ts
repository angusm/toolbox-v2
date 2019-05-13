import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';

function defaultFunction<K, V>(key: K): Set<V> {
  return new Set<V>();
}

class SetMap<K, V> extends MapWrapper<K, Set<V>> {
  constructor(iterable: [K, Set<V>][] = [],
              InnerMapClass: typeof Map = Map) {
    super(iterable, InnerMapClass);
    this.replaceInnerMap(
      new DynamicDefaultMap<K, Set<V>>(
        iterable, InnerMapClass, defaultFunction));
  }
}

export {SetMap};
