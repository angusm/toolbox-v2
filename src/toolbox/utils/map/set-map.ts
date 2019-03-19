import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';

class SetMap<K, V> extends MapWrapper<K, Set<V>> {
  constructor(iterable: [K, Set<V>][] = [],
              InnerMapClass: typeof Map = Map) {
    super(iterable, InnerMapClass);
    this.replaceInnerMap(
      new DynamicDefaultMap<K, Set<V>>(
        iterable,
        InnerMapClass,
        (key: K) => new Set()));
  }
}

export {SetMap};
