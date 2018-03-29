import {MapWrapper, MapClass, MapClassParam, KVP} from './map-wrapper';
import {doNothing} from '../do-nothing';

type DefaultFunction = (any) => any;

class DynamicDefaultMap<T extends MapClass> extends MapWrapper {
  private defaultFunction: DefaultFunction;

  constructor(iterable:Array<Iterable<KVP>> = [],
              InnerMapClass: MapClassParam = Map,
              defaultFunction: DefaultFunction = doNothing) {
    super(iterable, InnerMapClass);
    this.defaultFunction = defaultFunction;
  }

  public get(key: any): any {
    if (!this.has(key)) {
      this.set(key, this.defaultFunction(key));
    }
    return super.get(key);
  }

  public static usingFunction<C extends DynamicDefaultMap>(
      defaultFunction: DefaultFunction): C | DynamicDefaultMap {
    return new this([], Map, defaultFunction);
  }
}

export {DynamicDefaultMap};
