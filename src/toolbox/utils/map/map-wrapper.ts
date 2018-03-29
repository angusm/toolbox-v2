import {isDef} from '../is-def';

type MapClass = Map | MapWrapper;
type MapClassParam = { new(...args: any[]): MapClass };
type KVP = [any, any]; // Key Value Pairs

class MapWrapper<T extends MapClass> {
  private map: MapClass;

  constructor(iterable:Array<Iterable<KVP>> = [],
              InnerMapClass: MapClassParam = Map) {
    this.map = new InnerMapClass();
    [...iterable].forEach(([key, value]) => this.map.set(key, value));
  }

  protected replaceInnerMap(innerMap:T): void {
    this.map = innerMap;
  }

  public get length(): number {
    return this.map.length;
  }

  public get size(): number {
    return this.map.size;
  }

  public clear(): void {
    this.map.clear();
  }

  public delete(key: any): boolean {
    return this.map.delete(key);
  }

  public entries(): Iterator<KVP> {
    return this.map.entries();
  }

  public forEach(callbackFn: (any, any, this) => void, thisArg: Object = undefined): void {
    const finalThisArg = isDef(thisArg) ? thisArg : this;
    this.map.forEach(callbackFn, <this>finalThisArg);
  }

  public get(key: any): any {
    return this.map.get(key);
  }

  public has(key: any): boolean {
    return this.map.has(key);
  }

  public keys(): Iterator<any> {
    return this.map.keys();
  }

  public set(key: any, value: any): this {
    this.map.set(key, value);
    return this;
  }

  public values(): Iterator<any> {
    return this.map.values();
  }

  public [Symbol.iterator](): Iterator<KVP> {
    return this.map[Symbol.iterator]();
  }
}

export {
  MapWrapper,
  MapClass,
  MapClassParam,
  KVP
};
