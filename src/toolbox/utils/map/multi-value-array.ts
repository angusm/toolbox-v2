import {ArrayMap} from './array';
import {MultiValueMap} from './multi-value';

class MultiValueArrayMap<K, V> extends MultiValueMap<K, V> {
  constructor(iterable:Array<Iterable<K, V>> = [],
              InnerMapClass: typeof Map = Map) {
    super();
    this.replaceInnerMap(new ArrayMap<K, V>(iterable, InnerMapClass));
  }
}

export {MultiValueArrayMap};
