import {MapWrapper} from './map-wrapper';
import {noop} from '../noop';

class DynamicDefaultMap<K, V> extends MapWrapper<K, V> {
  private defaultFunction: (key: K) => V;

  constructor(iterable: [K, V][] = [],
              InnerMapClass: typeof Map = Map,
              defaultFunction: (key: K) => V = <(key: K) => V>noop) {
    super(iterable, InnerMapClass);
    this.defaultFunction = defaultFunction;
  }

  public get(key: any): any {
    if (!this.has(key)) {
      this.set(key, this.defaultFunction(key));
    }
    return super.get(key);
  }

  public static usingFunction<K, V>(
    defaultFunction: (key: K) => V
  ): DynamicDefaultMap<K, V> {
    return new this([], Map, defaultFunction);
  }
}

export {DynamicDefaultMap};
