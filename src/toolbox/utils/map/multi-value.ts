import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';
import {MappedIterator} from '../iterable-iterator/mapped-iterator';

// We use K[]|string as the type for MapWrapper to avoid nastiness with type
// checking.
// TODO(Angus): Find a better way.
class MultiValueMap<K, V> extends MapWrapper<K[], V> {
  private valueToUid: DynamicDefaultMap<K, number>;
  private uidToValue: Map<number, K>;
  private stringToInternalKey: DynamicDefaultMap<string, K[]>;
  private uid: number;

  constructor(iterable: [K[], V][] = [],
              InnerMapClass: typeof Map = Map) {
    super([], InnerMapClass); // Defer population

    this.uid = 0;
    this.uidToValue = new Map<number, K>();
    this.valueToUid = DynamicDefaultMap.usingFunction<K, number>(
      (value: K) => this.getUid(value));
    this.stringToInternalKey = DynamicDefaultMap.usingFunction<string, K[]>(
      (stringId: string) => this.stringIdToInternalKey(stringId));

    this.populateFromIterable(iterable);
  }

  public clear(): void {
    super.clear();
    this.uid = 0;
    this.uidToValue.clear();
    this.valueToUid.clear();
    this.stringToInternalKey.clear();
  }

  private getUid(value: K): number {
    const nextUid = this.uid++;
    this.uidToValue.set(nextUid, value);
    return nextUid;
  }

  // Ensures a one-to-one mapping, so the same values always reference the
  // same array.
  private getInternalKey(keys: K[]): K[] {
    return this.stringToInternalKey.get(this.getStringId(keys));
  }

  private getStringId(keys: K[]): string {
    return keys.map((key) => this.valueToUid.get(key)).join('-')
  }

  private stringIdToInternalKey(key: string): K[] {
    return key.split('-').map((uid) => this.uidToValue.get(parseInt(uid)));
  }

  public get(keys: K[]): V {
    return super.get(this.getInternalKey(keys));
  }

  public delete(keys: K[]): boolean {
    return super.delete(this.getInternalKey(keys));
  }

  public has(keys: K[]): boolean {
    return super.has(this.getInternalKey(keys));
  }

  public keys(): IterableIterator<K[]> {
    // Slice each key to ensure they cannot be modified outside of this class
    return new MappedIterator(super.keys(), (key) => [...key]);
  }

  public set(keys: K[], value: V): this {
    return super.set(this.getInternalKey(keys), value);
  }
}

export {MultiValueMap};
