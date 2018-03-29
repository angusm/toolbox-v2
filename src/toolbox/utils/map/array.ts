import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';

class ArrayMap<K, V> extends MapWrapper<K, V> {
  constructor(iterable:Array<Iterable<K, V>> = [],
              InnerMapClass: typeof Map = Map) {
    super();
    this.replaceInnerMap(
      new DynamicDefaultMap(iterable, InnerMapClass, () => []));
  }

  public get(key: K): Array<V> {
    return super.get(key);
  }

  public set(key: K, value: Array<V>): this {
    return super.set(key, value);
  }
}

export {ArrayMap};
