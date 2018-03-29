import {isDef} from '../is-def';

/**
 * Generic Types
 * K: Key type
 * V: Value type
 */

class MapWrapper<K, V> implements Map<K, V> {
  readonly [Symbol.toStringTag]: "Map";
  private map: Map<K, V>;

  constructor(iterable: [K, V][] = [],
              InnerMapClass: typeof Map = Map) {
    this.map = new InnerMapClass<K, V>();
    this.populateFromIterable(iterable);
  }

  protected populateFromIterable(iterable: [K, V][]) {
    iterable.forEach(([key, value]) => this.set(key, value));
  }

  protected replaceInnerMap(innerMap:Map<K, V>): void {
    this.map = innerMap;
  }

  public get size(): number {
    return this.map.size;
  }

  public clear(): void {
    this.map.clear();
  }

  public delete(key: K): boolean {
    return this.map.delete(key);
  }

  public entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  public forEach(
    callbackFn: (value: V, index: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    const finalThisArg = isDef(thisArg) ? thisArg : this;
    this.map.forEach(callbackFn, <this>finalThisArg);
  }

  public get(key: K): V {
    return this.map.get(key);
  }

  public has(key: K): boolean {
    return this.map.has(key);
  }

  public keys(): IterableIterator<K> {
    return this.map.keys();
  }

  public set(key: K, value: V): this {
    this.map.set(key, value);
    return this;
  }

  public values(): IterableIterator<V> {
    return this.map.values();
  }

  public [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map[Symbol.iterator]();
  }
}

export {MapWrapper};
