import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';
import {MappedIterator} from '../iterable-iterator/mapped-iterator';

// We use K[]|string as the type for MapWrapper to avoid nastiness with type
// checking.
// TODO(Angus): Find a better way.
class MultiValueMap<K, V> extends MapWrapper<K[], V> {
  private uids: DynamicDefaultMap<K, number>;
  private uidsToValue: Map<number, K>;

  constructor(iterable: [K[], V][] = [],
              InnerMapClass: typeof Map = Map) {
    super(
      // iterable.map(
      //   ([keys, value]: [K[], V]) => [this.convertToKey(keys), value]),
      iterable,
      InnerMapClass);

    this.uidsToValue = new Map<number, any>();

    let uid: number = 0;
    this.uids = DynamicDefaultMap.usingFunction<K, number>(
      (value: K) => {
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

  // Ensures a one-to-one mapping, so the same values always reference the
  // same array.
  private convertToKey(keys: K[]): K[] {
    return this.convertToValues(
      keys.map((key) => this.uids.get(key)).join('-'));
  }

  private convertToValues(key: string): K[] {
    return key.split('-').map((uid) => this.uidsToValue.get(parseInt(uid)));
  }

  public get(keys: K[]): V {
    return super.get(this.convertToKey(keys));
  }

  public delete(keys: K[]): boolean {
    return super.delete(this.convertToKey(keys));
  }

  public has(keys: K[]): boolean {
    return super.has(this.convertToKey(keys));
  }

  public keys(): IterableIterator<K[]> {
    // Slice each key to ensure they cannot be modified outside of this class
    return new MappedIterator(super.keys(), (key) => [...key]);
  }

  public set(keys: K[], value: V): this {
    return super.set(this.convertToKey(keys), value);
  }
}

export {MultiValueMap};
