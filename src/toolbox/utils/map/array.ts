import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';

class ArrayMap<K, V> extends MapWrapper<K, V[]> {
  constructor(iterable: [K, V[]][] = [],
              InnerMapClass: typeof Map = Map) {
    super(iterable, InnerMapClass);
    this.replaceInnerMap(
      new DynamicDefaultMap<K, V[]>(
        iterable,
        InnerMapClass,
        (key: K) => []));
  }

  public get(key: K): V[] {
    return super.get(key);
  }

  public set(key: K, value: V[]): this {
    return super.set(key, value);
  }
}

export {ArrayMap};
