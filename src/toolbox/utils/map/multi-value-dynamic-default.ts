import {DynamicDefaultMap} from './dynamic-default';
import {MultiValueMap} from './multi-value';
import {noop} from '../noop';

class MultiValueDynamicDefaultMap<K, V> extends MultiValueMap<K, V> {
  constructor(iterable: [K[], V][] = [],
              InnerMapClass: typeof Map = Map,
              defaultFunction: (key: K[]) => V = <(key: K[]) => V>noop) {
    super();
    this.replaceInnerMap(
      new DynamicDefaultMap(iterable, InnerMapClass, defaultFunction));
  }

  public static usingFunction<K, V>(
    defaultFunction: (key: K) => V): MultiValueDynamicDefaultMap<K, V> {
    return new MultiValueDynamicDefaultMap([], Map, defaultFunction);
  }
}

export {MultiValueDynamicDefaultMap};
