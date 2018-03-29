import {isDef} from '../is-def';

class MapWrapper<K, V> implements Map<K, V> {
  readonly [Symbol.toStringTag];
  private map: Map;

  constructor(iterable:Array<Iterable<K, V>> = [],
              InnerMapClass: typeof Map = Map) {
    this.map = new InnerMapClass();
    [...iterable].forEach(([key, value]) => this.map.set(key, value));

    /**
     * TODO(Angus): Figure out why the IDE is demanding this and its proper
     *   implementation.
     */
    this[Symbol.toStringTag] = this.constructor.name;
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

  public entries(): Iterator<[K, V]> {
    return this.map.entries();
  }

  public forEach(
    callbackFn: (K, V, this) => void,
    thisArg: Object = undefined
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

  public keys(): Iterator<K> {
    return this.map.keys();
  }

  public set(key: K, value: V): this {
    this.map.set(key, value);
    return this;
  }

  public values(): Iterator<V> {
    return this.map.values();
  }

  public [Symbol.iterator](): Iterator<[K, V]> {
    return this.map[Symbol.iterator]();
  }
}

export {MapWrapper};
