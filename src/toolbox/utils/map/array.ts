import DynamicDefaultMap from './dynamic-default';
import {MapWrapper, MapClass, MapClassParam, KVP} from './map-wrapper';

class ArrayMap extends MapWrapper<DynamicDefaultMap<MapClass>> {
  constructor(iterable:Array<Iterable<KVP>> = [],
              InnerMapClass: MapClassParam = Map) {
    super();
    this.replaceInnerMap(
      new DynamicDefaultMap(iterable, InnerMapClass, () => []));
  }

  public get(key: any): Array<any> {
    return super.get(key);
  }

  public set(key: any, value: Array<any>): this {
    if (!(value instanceof Array)) {
      throw new Error('Values set on to ArrayMap must be arrays');
    }
    return super.set(key, value);
  }
}

export {ArrayMap};
