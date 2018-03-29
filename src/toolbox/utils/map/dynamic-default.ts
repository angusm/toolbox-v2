import {MapWrapper} from './map-wrapper';
import {doNothing} from '../do-nothing';

class DynamicDefaultMap<K, V> extends MapWrapper implements Map {
  private defaultFunction: (K) => V;

  constructor(iterable:Array<Iterable<K, V>> = [],
              InnerMapClass: typeof Map = Map,
              defaultFunction: (K) => V = doNothing) {
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
    defaultFunction: (K) => V
  ): DynamicDefaultMap<K, V> {
    return new this([], Map, defaultFunction);
  }
}

export {DynamicDefaultMap};
