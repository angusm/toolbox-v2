import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';
import {MappedIterator} from '../iterator/mapped-iterator';

class MultiValueMap<K, V> extends MapWrapper<Array<K>, V> {
  private uids: DynamicDefaultMap<Array<K>, number>;
  private uidsToValue: Map<number, V>;

  constructor(iterable:Array<Iterable<K, V>> = [],
              InnerMapClass: typeof Map = Map) {
    super(iterable, InnerMapClass);

    this.uidsToValue = new Map<number, V>();

    let uid: number = 0;
    this.uids = DynamicDefaultMap.usingFunction<Array<K>, number>(
      (value: Array<K>) => {
        const nextUid = uid++;
        this.uidsToValue.set(nextUid, value);
        return nextUid;
      });
  }

  public clear(): void {
    super.clear();
    this.uidsToValue.clear();
    this.uids.clear();
  }

  private convertToKey(keys: Array<K>): string {
    return keys.map((key) => this.uids.get(key)).join('-');
  }

  private convertToValues(key: string): Array<K> {
    return key.split('-').map((uid) => this.uidsToValue.get(parseInt(uid)));
  }

  public get(...keys: Array<K>): V {
    return super.get(this.convertToKey(keys));
  }

  public delete(...keys: Array<K>): boolean {
    return super.delete(this.convertToKey(keys));
  }

  public has(...keys: Array<K>): boolean {
    return super.has(this.convertToKey(keys));
  }

  public keys(): Iterator<Array<K>> {
    return new MappedIterator(super.keys(), (key) => this.convertToValues(key));
  }

  public set(...keysAndValue: Array<K|V>): this {
    const keys: Array<K> = <K>keysAndValue.slice(0, -1);
    const value: V = <V>keysAndValue.slice(-1)[0];
    return super.set(this.convertToKey(keys), value);
  }
}

export {MultiValueMap};
