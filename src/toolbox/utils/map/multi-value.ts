import DynamicDefaultMap from './dynamic-default';
import {MapWrapper, MapClass, MapClassParam, KVP} from './map-wrapper';

const MapWrapper = require('./map-wrapper');
const DynamicDefaultMap = require('./dynamic-default');

class MultiValueMap<T extends MapClass> extends MapWrapper<T> {
  private uids: DynamicDefaultMap<Map>;
  private uidsToValue: Map;

  constructor(iterable:Array<Iterable<KVP>> = [],
              InnerMapClass: MapClassParam = Map) {
    super(iterable, InnerMapClass);

    this.uidsToValue = new Map();

    let uid: number = 0;
    this.uids = DynamicDefaultMap.usingFunction(
      (value) => {
        const nextUid = '' + uid++;
        this.uidsToValue.set(nextUid, value);
        return nextUid;
      });
  }

  public clear(): void {
    super.clear();
    this.uidsToValue.clear();
    this.uids.clear();
  }

  private convertToKey(keys: Array<any>): any {
    return keys.map((key) => this.uids.get(key)).join('-');
  }

  private convertToValues(key: string): Array<any> {
    return key.split('-').map((uid) => this.uidsToValue.get(uid));
  }

  public get(...keys: Array<any>): any {
    return super.get(this.convertToKey(keys));
  }

  public delete(...keys: Array<any>): boolean {
    return super.delete(this.convertToKey(keys));
  }

  public has(...keys: Array<any>): boolean {
    return super.has(this.convertToKey(keys));
  }

  public keys(): Iterator<any> {
    return super.keys().map((key) => this.convertToValues(key));
  }

  public set(...keysAndValue: Array<any>): this {
    const keys: Array<any> = keysAndValue.slice(0, -1);
    const value: any = keysAndValue.slice(-1)[0];
    return super.set(this.convertToKey(keys), value);
  }
}

export {MultiValueMap};
