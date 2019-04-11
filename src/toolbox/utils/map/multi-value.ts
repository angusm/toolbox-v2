import {DynamicDefaultMap} from './dynamic-default';
import {MapWrapper} from './map-wrapper';
import {MappedIterator} from '../iterable-iterator/mapped-iterator';

// We use K[]|string as the type for MapWrapper to avoid nastiness with type
// checking.
// TODO(Angus): Find a better way.
class MultiValueMap<K, V> extends MapWrapper<K[], V> {
  private valueToUid_: DynamicDefaultMap<K, number>;
  private internalKeyToArray_: Map<string, K[]>;
  private uid_: number;

  constructor(iterable: [K[], V][] = [],
              InnerMapClass: typeof Map = Map) {
    super([], InnerMapClass); // Defer population

    this.uid_ = 0;
    this.valueToUid_ =
      DynamicDefaultMap.usingFunction<K, number>((value: K) => this.uid_++);

    // The empty array in this value serves solely as a unique ID
    this.internalKeyToArray_ = new Map<string, K[]>();

    this.populateFromIterable(iterable);
  }

  public clear(): void {
    super.clear();
    this.uid_ = 0;
    this.valueToUid_.clear();
  }

  // Ensures a one-to-one mapping, so the same values always reference the
  // same array.
  private getInternalKey_(keys: K[]): K[] {
    const stringId = keys.map((key) => this.valueToUid_.get(key)).join('-');
    if (!this.internalKeyToArray_.has(stringId)) {
      this.internalKeyToArray_.set(stringId, keys);
    }
    return this.internalKeyToArray_.get(stringId);
  }

  public get(keys: K[]): V {
    return super.get(this.getInternalKey_(keys));
  }

  public delete(keys: K[]): boolean {
    return super.delete(this.getInternalKey_(keys));
  }

  public has(keys: K[]): boolean {
    return super.has(this.getInternalKey_(keys));
  }

  public keys(): IterableIterator<K[]> {
    // Slice each key to ensure they cannot be modified outside of this class
    return new MappedIterator(super.keys(), (key) => [...key]);
  }

  public set(keys: K[], value: V): this {
    return super.set(this.getInternalKey_(keys), value);
  }
}

export {MultiValueMap};
